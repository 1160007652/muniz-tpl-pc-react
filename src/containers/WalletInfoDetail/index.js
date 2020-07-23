/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 18:13:11
 * @ Description: 钱包详情组件
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toJS } from 'mobx';
import { Modal, message, Input, Alert } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';
import { saveAs } from 'file-saver';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import WalletListItem from '_components/WalletListItem';
import FindoraBoxView from '_components/FindoraBoxView';
import SwitchAssetName from '_containers/SwitchAssetName';
import Balance from '_containers/Balance';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [walletPassword, setWalletPassword] = useState();
  const [assetName, setAssetName] = useState({
    short: '',
    long: '',
  });
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleRemove, setVisibleRemove] = useState(false);

  /** 下载钱包 */
  function handleClickExportWallet() {
    setVisibleExport(true);
  }

  /** 移除钱包 */
  function handleClickRemoveWallet() {
    setVisibleRemove(true);
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
  /** Model 弹出框 确认*/
  async function handleModalExportOk(e) {
    const { keyStore, publickey } = walletStore.walletInfo;
    const param = {
      keyStoreJson: keyStore,
      password: walletPassword || '',
    };

    const result = await services.webKeyStore.setKeypair(param);

    if (result === 'passworderror') {
      message.error(intl.get('restorewallet_passworderror'));
    } else {
      const blob = new Blob([JSON.stringify(keyStore)], { type: 'utf-8' });
      saveAs(blob, `${publickey}.findorawallet`);
      // chrome.downloads.download({
      //   url: URL.createObjectURL(blob),
      //   filename: `${fileName}.findorawallet`,
      //   saveAs: true,
      // });

      setVisibleExport(false);
    }
  }
  /** Model 弹出框 取消 */
  function handleModalExportCancel(e) {
    setWalletPassword('');
    setVisibleExport(false);
  }

  /** 用于保存钱包密码,在下载钱包时需要重新输入 */
  function handleChangePassword(e) {
    e.stopPropagation();
    setWalletPassword(e.target.value);
  }

  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    setAssetName(value);
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

  /** 确认 删除钱包事件 */
  function handleModalRemoveOk() {
    const walletInfo = walletStore.walletInfo;

    const newWalletList = walletStore.walletImportList.filter((item) => item.publickey !== walletInfo.publickey);

    walletStore.importWallet({ walletList: newWalletList });

    setVisibleRemove(false);

    if (newWalletList.length > 0) {
      walletStore.setWalletInfo(newWalletList[0]);
    } else {
      walletStore.setWalletInfo({});
    }

    history.push({ pathname: pageURL.home });
  }

  /** 取消 删除钱包事件 */
  function handleModalRemoveCancel(e) {
    setVisibleRemove(false);
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
          <Balance asset={assetName} style={{ textAlign: 'right' }} key={assetName.long} />
        </FindoraBoxView>
        <div className="line" />
      </div>
      <div className="button-area">
        <FindoraButton className="mb20" onClick={handleChangeRouter(pageURL.send)}>
          Send
        </FindoraButton>
        <FindoraButton
          className="mb20"
          onClick={handleChangeRouter(pageURL.transactions.replace(':action', 'loading'))}
        >
          Transactions
        </FindoraButton>
        <FindoraButton className="mb20" onClick={handleClickExportWallet}>
          Export Wallet
        </FindoraButton>
        <FindoraButton onClick={handleClickRemoveWallet}>Remove Wallet</FindoraButton>
      </div>
      <Modal
        title={intl.get('wallet_export_title')}
        visible={visibleExport}
        onOk={handleModalExportOk}
        onCancel={handleModalExportCancel}
      >
        <Input
          type="password"
          value={walletPassword}
          placeholder={intl.get('wallet_restore_inputpassword')}
          onChange={handleChangePassword}
        />
      </Modal>
      <Modal
        title={intl.get('wallet_remove_title')}
        visible={visibleRemove}
        onOk={handleModalRemoveOk}
        onCancel={handleModalRemoveCancel}
      >
        <Alert
          message={intl.get('notice')}
          description={intl.get('wallet_remove_notice')}
          type="info"
          showIcon
          style={{ marginBottom: '25px', background: '#EEE2FF' }}
        />
      </Modal>
    </div>
  );
};

export default observer(WalletInfo);
