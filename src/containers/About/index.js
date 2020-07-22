/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 11:23:04
 * @ Description: 钱包详情组件
 */

import React from 'react';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import './index.less';

const About = () => {
  return (
    <div className="findora-wallet-about">
      <FindoraHeader title={intl.get('page_wallet_about_title')} isShowBack menu={<HeaderMenu />} />
      <div>关于我们</div>
    </div>
  );
};

export default About;
