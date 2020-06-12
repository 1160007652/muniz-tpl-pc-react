/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 18:00:44
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import classNames from 'classNames';
import './index.less';

const WalletListItem = ({ data, style, className, onClick }) => {
  return (
    <div className={classNames('wallet-list-item', className)} style={style} onClick={onClick}>
      <div className="wallet-list-logo" />
      <div className="wallet-list-text">
        <h3>{data.name}</h3>
        <div className="wallet-address">
          <span>{`${String(data.address).substr(0, 35)}...`}</span>
          <CopyOutlined />
        </div>
      </div>
    </div>
  );
};

export default WalletListItem;
