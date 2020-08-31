/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-02 17:34:36
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when } from 'mobx';

/**
 * 钱包管理Store
 * @category MobxStore
 */
/**
 * Store to manage the wallet.
 * @category MobxStore
 */
class WalletStore {
  /** 构造方法, 初始化数据 */
  /** Constructs a wallet store. */
  constructor() {
    this.init();
  }

  /**
   * 当前钱包应用使用的钱包信息, 如名称,地址
   * @memberof WalletStore
   */
  /**
   * Wallet information, including name and address.
   * @memberof WalletStore
   */
  @observable walletInfo = {};
  /**
   * 钱包导入成功存放数据 列表
   * @memberof WalletStore
   */
  /**
   * List of imported information.
   * @memberof WalletStore
   */
  @observable walletImportList = [];

  /**
   * 创建钱包的信息
   * @memberof WalletStore
   */
  /**
   * Data used to create the wallet.
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
  /**
   *
   * Sets the wallet information.
   * @param {object} walletInfo - Wallet information.
   * @param {string} walletInfo.name - Name of the wallet.
   * @param {string} walletInfo.address - Address of the wallet.
   * @memberof WalletStore
   */
  @action setWalletInfo(walletInfo) {
    this.walletInfo = walletInfo;
    when(
      () => this.walletInfo,
      () => {
        chrome.storage.sync.set({ walletInfo: JSON.stringify(this.walletInfo) });
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
  /**
   * Saves the information used to create the wallet.
   *
   * @param {object} walletInfo - Wallet information.
   * @param {string} walletInfo.name - Name of the wallet.
   * @param {string} walletInfo.address - Address of the wallet.
   * @memberof WalletStore
   */
  @action setCreateWalletData(walletInfo) {
    this.createWalletData = walletInfo;
  }

  /**
   * 当添加过钱包KeyStore数据后, 下次打开钱包插件, 会从Chrome.storage.sync中读取吃就好的数据,已实现数据的复原
   * @memberof WalletStore
   */
  /**
   * Reads from chrome.storage.sync to restore data.
   *
   * Used when opening the Wallet Extension after keystore has been imported.
   *
   * @memberof WalletStore
   */
  init() {
    chrome.storage.sync.get(
      ['walletImportList', 'walletInfo'], //
      action(({ walletImportList, walletInfo }) => {
        if (walletImportList || walletInfo) {
          this.walletImportList = Object.values(JSON.parse(walletImportList)) || [];
          this.walletInfo = JSON.parse(walletInfo) || {};
        }
      }),
    );
  }

  /**
   * 设置导入钱包, 同时把数据存入 chrome.storage.sync 浏览器中
   * @param {Object} walletInfo
   * @param {Object} walletList
   * @memberof WalletStore
   */
  /**
   * Writes data to chrome.storage.sync when importing the wallet.
   * @param {object} walletInfo - Wallet information.
   * @param {Object} walletList - List of wallets.
   * @memberof WalletStore
   */
  @action importWallet({ walletInfo, walletList }) {
    if (walletInfo) {
      this.walletImportList.push(walletInfo);
    }
    if (walletList) {
      this.walletImportList = Object.values(walletList) || [];
    }

    when(
      () => this.walletImportList,
      () => {
        console.log('监听数据', this.walletImportList);
        chrome.storage.sync.set({ walletImportList: JSON.stringify(this.walletImportList) });
      },
    );
  }
}

export default WalletStore;
