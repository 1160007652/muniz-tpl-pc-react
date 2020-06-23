/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 16:04:58
 * @ Description: 多语言切换组件
 */

import React from 'react';
import { Select } from 'antd';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const SwitchNetwork = () => {
  const localeStore = React.useContext(MobXProviderContext).localeStore;
  function handleChangeLanguage(val) {
    // localeStore.changeLocale(val);
  }
  return (
    <Select defaultValue="Testnet" style={{ width: '100%' }} onChange={handleChangeLanguage}>
      <Select.Option value="Online">Online</Select.Option>
      <Select.Option value="Testnet">Testnet</Select.Option>
    </Select>
  );
};

export default observer(SwitchNetwork);
