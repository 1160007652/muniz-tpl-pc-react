/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-16 16:47:39
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when } from 'mobx';

/**
 * 钱包管理Store
 * @category MobxStore
 */
class WalletStore {
  /** 构造方法, 初始化数据 */
  constructor() {
    this.init();
  }

  /**
   * 钱包信息
   * @memberof WalletStore
   */
  @observable walletInfo = {
    name: '', // , wallet name example: Alice
    address: '', // 钱包地址 , wallet address example: publicKey
  };
  /**
   * 钱包导入成功存放数据 列表
   * @memberof WalletStore
   */
  @observable walletImportList = []; //

  /**
   * 创建钱包的信息
   * @memberof WalletStore
   */
  @observable createWalletData = {
    name: '', // 名称
    password: '', // 密码
  };

  /**
   *
   * 设置当前使用的钱包信息
   * @param {Object} walletInfo - 当前选中的钱包类型
   * @param {string} walletInfo.name - 名称
   * @param {string} walletInfo.address - 地址
   * @memberof WalletStore
   */
  @action setWalletInfo(obj) {
    this.walletInfo = obj;
    when(
      () => this.walletInfo,
      () => {
        chrome.storage.sync.set({ walletInfo: this.walletInfo });
      },
    );
  }

  /**
   * 在创建钱包时调用的方法, 保留数据. 此数据会在其他页面进行调用
   *
   * @param {Object} walletInfo
   * @param {string} walletInfo.name - 名称
   * @param {string} walletInfo.address - 地址
   * @memberof WalletStore
   */
  @action setCreateWalletData(walletInfo) {
    this.createWalletData = walletInfo;
  }

  /**
   * 当添加过钱包KeyStore数据后, 下次打开钱包插件, 会从Chrome.storage.sync中读取吃就好的数据,已实现数据的复原
   * @memberof WalletStore
   */
  init() {
    chrome.storage.sync.get(
      ['walletImportList', 'walletInfo'], //
      action(({ walletImportList, walletInfo }) => {
        // rootStore.walletStore.init({ walletImportList, walletInfo });
        this.walletImportList = Object.values(walletImportList) || [];
        this.walletInfo = walletInfo || {};
      }),
    );
  }

  /**
   * 设置导入钱包, 同时把数据存入 chrome.storage.sync 浏览器中
   * @param {Object} walletInfo
   * @memberof WalletStore
   */
  @action importWallet(walletInfo) {
    this.walletImportList.push(walletInfo);
    when(
      () => this.walletImportList,
      () => {
        chrome.storage.sync.set({ walletImportList: this.walletImportList });
      },
    );
  }
}

export default WalletStore;
