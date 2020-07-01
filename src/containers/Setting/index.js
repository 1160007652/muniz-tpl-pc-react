/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 15:58:34
 * @ Description: 设置页面
 */

import React from 'react';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';

import SwitchLanguage from '_containers/SwitchLanguage';
import SwitchNetWork from '_containers/SwitchNetWork';

import FindoraBoxView from '_components/FindoraBoxView';

import pageURL from '_constants/pageURL';

import './index.less';

const Setting = () => {
  return (
    <div className="findora-wallet-setting">
      <FindoraHeader title={intl.get('page_wallet_setting_title')} menu={<HeaderMenu />} />
      <div className="setting-box">
        <FindoraBoxView title="Network">
          <SwitchNetWork />
        </FindoraBoxView>
        <FindoraBoxView title="Language">
          <SwitchLanguage />
        </FindoraBoxView>
      </div>
    </div>
  );
};

export default Setting;
