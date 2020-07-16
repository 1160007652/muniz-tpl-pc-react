/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 14:17:37
 * @ Description: 多语言状态Mobx 模块
 *
 * asset -> balance
 * transactions
 *
 */

import { action, observable, when } from 'mobx';
import webNetWork from '_src/services/webNetWork';
import { relatedDB } from '_src/IndexedDB';
import calculateTxn from '_src/utils/calculateTxn';
import calculateUtxo from '_src/utils/calculateUtxo';

/**
 * 资产管理Store
 * @category MobxStore
 */
class AssetStore {
  constructor() {}

  /** createdAssets 资产列表 */
  @observable createdAssetList = [
    // zhipan
    { short: 'three', long: 'MDg-MY0rGVxiFZ56r_GcSQ==' }, // 不可跟踪资产, max_utils: 不限制
  ];
  /** issueAssets 待增发的数据 */
  @observable issueAssetList = [];
  /** 修改 createdAssets 数据 */
  @action setCreatedAssetList() {}

  /** 修改 issueAssets 数据 */
  @action setCreatedAssetList() {}

  /**
   * 获取创建的资产, 用于在issuedPage (增发页面展示)
   */
  @action getCreatedAssetList = async (address) => {
    console.groupCollapsed('=======>  开始获取可以增发的资产');
    let tokenCodes = await webNetWork.getCreatedAssets(address);
    let result = [];

    for (let i = 0; i < tokenCodes.length; i++) {
      const item = await webNetWork.getAssetProperties(tokenCodes[i]);
      item.short = item.memo;
      item.long = item.code;
      result.push(item);
    }

    this.issueAssetList = result;

    console.log('钱包地址: ', address);
    console.log('可增发资产: ', result);
    console.groupEnd();
  };

  /**
   * 获取创建的资产, 用于在issuedPage (增发页面展示)
   */
  @action getIssuedAssetList = async (address) => {
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
        const item = await webNetWork.getAssetProperties(operations[j].body.code);
        item.short = item.memo;
        item.long = item.code;
        result.push(item);
      }
    }

    this.createdAssetList = result;

    console.log('钱包地址: ', address);
    console.log('拥有资产: ', result);

    console.groupEnd();
  };
  /**
   * 获取资产对应的 余额
   */
  @action getAssetBalance = async ({ address, tokenCode }) => {
    // await calculateTxn({ address });
  };
}

export default AssetStore;
