/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 15:14:17
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
    // zhipan
    { short: 'Hu', long: 'mtedMtrUb30Y0QNAIQqezw==' }, // 不可跟踪资产, max_utils: 不限制
    { short: 'Bu', long: '3jHjfIWoltr8dCvKs3ghIg==' }, // 不可跟踪资产, max_utils: 6000
    { short: 'Nu', long: 'uYYYWA0QPH5PwPhkx7JKGA==' }, // 可跟踪资产, max_utils: 不限制
    // 以上3个 资产 都是报这个错 : Invalid total amount per asset in non confidential asset transfer
    { short: 'Mu', long: 'NgSmdxFA3rvF8P-VIB2KtA==' }, // 可跟踪资产, max_utils: 6000
    // 这个是提交后, 服务端报错: Zei error (ledger/src/store/effects.rs:333:67): Asset Tracking error. Asset commitment and asset ciphertext do not match.
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
    // keyao
    { short: 'XO', long: 'S3VjhfpO36BwUzV976qbtQ==' }, // 不可跟踪资产, max_utils: 不限制
    { short: 'AO', long: 'eMJUf4W_s5ERUhOEvLRrSQ==' }, // 不可跟踪资产, max_utils: 6000
    { short: 'Nu', long: 'uYYYWA0QPH5PwPhkx7JKGA==' }, // 可跟踪资产, max_utils: 不限制
    { short: 'Mu', long: 'NgSmdxFA3rvF8P-VIB2KtA==' }, // 可跟踪资产, max_utils: 6000
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
