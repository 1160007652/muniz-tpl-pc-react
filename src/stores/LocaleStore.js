/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-14 12:09:51
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable } from 'mobx';
import intl from 'react-intl-universal';
import en from '_src/assets/locales/en';
import zh from '_src/assets/locales/zh';

/**
 * 多语言管理Store
 * @class LocaleStore
 */
class LocaleStore {
  /** 当前是那个国家的语言 */
  @observable locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en';

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
  }
}

export default LocaleStore;
