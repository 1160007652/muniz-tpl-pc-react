/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-02 17:34:36
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when, computed, toJS } from 'mobx';
/**
 * 钱包管理Store
 * @category MobxStore
 */
/**
 * Store to manage the wallet.
 * @category MobxStore
 */
class NickNameStore {
  /** 构造方法, 初始化数据 */
  /** Constructs a wallet store. */
  constructor() {
    this.init();
  }

  /**
   * nickname映射列表, [{assetCode: 'aaaaaaaa', nickname: '', options: {isConflict: false} }]
   */
  @observable nickNameList = [];

  /** 将列表转为对象 */
  @computed get nickNameObj() {
    const result = {};
    this.nickNameList.forEach((item) => {
      result[item.assetCode] = item;
    });

    return result;
  }

  init() {
    chrome.storage.sync.get(
      ['nickNameList'],
      action(({ nickNameList }) => {
        if (nickNameList) {
          this.nickNameList = Object.values(JSON.parse(nickNameList)) || [];
          console.log('xxxx', nickNameList);
        }
      }),
    );
  }

  /**
   * 设置导入nickname 映射文件, 同时把数据存入 chrome.storage.sync 浏览器中
   * @param {Object} obj 映射文件
   * @param {array} obj.nickNameList 全部映射文件
   * @param {Object} obj.nickNameItem 某一项映射文件
   * @memberof WalletStore
   */
  @action importNickNameList({ nickNameList, nickNameItem }) {
    if (nickNameItem) {
      this.nickNameList.push({ options: {}, ...nickNameItem });
    }
    if (nickNameList) {
      this.nickNameList = nickNameList || [];
    }

    when(
      () => this.nickNameList,
      () => {
        console.log('监听数据', this.nickNameList);
        chrome.storage.sync.set({ nickNameList: JSON.stringify(this.nickNameList) });
      },
    );
  }
}

export default NickNameStore;
