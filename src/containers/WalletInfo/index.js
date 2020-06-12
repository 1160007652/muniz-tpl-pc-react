/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 17:41:45
 * @ Description: 钱包详情组件
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';

import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  return (
    <div className="findora-wallet-empty">
      钱包详情页面
      <div>钱包地址:</div>
      <div>{walletStore.walletInfo.address}</div>
    </div>
  );
};

export default WalletInfo;
