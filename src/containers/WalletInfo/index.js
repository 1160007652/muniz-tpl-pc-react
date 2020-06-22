/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 21:20:45
 * @ Description: 钱包详情组件
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, message, Input, Form, Row } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';
import { saveAs } from 'file-saver';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import WalletListItem from '_components/WalletListItem';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [walletPassword, setWalletPassword] = useState();

  const [visible, setVisible] = useState(false);
  /** 下载钱包 */
  function handleClickExportWallet() {
    setVisible(true);
  }
  function handleChangeWalletName(name) {
    const walletInfo = walletStore.walletInfo;
    const newWalletList = walletStore.walletImportList.map((item) => {
      let currentWallet = item;
      if (item.publickey === walletInfo.publickey) {
        currentWallet.keyStore.name = name;
        console.log('gaiming: ', JSON.stringify(currentWallet));
      }
      return currentWallet;
    });

    walletStore.importWallet({ walletList: newWalletList });
  }
  /** Model 弹出框 确认*/
  async function handleModalOk(e) {
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
      saveAs(blob, `${publickey}.txt`);

      setVisible(false);
    }
  }
  /** Model 弹出框 取消 */
  function handleModalCancel(e) {
    setWalletPassword('');
    setVisible(false);
  }
  function handleChangePassword(e) {
    e.stopPropagation();
    setWalletPassword(e.target.value);
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
      <Modal title="Export Wallet" visible={visible} onOk={handleModalOk} onCancel={handleModalCancel}>
        <Input
          type="password"
          value={walletPassword}
          placeholder={intl.get('restorewallet_inputpassword')}
          onChange={handleChangePassword}
        />
      </Modal>
    </div>
  );
};

export default WalletInfo;
