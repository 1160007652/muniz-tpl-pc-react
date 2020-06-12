/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 17:39:47
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, values } from 'mobx';

class WalletStore {
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

  // @observable keyStoreData = null; // 恢复钱包成功, 保存的数据

  // 设置钱包信息 , set wallet info
  @action setWalletInfo(obj) {
    this.walletInfo = { ...this.walletInfo, ...obj };
  }

  // 设置密钥对
  // @action setKeyStoreData(obj) {
  //   this.keyStoreData = obj;
  // }

  // 设置 创建钱包的数据
  @action setCreateWalletData(walletDataObj) {
    this.createWalletData = walletDataObj;
  }

  // 设置 导入钱包
  @action importWallet(walletInfo) {
    console.log(walletInfo);
    this.walletImportList.push(walletInfo);
  }
}

export default WalletStore;
