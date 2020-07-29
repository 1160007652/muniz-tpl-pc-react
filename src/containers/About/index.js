/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 20:12:48
 * @ Description: 钱包详情组件
 */

import React from 'react';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import './index.less';

const About = () => {
  function handleOnClickGoIssue() {
    window.open('https://bugtracker.findora.org/projects/testnet/issues/new');
  }
  return (
    <div className="findora-wallet-about">
      <FindoraHeader title={intl.get('page_wallet_about_title')} isShowBack menu={<HeaderMenu />} />
      <div className="about-box">
        <h3>{intl.get('about_title')}</h3>
        <div className="version">
          {intl.get('about_version')}:{process.env.VERSION_APP}
        </div>
        <p>{intl.get('about_info')}</p>
        <div onClick={handleOnClickGoIssue} className="go_issue">
          https://bugtracker.findora.org/projects/testnet/issues/new
        </div>
      </div>
    </div>
  );
};

export default About;
