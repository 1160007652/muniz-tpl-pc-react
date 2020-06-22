/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 17:03:32
 * @ Description: 钱包详情组件
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import { saveAs } from 'file-saver';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';

import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  /** 下载钱包 */
  function handleClickExportWallet() {
    const { keyStore, publickey } = walletStore.walletInfo;
    const blob = new Blob([JSON.stringify(keyStore)], { type: 'utf-8' });
    saveAs(blob, `${publickey}.txt`);
  }
  return (
    <div className="findora-wallet-empty">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      <div>
        钱包详情页面
        <div>钱包名称:</div>
        <div>{walletStore.walletInfo.keyStore.name}</div>
        <div>钱包地址:</div>
        <div>{walletStore.walletInfo.publickey}</div>
      </div>

      <FindoraButton onClick={handleClickExportWallet}>Export Wallet</FindoraButton>
    </div>
  );
};

export default WalletInfo;
