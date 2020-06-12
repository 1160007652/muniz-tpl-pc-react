/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 16:13:43
 * @ Description: 导入钱包后的列表组件
 */

import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';

import './index.less';

const WalletListView = () => {
  return (
    <div className="findora-wallet-empty">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
    </div>
  );
};

export default WalletListView;
