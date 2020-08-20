/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 20:12:48
 * @ Description: 钱包详情组件
 */

import React from 'react';
import intl from 'react-intl-universal';

import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const About = () => {
  function handleOnClickGoIssue() {
    window.open('mailto:testnet@findora.org');
  }
  return (
    <FindoraWebContainer className="findora-wallet-about" title={intl.get('page_wallet_about_title')}>
      <div className="about-box">
        <h3>{intl.get('about_title')}</h3>
        <div className="version">
          {intl.get('about_version')}: {process.env.VERSION_APP}
        </div>
        <p>{intl.get('about_info')}</p>
        <div onClick={handleOnClickGoIssue} className="go_issue">
          mailto:testnet@findora.org
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default About;
