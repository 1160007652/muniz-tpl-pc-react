/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 16:25:39
 * @ Description: 钱包详情组件
 */

import React from 'react';
import { Link } from 'react-router-dom';

import './index.less';

const RestoreWallet = () => {
  return (
    <div className="findora-wallet-empty">
      钱包详情页面
      <Link to={pageURL.home} className="menu-cancel">
        返回首页, Home
      </Link>
    </div>
  );
};

export default RestoreWallet;
