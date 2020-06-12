/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 15:51:08
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import './index.less';

const FindoraButton = ({ children, onCLick }) => {
  return (
    <div className="findora-button" onClick={onCLick}>
      {children}
    </div>
  );
};

export default FindoraButton;
