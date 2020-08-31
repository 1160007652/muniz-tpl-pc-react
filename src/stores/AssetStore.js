/**
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
import balancesMerge from '_src/utils/balancesMerge';
import transactionsMerge from '_src/utils/transactionsMerge';

/**
 * 资产管理Store
 * @category MobxStore
 */
/**
 * Store to manage assets.
 * @category MobxStore
 */
class AssetStore {
  constructor(self) {
    this.rootStore = self;
  }

  /** createdAssets 拥有的资产列表 */
  /** List of created assets */
  @observable createdAssetList = [];
  /** issueAssets 可增发资产列表 */
  /** List of issued assets */
  @observable issuedAssetList = [];
  /** sentAssetList 可转账资产列表 */
  /** List of transferred assets */
  @observable sentAssetList = [];

  /** 抽屉数据 */
  /** Drawer information */
  @observable drawerInfo = {
    created: {
      visible: false,
      componentKey: 0,
    },
    issued: {
      visible: false,
      componentKey: 0,
    },
    send: {
      visible: false,
      componentKey: 0,
    },
  };

  /**
   * 关闭打开抽屉
   *
   * @memberof AssetStore
   */
  /**
   * Opens of closes the drawer.
   *
   * @memberof AssetStore
   */
  @action toggleDrawer = (key, value) => {
    this.drawerInfo[key].visible = value;
  };

  /**
   * 创建,增发资产成功后, 通过递增key, 使组件重新渲染,已更新数据
   *
   * @memberof AssetStore
   */
  /**
   * After succeeded asset creation or issuance, updates data by incrementing the component key.
   *
   * @memberof AssetStore
   */
  @action changeComponentKey = (key) => {
    const { componentKey } = this.drawerInfo[key];
    this.drawerInfo[key].componentKey = componentKey + 1;
  };

  /**
   * 获取创建的资产, 用于在issuedPage (增发页面展示)
   *
   * @async
   * @param {string} address 钱包地址
   */
  /**
   * Gets the issued assets of an address.
   *
   * Used to display the issued assets.
   *
   * @async
   * @param {object} address - address from which the assets are issued.
   */
  @action getIssuedAssetList = async (address) => {
    console.groupCollapsed('=======>  开始获取可以增发的资产');

    let result = await this.getOwnedAssets(address);
    // 加入 计算余额
    const walletInfo = this.rootStore.walletStore.walletImportList.filter((item) => item.publickey === address)[0];
    let transactionData = await transactionsMerge({ walletInfo, page: -1 });
    transactionData = transactionData.filter((item) => item.type === 'IssueAsset');
    result = result.map(async (item) => {
      return await balancesMerge({ dataList: transactionData, asset: item });
    });

    result = await Promise.all(result);

    this.issuedAssetList = result;

    console.log('钱包地址: ', address);
    console.log('可增发资产: ', result);
    console.groupEnd();
  };

  /**
   * 获取拥有的资产, 用于(钱包详情页面展示)
   * 该方法,暂且无调用
   * @async
   * @param {string} address 钱包地址
   */
  /**
   * Gets the created assets of an address.
   *
   * Note: This function isn't currently being used.
   *
   * @async
   * @param {object} address - address from which the assets are created.
   */
  @action getCreatedAssetList = async (address) => {
    console.groupCollapsed('=======>  开始获取拥有的资产');

    let result = await this.getOwnedAssets(address);

    result = await this.getTransactionAsset(address, result);

    this.createdAssetList = result;

    console.log('钱包地址: ', address);
    console.log('可增发资产: ', result);
    console.groupEnd();
  };

  /**
   * 获取可以转账的资产, 用于在Send (转账页面展示)
   * @async
   * @param {string} address 钱包地址
   */
  /**
   * Gets the transferred assets of an address.
   *
   * Used to display the transferred assets.
   *
   * @async
   * @param {object} address - address from which the assets are transferred.
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
        console.log('item', item);
        item.code = asset_type;
        item.short = this.rootStore.nickNameStore.nickNameObj[asset_type]?.nickname; // item.memo;
        item.long = item.code;

        // 防止交易中塞选出来的数据, 资产重复
        const isHaveItem = result.filter((obj) => obj.code === item.code).length > 0;
        if (isHaveItem <= 0) {
          result.push(item);
        }
      }
    }

    result = await this.getTransactionAsset(address, result);

    // 加入 计算余额
    const walletInfo = this.rootStore.walletStore.walletImportList.filter((item) => item.publickey === address)[0];
    const transactionData = await transactionsMerge({ walletInfo, page: -1 });

    console.log('新的数据： ====》 ', transactionData);
    result = result.map(async (item) => {
      return await balancesMerge({ dataList: transactionData, asset: item });
    });

    result = await Promise.all(result);

    this.sentAssetList = result.filter((item) => item.asset.numbers > 0);

    console.log('钱包地址: ', address);
    console.log('拥有资产: ', result);

    console.groupEnd();
  };

  /**
   * 获取拥有的资产
   *
   * @async
   * @param {string} address 钱包地址
   * @returns {array} 返回该地址拥有的资产集
   */
  /**
   * Gets owned assets.
   *
   * @async
   * @param {string} address - Wallet address.
   * @returns {array} Assets owned by the address.
   */
  getOwnedAssets = async (address) => {
    const findoraWasm = await import('wasm');
    let tokenCodes = await webNetWork.getCreatedAssets(address);
    let result = [];

    for (let i = 0; i < tokenCodes.length; i++) {
      const asset_type = findoraWasm.asset_type_from_jsvalue(tokenCodes[i].val);
      const item = await webNetWork.getAssetProperties(asset_type);
      console.log('已有资产', item);
      item.code = asset_type;
      item.short = this.rootStore.nickNameStore.nickNameObj[asset_type]?.nickname;
      item.long = item.code;
      result.push(item);
    }

    return result;
  };

  /**
   * 获取转账中的资产
   *
   * @async
   * @param {string} address 钱包地址
   * @param {Array} haveAsset 拥有资产的集合
   * @returns {Array} 返回转账资产集
   */
  /**
   * Gets the transferred asset.
   *
   * @async
   * @param {string} address - Wallet address.
   * @param {array} haveAsset - Owned assets.
   * @returns {array} - List of transferred asset.
   */
  getTransactionAsset = async (address, haveAsset) => {
    const findoraWasm = await import('wasm');
    const walletInfo = this.rootStore.walletStore.walletImportList.filter((item) => item.publickey === address)[0];

    const transactionResult = await assetsMerge({ walletInfo });

    console.log('transactionResult: ', transactionResult);

    console.log('haveAsset: ', haveAsset);

    const result = [];

    for (const transactionItem of transactionResult) {
      if (transactionItem.to === address) {
        const asset_type = transactionItem.asset.tokenCode;
        console.log('transactionItem', transactionItem);
        const haveAssetList = haveAsset.filter((obj) => {
          return obj.code === asset_type;
        });
        console.log('haveAssetList', haveAssetList);
        if (haveAssetList.length === 0) {
          const item = await webNetWork.getAssetProperties(asset_type);
          item.code = asset_type;
          item.short = this.rootStore.nickNameStore.nickNameObj[asset_type]?.nickname;
          item.long = item.code;
          // 防止交易中塞选出来的数据, 资产重复
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
