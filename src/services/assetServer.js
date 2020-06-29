/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-29 14:38:19
 * @ Description: wallet info api , 钱包信息接口
 */

import webNetWork from './webNetWork';

/**
 * @category Services
 * @class
 */
const assetServer = {
  /**
   * @description 系统生成资产地址-长名称
   * @returns {string}
   */
  async getAssetNameLong() {
    const findoraWasm = await import('wasm');
    const result = findoraWasm.random_asset_type();
    return result;
  },
  /**
   * @description 生成资产, 先服务器发送
   * @param {*} param, 定义资产所需要的数据
   */
  async createAsset(param) {
    return true;

    console.log(param);
    const findoraWasm = await import('wasm');
    const keypair = findoraWasm.keypair_from_str(param.walletInfo.keyPairStr); // param.walletInfo.keypair;
    console.log(keypair);

    const memo = param.memo;
    const tokenCode = param.asset.unit.long;
    const blockCount = BigInt((await webNetWork.getStateCommitment())[1] - 1);

    const definitionTransaction = findoraWasm.TransactionBuilder.new(blockCount)
      .add_operation_create_asset(keypair, memo, tokenCode, findoraWasm.AssetRules.new())
      .transaction();

    console.log('生成资产: ', definitionTransaction);

    const handle = await webNetWork.submitTransaction(definitionTransaction);
    // result = b17b27ffaa61a9e854fefe01bc6e744755c958a6906b991af89c3397b4415247

    console.log('服务端返回: ', handle);

    const status = await webNetWork.getTxnStatus(handle);
    console.log('状态: ', status);

    // const sid = await webNetWork.getOwnedSids(param.founder);

    // console.log('sid: ', sid);

    // const stateCommitment = await webNetWork.getStateCommitment();

    // console.log('stateCommitment: ', stateCommitment);

    // const txn = await webNetWork.getTxn(0);
    // console.log('txn: ', txn);

    // const isValid = findoraWasm.verify_authenticated_txn(JSON.stringify(stateCommitment[0]), JSON.stringify(txn));

    // console.log(isValid);
  },
  /** 获取服务端 定义的资产 */
  async getAssetNameServer(param) {
    const { address } = param;
    const sid = await webNetWork.getOwnedSids(address);
    console.log(sid);
    return sid;
  },
};

export default assetServer;
