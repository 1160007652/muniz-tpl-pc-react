/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 18:26:39
 * @ Description: 钱包详情组件
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import { saveAs } from 'file-saver';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import WalletListItem from '_components/WalletListItem';

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
  function handleChangeWalletName(name) {
    const walletInfo = walletStore.walletInfo;
    const newWalletList = walletStore.walletImportList.map((item) => {
      let currentWallet = item;
      if (item.publickey === walletInfo.publickey) {
        currentWallet.keyStore.name = name;
      }
      return currentWallet;
    });

    walletStore.importWallet({ walletList: newWalletList });
  }

  return (
    <div className="findora-wallet-Info">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      <WalletListItem
        className="wallet-item"
        key={walletStore.walletInfo.publickey}
        data={walletStore.walletInfo}
        isShowEdit
        style={{ marginBottom: '12px' }}
        onChangeName={handleChangeWalletName}
      />
      <div className="button-area">
        <FindoraButton onClick={handleClickExportWallet}>Export Wallet</FindoraButton>
      </div>
    </div>
  );
};

export default WalletInfo;
