/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-11 13:15:00
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable } from 'mobx';

class WalletStore {
  // wallet Info
  // 钱包信息
  @observable walletInfo = {
    address: '', // 钱包地址 , wallet address
  };

  @observable createWalletData = {
    name: '', // 名称
    password: '', // 密码
  };

  @observable keyStoreData = null; // 恢复钱包成功, 保存的数据

  // 设置钱包信息 , set wallet info
  @action setWalletInfo(obj) {
    this.walletInfo = { ...this.walletInfo, ...obj };
  }

  // 设置密钥对
  @action setKeyStoreData(obj) {
    this.keyStoreData = obj;
  }

  // 设置 创建钱包的数据
  @action setCreateWalletData(walletDataObj) {
    this.createWalletData = walletDataObj;
  }
}

export default WalletStore;
