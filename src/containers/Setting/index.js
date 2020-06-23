/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 16:05:33
 * @ Description: 设置页面
 */

import React from 'react';

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
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
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
