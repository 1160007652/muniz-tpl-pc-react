/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 16:30:07
 * @ Description: 多语言切换组件
 */

import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';

import './index.less';

const SwitchNetwork = () => {
  const [networkType, setNetworkType] = useState('online');

  useEffect(() => {
    chrome.storage.sync.get(['networkConfig'], ({ networkConfig }) => {
      if (networkConfig) {
        setNetworkType(networkConfig);
      }
    });
  }, []);

  const localeStore = React.useContext(MobXProviderContext).localeStore;
  function handleChangeLanguage(val) {
    chrome.storage.sync.set({ networkConfig: String(val).toLocaleLowerCase() }, () => {
      setNetworkType(String(val).toLocaleLowerCase());
    });
  }
  return (
    <Select value={networkType} style={{ width: '100%' }} onChange={handleChangeLanguage}>
      <Select.Option value="online">{intl.get('network_online')}</Select.Option>
      <Select.Option value="testnet">{intl.get('network_testnet')}</Select.Option>
    </Select>
  );
};

export default observer(SwitchNetwork);
