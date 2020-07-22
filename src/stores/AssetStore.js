/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 10:00:20
 * @ Description: 多语言状态Mobx 模块
 *
 * asset -> balance
 * transactions
 *
 * 查看资产: 分3种模型开发, 分别如下:
 *
 * 1、拥有的资产: 在钱包详情页面展示, 此时资产只包括(已创建 + 已增发 + 转账得到的资产);
 * 2、可以增发的资产: 在增发页面展示, 此时资产只包括用户拥有的资产(已创建 + 已增发)的资产;
 * 3、可以转账的资产: 在转账页面展示, 此时资产只包括(已增发 + 转账得到的资产);
 *
 */

import { action, observable } from 'mobx';
import webNetWork from '_src/services/webNetWork';
import { relatedDB } from '_src/IndexedDB';
import calculateTxn from '_src/utils/calculateTxn';
import calculateUtxo from '_src/utils/calculateUtxo';
import assetsMerge from '_src/utils/assetsMerge';

/**
 * 资产管理Store
 * @category MobxStore
 */
class AssetStore {
  constructor(self) {
    this.rootStore = self;
  }

  /** createdAssets 拥有的资产列表 */
  @observable createdAssetList = [];
  /** issueAssets 可增发资产列表 */
  @observable issueAssetList = [];
  /** sendAssetList 可转账资产列表 */
  @observable sendAssetList = [];

  /**
   * 获取创建的资产, 用于在issuedPage (增发页面展示)
   */
  @action getIssuedAssetList = async (address) => {
    console.groupCollapsed('=======>  开始获取可以增发的资产');

    const result = await this.getOwnerAsset(address);
    this.issueAssetList = result;

    console.log('钱包地址: ', address);
    console.log('可增发资产: ', result);
    console.groupEnd();
  };

  /**
   * 获取拥有的资产, 用于(钱包详情页面展示)
   * 该方法,暂且无调用
   */
  @action getCreatedAssetList = async (address) => {
    console.groupCollapsed('=======>  开始获取拥有的资产');

    let result = await this.getOwnerAsset(address);

    result = await this.getTransactionAsset(address, result);

    this.createdAssetList = result;

    console.log('钱包地址: ', address);
    console.log('可增发资产: ', result);
    console.groupEnd();
  };

  /**
   * 获取可以转账的资产, 用于在Send (转账页面展示)
   */
  @action getSendAssetList = async (address) => {
    const findoraWasm = await import('wasm');
    console.groupCollapsed('=======>  开始获取可以转账的资产');

    // 获取交易数据, 在转账的时候需要使用
    await calculateUtxo({ address });
    // 获取资产数据
    await calculateTxn({ address });

    const assetList = await relatedDB.getIssuedAssetList({ address });

    let result = [];

    for (let i = 0; i < assetList.length; i++) {
      const operations = assetList[i].body.operations;
      for (let j = 0; j < operations.length; j++) {
        const asset_type = findoraWasm.asset_type_from_jsvalue(operations[j].body.code.val);
        const item = await webNetWork.getAssetProperties(asset_type);
        // console.log(await webNetWork.getAsset(asset_type));
        console.log('item', item);
        item.code = asset_type;
        item.short = item.memo;
        item.long = item.code;
        result.push(item);
      }
    }

    result = await this.getTransactionAsset(address, result);

    this.sendAssetList = result;

    console.log('钱包地址: ', address);
    console.log('拥有资产: ', result);

    console.groupEnd();
  };

  // 获取拥有的资产
  getOwnerAsset = async (address) => {
    const findoraWasm = await import('wasm');
    let tokenCodes = await webNetWork.getCreatedAssets(address);
    let result = [];

    for (let i = 0; i < tokenCodes.length; i++) {
      const asset_type = findoraWasm.asset_type_from_jsvalue(tokenCodes[i].val);
      const item = await webNetWork.getAssetProperties(asset_type);
      console.log('已有资产', item);
      item.code = asset_type;
      item.short = item.memo;
      item.long = item.code;
      result.push(item);
    }

    return result;
  };

  // 获取转账中的资产
  getTransactionAsset = async (address, haveAsset) => {
    const findoraWasm = await import('wasm');
    const walletInfo = this.rootStore.walletStore.walletImportList.filter((item) => item.publickey === address)[0];

    const transactionResult = await assetsMerge({ walletInfo });

    console.log('transactionResult: ', transactionResult);

    console.log('haveAsset: ', haveAsset);

    const result = [];

    for (const transactionItem of transactionResult) {
      if (transactionItem.from !== address) {
        const asset_type = transactionItem.asset.tokenCode;
        console.log('transactionItem', transactionItem);
        const haveAssetList = haveAsset.filter((obj) => {
          return obj.code === asset_type;
        });
        if (haveAssetList.length === 0) {
          const item = await webNetWork.getAssetProperties(asset_type);
          item.code = asset_type;
          item.short = item.memo;
          item.long = item.code;
          const isHaveItem = result.filter((obj) => obj.code === item.code).length > 0;
          if (isHaveItem <= 0) {
            result.push(item);
          }
        }
      }
    }
    return haveAsset.concat(result);
  };
}

export default AssetStore;
