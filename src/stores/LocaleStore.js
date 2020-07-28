/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 11:37:48
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
/**
 * Store to manage languages.
 * @category MobxStore
 */
class LocaleStore {
  constructor() {
    this.init();
  }

  /** 当前是那个国家的语言 */
  /** Current language */
  @observable locale = 'en';

  /** 切换多语言方法 */
  /** Switch language */
  @action changeLocale(value) {
    intl.init({
      currentLocale: value,
      locales: {
        en,
        zh,
      },
    });
    this.locale = value;
    when(
      () => this.locale,
      () => {
        localStorage.setItem('locale', this.locale);
      },
    );
  }

  init() {
    this.changeLocale(localStorage.getItem('locale') || 'en');
  }
}

export default LocaleStore;
