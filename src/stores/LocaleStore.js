/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-16 16:47:31
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when } from 'mobx';
import intl from 'react-intl-universal';
import en from '_src/assets/locales/en';
import zh from '_src/assets/locales/zh';

/**
 * 多语言管理Store
 * @category MobxStore
 */
class LocaleStore {
  constructor() {
    this.init();
  }
  /** 当前是那个国家的语言 */
  @observable locale = 'en';

  /** 切换多语言方法 */
  @action changeLocale(value) {
    localStorage.setItem('locale', value);
    intl.init({
      currentLocale: value,
      locales: {
        en,
        zh,
      },
    });
    this.locale = value;
    //  @observable locale , 只有发生变化, 就保存到storage中
    when(
      () => this.locale,
      () => {
        chrome.storage.sync.set({ locale: this.locale });
      },
    );
  }

  init() {
    chrome.storage.sync.get(['locale'], ({ locale }) => {
      this.changeLocale(locale || 'en');
    });
  }
}

export default LocaleStore;
