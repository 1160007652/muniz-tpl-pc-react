/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-10 13:37:54
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

  /** createdAssets 资产列表 */
  @observable createdAssetList = [
    { short: 'Bala', long: '0AXORP57YPuDmi6dzBSWEg==' },
    { short: 'Baxi', long: 'yzS1qT2q30LZHxP70I0mbQ==' },
    {
      short: 'two',
      long: '8XbNsa7uMpimYlcXExxuIA==',
    },
  ];
  /** issueAssets 待增发的数据 */
  @observable issueAssetList = [
    { short: 'Have', long: 'u_NY95tL-tEqAb0ffK7tvw==' },
    {
      short: 'two2',
      long: '8XbNsa7uMpimYlcXExxuIA==',
    },
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
