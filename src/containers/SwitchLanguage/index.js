/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 18:34:15
 * @ Description: 钱包详情组件
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
    <div className="findora-switch-language">
      <div>语言</div>
      <Select defaultValue={localeStore.locale} style={{ width: 120 }} onChange={handleChangeLanguage}>
        <Select.Option value="zh">{intl.get('locale_zh')}</Select.Option>
        <Select.Option value="en">{intl.get('locale_en')}</Select.Option>
      </Select>
    </div>
  );
};

export default observer(SwitchLanguage);
