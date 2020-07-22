/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-08 18:11:16
 * @ Description: 根状态管理, 最佳使用方式
 */

import LocaleStore from './LocaleStore';
import WalletStore from './WalletStore';
import AssetStore from './AssetStore';

/**
 * 创建根Stroe, 统一管理状态
 * @category MobxStore
 */
/**
 * Root store to manage all other stores.
 * @category MobxStore
 */
class RootStore {
  /**
   * 构造方法, 集合子Store
   */
  /**
   * Constructs all stores.
   */
  constructor() {
    /** 多语言状态管理 */
    /** Store to manage languages */
    this.localeStore = new LocaleStore(this);
    /** 钱包状态管理 */
    /** Store to manage the wallet */
    this.walletStore = new WalletStore(this);
    /** 资产状态管理 */
    /** Store to manage assets */
    this.assetStore = new AssetStore(this);
  }
}

export default new RootStore();
