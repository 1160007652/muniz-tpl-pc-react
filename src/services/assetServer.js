/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 17:26:20
 * @ Description: wallet info api , 钱包信息接口
 */

import webNetWork from './webNetWork';
import rootStore from '_src/stores';
import pollTxnStatus from '_src/utils/pollTxnStatus';

/**
 * @category Services
 * @class
 */
class AssetServer {
  constructor() {
    this.zeiParams = null;
  }
  /**
   * @description 系统生成资产地址-长名称
   * @returns {string}
   */
  /**
   * Gets randomly generated base64-encoded asset type code.
   * @returns {string}
   */
  getAssetNameLong = async () => {
    const findoraWasm = await import('wasm');
    const result = findoraWasm.random_asset_type();
    return result;
  };
  /**
   * @description 生成资产, 向服务器发送
   * 未实现 .set_transfer_multisig_rules() 多签 规则
   * @param {*} param, 定义资产所需要的 data 数据
   */
  /**
   * Creates the asset and submits the transaction.
   * @param {object} param - Information needed to create the asset
   */
  createAsset = async (param) => {
    console.groupCollapsed('=======>  开始创建资产');
    console.log(param);
    const findoraWasm = await import('wasm');

    const { founder, memo, asset, traceable, transferable, updatable } = param;

    const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === founder)[0];

    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);
    console.log(keypair);

    const trackingKey = findoraWasm.AssetTracerKeyPair.new();
    const tracingPolicy = findoraWasm.TracingPolicy.new_with_tracking(trackingKey);

    const tokenCode = asset.long;

    const blockCount = BigInt((await webNetWork.getStateCommitment())[1]);

    let definitionTransaction = {};

    let assetRules = findoraWasm.AssetRules.new();
    assetRules = assetRules.set_transferable(transferable).set_updatable(updatable);
    if (asset.maxNumbers && asset.maxNumbers > 0) {
      assetRules = assetRules.set_max_units(BigInt(asset.maxNumbers));
    }

    if (traceable) {
      assetRules = assetRules.add_tracing_policy(tracingPolicy);
    }

    definitionTransaction = findoraWasm.TransactionBuilder.new(blockCount)
      .add_operation_create_asset(keypair, memo, tokenCode, assetRules)
      .transaction();

    console.log('生成资产: ', definitionTransaction);

    const handle = await webNetWork.submitTransaction(definitionTransaction);

    console.log('生成资产返回: ', handle);

    const status = await pollTxnStatus(handle, webNetWork);

    console.log('状态: ', status);

    console.groupEnd();

    if ('Committed' in status) {
      return {
        code: 0,
        data: status,
      };
    } else {
      return {
        code: -1,
        message: status.Rejected,
      };
    }
  };
  /**
   * @description 发行|增发 资产, 向服务器发送
   *
   * @param {*} param, 发行|增发 资产所需要的 data 数据
   */
  /**
   * Issues the asset and submits the transaction.
   * @param {object} param - Information needed to issue the asset
   */
  issueAsset = async (param) => {
    console.groupCollapsed('=======>  开始增发资产');
    console.log('表单数据: ', param);

    const findoraWasm = await import('wasm');

    if (!this.zeiParams) {
      this.zeiParams = findoraWasm.PublicParams.new();
    }

    console.log('zeiParams: ', this.zeiParams);

    const { asset, blind, issuer, inputNumbers } = param;
    const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === issuer)[0];

    // blind: { isAmount, isType} 是否隐藏
    // asset: { numbers: 100, short: "FIN", long: "xxxxxxxxxx=="}

    const tokenCode = asset.long;

    const blockCount = BigInt((await webNetWork.getStateCommitment())[1]);

    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

    // 如果生成的资产 是 被跟踪的, 需要传入 tracerKp
    const tracerKp = findoraWasm.AssetTracerKeyPair.new();

    console.log('keypair: ', keypair);
    console.log('tracerKp: ', tracerKp);

    const stateCommitment = await webNetWork.getStateCommitment();

    console.log('stateCommitment: ', stateCommitment);

    /*
     add_basic_issue_asset_with_tracking  跟踪资产
     add_basic_issue_asset_without_tracking
     add_basic_issue_asset
    */

    const issueTxn = findoraWasm.TransactionBuilder.new(blockCount)
      .add_basic_issue_asset(
        keypair,
        tokenCode,
        BigInt(stateCommitment[1]),
        BigInt(inputNumbers),
        blind.isAmount,
        this.zeiParams,
      )
      .transaction();
    console.log('提交前的表单数据: ', issueTxn);
    const handle = await webNetWork.submitTransaction(issueTxn);
    console.log('发行资产返回: ', handle);

    const status = await pollTxnStatus(handle, webNetWork);

    console.log('状态: ', status);
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
  };
}

export default new AssetServer();
