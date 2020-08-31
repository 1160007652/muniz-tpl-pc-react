/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:25:09
 * @ Description: 设置页面
 */

import React from 'react';
import intl from 'react-intl-universal';

import SwitchLanguage from '_containers/SwitchLanguage';
import SwitchNetWork from '_containers/SwitchNetWork';
import NickNameList from '_containers/NickNameList';

import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const Setting = () => {
  return (
    <FindoraWebContainer className="findora-wallet-setting" title={intl.get('page_wallet_setting_title')}>
      <div className="setting-box">
        <FindoraBoxView title={intl.get('network')}>
          <SwitchNetWork />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('Language')}>
          <SwitchLanguage />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name_short')}>
          <NickNameList />
        </FindoraBoxView>
      </div>
    </FindoraWebContainer>
  );
};

export default Setting;
