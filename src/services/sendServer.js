/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 18:00:11
 * @ Description: wallet info api , 钱包信息接口
 *
 */

import webNetWork from './webNetWork';
import calculateUtxo from '_src/utils/calculateUtxo';
import rootStore from '_src/stores';
import { ownedDB } from '_src/IndexedDB';
import pollTxnStatus from '_src/utils/pollTxnStatus';

/**
 * @category Services
 * @class
 */
const sendServer = {
  /**
   * @author Muniz
   * @description 资产转账
   * @param {param} address - 转账需要的表单数据
   * @returns {object}
   */
  /**
   * Transfer the asset.
   * @param {object} param - Information needed to transfer the asset.
   * @returns {object}
   */
  async setSendAsset(param) {
    console.groupCollapsed('=======>  开始转账');

    console.log('表单数据: ', param);

    const findoraWasm = await import('wasm');

    const { asset, blind, to, from, numbers } = param;
    // blind: { isAmount, isType} 是否隐藏
    // asset: { numbers: 100,  short: "FIN", long: "xxxxxxxxxx=="}

    const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === from)[0];

    // 当前钱包keypair
    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

    const assetData = await webNetWork.getAsset(asset.long);

    // 资产是否可以跟踪
    const isTraceable = assetData.properties.asset_rules?.tracing_policies?.length > 0;

    console.log('跟踪数据: ', isTraceable, assetData.properties.asset_rules?.tracing_policies);

    console.log('assetData: ', assetData);

    // 获取 计算的 utxo 数据
    await calculateUtxo({ address: from });

    // 获取utxoSid
    const assetLast = await ownedDB.getAssetLast({ address: from, tokenCode: asset.long });
    console.log('资产的最后一笔交易: ', assetLast);

    if (!assetLast) {
      return {
        code: -2,
        message: 'No last transaction',
      };
    }

    const utxoSid = assetLast.sid;
    console.log('当前资产的最后一笔交易SID: ', utxoSid);

    const utxoData = await webNetWork.getUtxo(utxoSid);
    console.log('utxoData', utxoData);

    const memoData = await webNetWork.getOwnerMemo(utxoSid);
    console.log('memoData', memoData);

    // 提取 record , 获取资产的数量

    const assetRecord = findoraWasm.ClientAssetRecord.from_json(utxoData);

    const ownerMemo = memoData ? findoraWasm.OwnerMemo.from_json(memoData) : null;

    // const decryptUtxoData = findoraWasm.open_client_asset_record(assetRecord, ownerMemo, keypair);
    // console.log('assetRecord: ', assetRecord);

    // console.log('decryptUtxoData: ', decryptUtxoData);

    /*
      还缺少,获取 ownerMeo 的功能
    */

    // 参考utxo的相对依赖
    const txoRef = findoraWasm.TxoRef.absolute(BigInt(utxoSid));

    // 转账数量
    const amount = numbers;

    // 资产地址
    const tokenCode = asset.long;

    // 是否隐藏数量
    const isBlindAmount = blind.isAmount;
    // 是否隐藏类型
    const isBlindType = blind.isType;
    // toPublickey 对方地址, 将字符串to 转化为对象的 xfrPublickey
    const toPublickey = findoraWasm.public_key_from_base64(to);

    // 生成转账数据
    let transferOp = {};

    console.log('ownerMemo: - 前', ownerMemo);
    if (isTraceable) {
      console.log('转账 - 可以跟踪');
      // 获取跟踪的 trackingKey
      const tracingPolicies = findoraWasm.AssetType.from_json(assetData).get_tracing_policies();
      console.log('tracingPolicies:', tracingPolicies);

      // 生成转账数据
      transferOp = findoraWasm.TransferOperationBuilder.new()
        .add_input_with_tracking(txoRef, assetRecord, ownerMemo?.clone(), tracingPolicies, keypair, BigInt(amount))
        .add_output_with_tracking(BigInt(amount), toPublickey, tracingPolicies, tokenCode, isBlindAmount, isBlindType);
    } else {
      console.log('转账 - 不可以跟踪');
      console.log('转账 - 金额: ', BigInt(amount), amount);

      transferOp = findoraWasm.TransferOperationBuilder.new()
        .add_input_no_tracking(txoRef, assetRecord, ownerMemo?.clone(), keypair, BigInt(amount))
        .add_output_no_tracking(BigInt(amount), toPublickey, tokenCode, isBlindAmount, isBlindType);
    }

    // findoraWasm.TransferType.standard_transfer_type()
    transferOp = transferOp.balance().create().sign(keypair).transaction();

    console.log('ownerMemo: - 后', ownerMemo?.clone());

    console.log('开始获取 blockCount');

    const blockCount = BigInt((await webNetWork.getStateCommitment())[1]);
    const transferTxn = findoraWasm.TransactionBuilder.new(blockCount).add_transfer_operation(transferOp).transaction();
    console.log('转账提交的数据: ', transferTxn);
    // 发起转账交易
    const handle = await webNetWork.submitTransaction(transferTxn);
    console.log('转账返回数据: ', handle);

    const status = await pollTxnStatus(handle, webNetWork);

    console.groupEnd();

    if ('Committed' in status) {
      return {
        code: 0,
        data: status,
      };
    } else {
      return {
        code: -1,
        message: status,
      };
    }
  },
};

/** The name of the module. */
export default sendServer;
