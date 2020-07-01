/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 14:44:44
 * @ Description: 钱包详情组件
 */

import React from 'react';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import WalletInfoDetail from '_containers/WalletInfoDetail';
import './index.less';

const WalletInfo = () => {
  return (
    <div className="findora-wallet-Info">
      <FindoraHeader title="Wallet" isShowBack menu={<HeaderMenu />} />
      <WalletInfoDetail />
    </div>
  );
};

export default WalletInfo;
