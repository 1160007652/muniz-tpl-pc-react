/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 18:04:32
 * @ Description: 钱包详情组件
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';

import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  return (
    <div className="findora-wallet-empty">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      <div>
        钱包详情页面
        <div>钱包名称:</div>
        <div>{walletStore.walletInfo.name}</div>
        <div>钱包地址:</div>
        <div>{walletStore.walletInfo.address}</div>
      </div>
    </div>
  );
};

export default WalletInfo;
