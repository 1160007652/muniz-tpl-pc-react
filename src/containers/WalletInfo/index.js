/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 15:56:29
 * @ Description: 钱包详情组件
 */

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal, message, Input, Select } from 'antd';
import { MobXProviderContext, observer } from 'mobx-react';
import { saveAs } from 'file-saver';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import WalletListItem from '_components/WalletListItem';
import FindoraBoxView from '_components/FindoraBoxView';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletInfo = () => {
  const history = useHistory();
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
  /** 用于保存钱包密码,在下载钱包时需要重新输入 */
  function handleChangePassword(e) {
    e.stopPropagation();
    setWalletPassword(e.target.value);
  }
  /** 资产名称选中事件 */
  function handleChangeSelectAssetName() {}

  /** 路由跳转页面 */
  function handleChangeRouter(path) {
    return () => {
      history.push(path);
    };
  }
  return (
    <div className="findora-wallet-Info">
      <FindoraHeader title="Wallet" isShowBack menu={<HeaderMenu />} />
      <WalletListItem
        className="wallet-item"
        key={walletStore.walletInfo.publickey}
        data={walletStore.walletInfo}
        isShowEdit
        onChangeName={handleChangeWalletName}
      />
      <div className="asset-name">
        <FindoraBoxView title="Asset Name">
          <Select defaultValue="FIN" style={{ width: '100%' }} onChange={handleChangeSelectAssetName}>
            <Select.Option value="FIN">FIN</Select.Option>
            <Select.Option value="GIN">GIN</Select.Option>
          </Select>
        </FindoraBoxView>
        <FindoraBoxView title="Balance" isRow style={{ justifyContent: 'space-between' }}>
          <span className="value">300</span>
        </FindoraBoxView>
        <div className="line" />
      </div>
      <div className="button-area">
        <FindoraButton className="mb20" onClick={handleChangeRouter(pageURL.send)}>
          Send
        </FindoraButton>
        <FindoraButton className="mb20" onClick={handleChangeRouter(pageURL.transactions)}>
          Transactions
        </FindoraButton>
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
