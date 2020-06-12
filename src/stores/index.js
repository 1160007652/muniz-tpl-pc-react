/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-04 10:47:47
 * @ Description: 根状态管理, 最佳使用方式
 */

import LocaleStore from './LocaleStore';
import WalletStore from './WalletStore';

class RootStore {
  constructor() {
    this.localeStore = new LocaleStore(this);
    this.walletStore = new WalletStore(this);
  }
}

export default new RootStore();
