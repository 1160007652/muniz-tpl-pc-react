/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-12 21:00:58
 * @ Description: 多语言状态Mobx 模块
 *
 * asset -> balance
 * transactions
 *
 */

import { action, observable, when } from 'mobx';
import webNetWork from '_src/services/webNetWork';
import calculateTxn from '_src/utils/calculateTxn';

/**
 * 资产管理Store
 * @category MobxStore
 */
class AssetStore {
  constructor(self) {
    this.rootStore = self;
    // this.init();
  }

  /**
   *
   * createdAssets 资产列表
   *
   * zhipan 钱包地址下的资产
   * a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=
   *
   * */
  @observable createdAssetList = [
    { short: 'YUI', long: 'BWAlqRJY4Outbf-UaJ0gBQ==' }, // 可跟踪资产, max_utils: 6000
    { short: 'UIY', long: 'g-Tc5aUAr-YSzFQUrmv8TQ==' }, // 可跟踪资产, max_utils: 不限制
    { short: 'BOO', long: 'n_AeopfLcTwzDMtMpXFnuA==' }, // 不可跟踪资产, max_utils: 6000
    { short: 'NRU', long: 'i-IuAwFzofyGZXQs-e3X1g==' }, // 不可跟踪资产, max_utils: 不限制
  ];
  /**
   *
   * issueAssets 待增发的数据
   *
   * zhipan 钱包地址下的资产
   * a1YtM_SttzL50DjGEsFIAjCflYVuWjQAWhwOwlrfH1o=
   *
   * */
  @observable issueAssetList = [
    { short: 'YUI', long: 'BWAlqRJY4Outbf-UaJ0gBQ==' }, // 不可跟踪资产, max_utils: 不限制
  ];

  /** 修改 createdAssets 数据 */
  @action setCreatedAssetList() {}

  /** 修改 issueAssets 数据 */
  @action setCreatedAssetList() {}

  /**
   * 获取创建的资产
   */
  @action getAssetList = async (address) => {
    const tokenCodes = await webNetWork.getCreatedAssets(address);

    await calculateTxn({ address });

    // let tokenCodeInfoList = tokenCodes.map(async (item) => {
    //   return await webNetWork.getAssetProperties(item);
    // });

    // tokenCodeInfoList = await Promise.all(tokenCodeInfoList);

    console.log(`${address} 拥有的:`, tokenCodes);
  };

  /**
   * 获取资产对应的 余额
   */
  @action getAssetBalance = async ({ address, tokenCode }) => {
    // await calculateTxn({ address });
  };

  /**
   * 初始化数据
   *
   * @memberof AssetStore
   */
  async init() {
    const { walletStore } = this.rootStore;
    const { walletInfo } = walletStore;
  }
}

export default AssetStore;
