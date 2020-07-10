/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-10 15:37:57
 * @ Description: wallet info api , 钱包信息接口
 *
 */

import webNetWork from './webNetWork';

/**
 * @category Services
 * @class
 */
const sendServer = {
  /**
   * @author Muniz
   * @description 资产转账
   * @param {param} address - 转账需要的表单数据
   *
   * @return {object}
   */
  async setSendAsset(param) {
    console.log('表单数据: ', param);

    const findoraWasm = await import('wasm');

    const { walletInfo, asset, blind, to, from } = param;
    // blind: { isAmount, isType} 是否隐藏
    // asset: { numbers: 100, unit: { short: "FIN", long: "xxxxxxxxxx=="}}

    // 当前钱包keypair
    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

    const assetData = await webNetWork.getAsset(asset.unit.long);

    // 资产是否可以跟踪
    const isTraceable = assetData.properties.asset_rules.tracing_policies.length > 0;

    console.log('跟踪数据: ', isTraceable, assetData.properties.asset_rules.tracing_policies);

    console.log('assetData: ', assetData);

    let utxoSid = await webNetWork.getOwnedSids(from);
    utxoSid = utxoSid.sort((a, b) => a - b);
    utxoSid = utxoSid.length > 0 ? utxoSid[utxoSid.length - 1] : 0;

    const utxoData = await webNetWork.getUtxo(utxoSid);
    console.log('utxoData', utxoData);

    const memoData = await webNetWork.getOwnerMemo(utxoSid);
    console.log('memoData', memoData);

    // 提取 record , 获取资产的数量
    const assetRecord = findoraWasm.ClientAssetRecord.from_jsvalue(utxoData);
    const ownerMemo = memoData ? findoraWasm.OwnerMemo.from_jsvalue(memoData) : null;

    const jiemiData = findoraWasm.open_client_asset_record(assetRecord, ownerMemo, keypair);
    console.log('assetRecord: ', assetRecord);
    console.log('ownerMemo:', ownerMemo);
    console.log('jiemiData: ', jiemiData);

    /*
      还缺少,获取 ownerMeo 的功能
    */

    // 参考utxo的相对依赖
    const txoRef = findoraWasm.TxoRef.relative(BigInt(utxoSid));

    // 转账数量
    const amount = asset.numbers;

    // 资产地址
    const tokenCode = asset.unit.long;

    // 是否隐藏数量
    const isBlindAmount = blind.isAmount;
    // 是否隐藏类型
    const isBlindType = blind.isType;
    // toPublickey 对方地址, 将字符串to 转化为对象的 xfrPublickey
    const toPublickey = findoraWasm.public_key_from_base64(to);

    // 生成转账数据
    let transferOp = {};

    if (isTraceable) {
      console.log('转账 - 可以跟踪');
      // 获取跟踪的 trackingKey
      const tracingPolicies = findoraWasm.AssetType.from_json(assetData).get_tracing_policies();
      console.log('tracingPolicies:', tracingPolicies);

      // 生成转账数据
      transferOp = findoraWasm.TransferOperationBuilder.new()
        .add_input_with_tracking(txoRef, assetRecord, ownerMemo, tracingPolicies, keypair, BigInt(amount))
        .add_output_with_tracking(BigInt(amount), toPublickey, tracingPolicies, tokenCode, isBlindAmount, isBlindType)
        .create(findoraWasm.TransferType.standard_transfer_type())
        .sign(keypair)
        .transaction();
    } else {
      console.log('转账 - 不可以跟踪');
      console.log('转账 - 金额: ', BigInt(amount), amount);
      transferOp = findoraWasm.TransferOperationBuilder.new()
        .add_input_no_tracking(txoRef, assetRecord, ownerMemo, keypair, BigInt(amount))
        .add_output_no_tracking(BigInt(amount), toPublickey, tokenCode, isBlindAmount, isBlindType)
        .create(findoraWasm.TransferType.standard_transfer_type())
        .sign(keypair)
        .transaction();
    }

    const blockCount = BigInt((await webNetWork.getStateCommitment())[1]);
    const transferTxn = findoraWasm.TransactionBuilder.new(blockCount).add_operation(transferOp).transaction();
    console.log('转账提交的数据: ', transferTxn);
    // 发起转账交易
    const handle = await webNetWork.submitTransaction(transferTxn);
    console.log('转账返回数据: ', handle);

    const status = await webNetWork.getTxnStatus(handle);
    console.log('状态: ', status);

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
