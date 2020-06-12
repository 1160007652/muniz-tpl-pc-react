/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 16:28:16
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable } from 'mobx';
import intl from 'react-intl-universal';
import en from '_src/assets/locales/en';
import zh from '_src/assets/locales/zh';

class LocaleStore {
  // 标签列表
  @observable locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en';

  // 获取标签列表
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
