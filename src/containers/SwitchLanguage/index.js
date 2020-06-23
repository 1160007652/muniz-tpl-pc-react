/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 16:03:12
 * @ Description: 多语言切换组件
 */

import React from 'react';
import { Select } from 'antd';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const SwitchLanguage = () => {
  const localeStore = React.useContext(MobXProviderContext).localeStore;
  function handleChangeLanguage(val) {
    localeStore.changeLocale(val);
  }
  return (
    <Select defaultValue={localeStore.locale} style={{ width: '100%' }} onChange={handleChangeLanguage}>
      <Select.Option value="zh">{intl.get('locale_zh')}</Select.Option>
      <Select.Option value="en">{intl.get('locale_en')}</Select.Option>
    </Select>
  );
};

export default observer(SwitchLanguage);
