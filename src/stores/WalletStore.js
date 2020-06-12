/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 21:57:00
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when } from 'mobx';
import { init } from 'react-intl-universal';

class WalletStore {
  constructor() {
    this.init();
  }
  // wallet Info
  // 钱包信息
  @observable walletInfo = {
    name: '', // 钱包名称, wallet name example: Alice
    address: '', // 钱包地址 , wallet address example: publicKey
  };

  @observable walletImportList = []; // 钱包导入成功存放数据 列表

  @observable createWalletData = {
    name: '', // 名称
    password: '', // 密码
  };

  // 设置当前使用的钱包信息
  @action setWalletInfo(obj) {
    this.walletInfo = obj;
    when(
      () => this.walletInfo,
      () => {
        chrome.storage.sync.set({ walletInfo: this.walletInfo });
      },
    );
  }

  // 设置 创建钱包的数据
  @action setCreateWalletData(walletDataObj) {
    this.createWalletData = walletDataObj;
  }

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

  // 设置 导入钱包
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
