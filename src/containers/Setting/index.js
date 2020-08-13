/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:25:09
 * @ Description: 设置页面
 */

import React from 'react';
import intl from 'react-intl-universal';

// import FindoraHeader from '_components/FindoraHeader';
// import HeaderMenu from '_containers/HeaderMenu';

import SwitchLanguage from '_containers/SwitchLanguage';
import SwitchNetWork from '_containers/SwitchNetWork';

import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

// import pageURL from '_constants/pageURL';

import './index.less';

const Setting = () => {
  return (
    <FindoraWebContainer className="findora-wallet-setting" title={intl.get('page_wallet_setting_title')}>
      {/* <FindoraHeader title={intl.get('page_wallet_setting_title')} isShowBack menu={<HeaderMenu />} /> */}
      <div className="setting-box">
        <FindoraBoxView title={intl.get('network')}>
          <SwitchNetWork />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('Language')}>
          <SwitchLanguage />
        </FindoraBoxView>
      </div>
    </FindoraWebContainer>
  );
};

export default Setting;
