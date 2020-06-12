/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 11:33:01
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import './index.less';

const FindoraHeader = ({ title, menu }) => {
  return (
    <div className="findora-header">
      <div className="header-area">
        <div className="findora-logo">Findora</div>
        <div className="header-menu">{menu}</div>
      </div>
      <div className="page-title">{title}</div>
    </div>
  );
};

export default FindoraHeader;
