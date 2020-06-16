/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-16 10:07:40
 * @ Description: 空钱包组件, 展示创建钱包、恢复钱包 按钮
 */

import React from 'react';
import { Link } from 'react-router-dom';
import FindoraButton from '_components/FindoraButton';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletEmpty = () => {
  return (
    <div className="findora-wallet-empty">
      <div className="tips">You don't have any wallet.</div>
      <div className="button-area">
        <Link to={pageURL.createwallet} className="button-create-wallet">
          <FindoraButton>Create Wallet</FindoraButton>
        </Link>
        <Link to={pageURL.restoreWallet} className="button-restory-wallet">
          <FindoraButton>Restore Wallet</FindoraButton>
        </Link>
      </div>
    </div>
  );
};

export default WalletEmpty;
