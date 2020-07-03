/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-02 17:31:55
 * @ Description: 根状态管理, 最佳使用方式
 */

import LocaleStore from './LocaleStore';
import WalletStore from './WalletStore';

/**
 * 创建根Stroe, 统一管理状态
 * @category MobxStore
 */
class RootStore {
  /**
   * 构造方法, 集合子Store
   */
  constructor() {
    /** 多语言状态管理 */
    this.localeStore = new LocaleStore(this);
    /** 钱包状态管理 */
    this.walletStore = new WalletStore(this);
  }
}

export default new RootStore();
