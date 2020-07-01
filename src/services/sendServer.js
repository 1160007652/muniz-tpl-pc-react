/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-30 18:19:16
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

    const { walletInfo, asset, blind, from, to } = param;
    // blind: { isAmount, isType} 是否隐藏
    // asset: { numbers: 100, unit: { short: "FIN", long: "xxxxxxxxxx=="}}

    // 当前钱包keypair
    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

    // 参考utxo的相对依赖
    const txoRef = findoraWasm.TxoRef.relative(BigInt(0));

    /*
      获取 assetRecord, ownerMemo 问题

      如何取到“上一个交易记录” 数据?
      如何 把返回的交易数据,重新转化为类对象?

    */

    const assetRecord = []; // issueTxn.get_owner_record(0);
    const ownerMemo = []; // issueTxn.get_owner_memo(0);

    // 转账数量
    const amount = asset.numbers;

    // 资产地址
    const tokenCode = asset.unit.long;

    // 是否隐藏数量
    const isBlindAmount = blind.isAmount;
    // 是否隐藏类型
    const isBlindType = blind.isType;

    // 生成转账数据
    const transferOp = findoraWasm.TransferOperationBuilder.new()
      .add_input_no_tracking(txoRef, assetRecord, ownerMemo, keypair, BigInt(amount))
      .add_output_no_tracking(BigInt(amount), to, tokenCode, isBlindAmount, isBlindType)
      .create(findoraWasm.TransferType.standard_transfer_type())
      .sign(keypair)
      .transaction();

    // 发起转账交易
    const handle = webNetWork.submitTransaction(transferOp);
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
