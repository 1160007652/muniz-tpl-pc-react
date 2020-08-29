/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 18:13:11
 * @ Description: 钱包详情组件
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import WalletListItem from '_components/WalletListItem';
import FindoraBoxView from '_components/FindoraBoxView';
import SwitchAssetName from '_containers/SwitchAssetName';
import StatementTransactions from '_containers/StatementTransactions';

import Balance from '_containers/Balance';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [assetName, setAssetName] = useState({
    asset: {
      short: '',
      long: '',
    },
  });

  function handleChangeWalletName(name) {
    const walletInfo = walletStore.walletInfo;
    walletInfo.keyStore.name = name;
    const newWalletList = walletStore.walletImportList.map((item) => {
      let currentWallet = item;
      if (item.publickey === walletInfo.publickey) {
        currentWallet.keyStore.name = name;
      }
      return currentWallet;
    });
    walletStore.setWalletInfo(walletInfo);
    walletStore.importWallet({ walletList: newWalletList });
  }

  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    setAssetName(value);
    console.log('回调结果： ', value);
  }

  /** 余额回调结果 */
  function handleChangeBalance(value) {
    setAssetName(value);
  }

  /** 路由跳转页面 */
  function handleChangeRouter(path) {
    return () => {
      history.push(path);
    };
  }

  return (
    <div className="findora-wallet-Info-detail">
      <WalletListItem
        className="wallet-item"
        key={walletStore.walletInfo.publickey}
        data={walletStore.walletInfo}
        isShowEdit
        onChangeName={handleChangeWalletName}
      />
      <div className="asset-name">
        <FindoraBoxView title={intl.get('asset_name')}>
          <SwitchAssetName
            onResult={handleChangeSelectAssetName}
            actionTYpe={SwitchAssetName.ACTION_TYPE.SEND}
            address={walletStore.walletInfo.publickey}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('balance')} isRow style={{ justifyContent: 'space-between' }}>
          <Balance asset={assetName.asset} style={{ textAlign: 'right' }} key={assetName.asset.long} />
        </FindoraBoxView>
        <div className="line" />
        <FindoraBoxView title={intl.get('menu_asset_transactions')}>
          <StatementTransactions data={assetName.codeAssetList} />
        </FindoraBoxView>
      </div>
    </div>
  );
};

export default observer(WalletInfo);
