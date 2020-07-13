/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 11:50:34
 * @ Description: 多语言切换组件
 */

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';
import webNetWork from '_src/services/webNetWork';

import './index.less';

const SwitchNetwork = () => {
  const networkConfig = localStorage.getItem('networkConfig');
  const [networkType, setNetworkType] = useState(networkConfig);

  const localeStore = React.useContext(MobXProviderContext).localeStore;
  function handleChangeLanguage(val) {
    const type = String(val).toLocaleLowerCase();
    setNetworkType(type);
    webNetWork.switchNetWork(type);
  }
  return (
    <Select value={networkType} style={{ width: '100%' }} onChange={handleChangeLanguage}>
      <Select.Option value="online">{intl.get('network_online')}</Select.Option>
      <Select.Option value="testnet">{intl.get('network_testnet')}</Select.Option>
    </Select>
  );
};

export default observer(SwitchNetwork);
