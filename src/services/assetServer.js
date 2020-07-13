/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 18:30:29
 * @ Description: wallet info api , 钱包信息接口
 */

import webNetWork from './webNetWork';
import rootStore from '_src/stores';

/**
 * @category Services
 * @class
 */
class AssetServer {
  constructor() {
    this.zeiParams = '';
  }
  /**
   * 获取PublicParams, 增发资产使用. 由于耗时严重,提取变量
   *
   * @memberof assetServer
   */
  getPublicParams = async () => {
    const findoraWasm = await import('wasm');
    this.zeiParams = findoraWasm.PublicParams.new();
  };
  /**
   * @description 系统生成资产地址-长名称
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
   * 未实现 跟踪资产
   * @param {*} param, 定义资产所需要的 data 数据
   */
  createAsset = async (param) => {
    console.log(param);
    const findoraWasm = await import('wasm');

    const { founder, memo, asset, traceable, transferable, updatable } = param;

    const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === founder)[0];

    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);
    console.log(keypair);

    const trackingKey = findoraWasm.AssetTracerKeyPair.new();
    const tracingPolicy = findoraWasm.TracingPolicy.new_with_tracking(trackingKey);

    const tokenCode = asset.unit.long;

    const blockCount = BigInt((await webNetWork.getStateCommitment())[1]);

    let definitionTransaction = {};

    // const assetRules = findoraWasm.AssetRules.new();
    // assetRules.set_transferable(transferable).set_updatable(updatable);
    // if (asset.maxNumbers && asset.maxNumbers > 0) {
    //   assetRules.set_max_units(BigInt(asset.maxNumbers));
    // }
    // if (traceable) {
    //   assetRules.add_tracing_policy(tracingPolicy);
    // }

    let assetRules = findoraWasm.AssetRules.new().set_transferable(transferable).set_updatable(updatable);
    if (asset.maxNumbers && asset.maxNumbers > 0) {
      console.log('设置max金额');
      assetRules = findoraWasm.AssetRules.new()
        .set_max_units(BigInt(asset.maxNumbers))
        .set_transferable(transferable)
        .set_updatable(updatable);

      if (traceable) {
        assetRules = findoraWasm.AssetRules.new()
          .set_max_units(BigInt(asset.maxNumbers))
          .add_tracing_policy(tracingPolicy)
          .set_transferable(transferable)
          .set_updatable(updatable);
      }
    } else {
      console.log('不设置max金额', asset.maxNumbers);
      if (traceable) {
        assetRules = findoraWasm.AssetRules.new()
          .add_tracing_policy(tracingPolicy)
          .set_transferable(transferable)
          .set_updatable(updatable);
      }
    }

    definitionTransaction = findoraWasm.TransactionBuilder.new(blockCount)
      .add_operation_create_asset(keypair, memo, tokenCode, assetRules)
      .transaction();

    console.log('生成资产: ', definitionTransaction);

    const handle = await webNetWork.submitTransaction(definitionTransaction);
    // result = b17b27ffaa61a9e854fefe01bc6e744755c958a6906b991af89c3397b4415247

    console.log('生成资产返回: ', handle);

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
  };
  /**
   * @description 发行|增发 资产, 向服务器发送
   *
   * @param {*} param, 发行|增发 资产所需要的 data 数据
   */
  issueAsset = async (param) => {
    console.log('表单数据: ', param);

    if (!this.zeiParams) {
      this.getPublicParams();
    }

    const findoraWasm = await import('wasm');

    console.log('zeiParams: ', this.zeiParams);

    const { asset, blind, issuer, to } = param;
    const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === issuer)[0];

    // blind: { isAmount, isType} 是否隐藏
    // asset: { numbers: 100, unit: { short: "FIN", long: "xxxxxxxxxx=="}}

    const tokenCode = asset.unit.long;

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
        BigInt(asset.numbers),
        blind.isAmount,
        this.zeiParams,
      )
      .transaction();
    console.log('提交前的表单数据: ', issueTxn);
    const handle = await webNetWork.submitTransaction(issueTxn);
    console.log('发行资产返回: ', handle);

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
  };
  /** 获取服务端 定义的资产 */
  getAssetNameServer = async (param) => {
    const { address } = param;
    console.log('服务端资产,表单数据: ', param);
    const sid = await webNetWork.getCreatedAssets(address);
    console.log('返回的sids 数据: ', sid);
    return sid;
  };
}

export default new AssetServer();
