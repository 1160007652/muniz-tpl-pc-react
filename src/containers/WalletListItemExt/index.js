import React, { Fragment, useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import { Button, Modal, message, Input, Alert } from 'antd';

import WalletListItem from '_components/WalletListItem';
import services from '_src/services';

import './index.less';

const WalletListItemExt = ({ data }) => {
  const [walletPassword, setWalletPassword] = useState();
  const [visibleExport, setVisibleExport] = useState(false);
  const [visibleRemove, setVisibleRemove] = useState(false);
  const { walletStore } = React.useContext(MobXProviderContext);
  /** 下载钱包 */
  function handleClickExportWallet() {
    setWalletPassword('');
    setVisibleExport(true);
  }

  /** 移除钱包 */
  function handleClickRemoveWallet() {
    setVisibleRemove(true);
  }

  /** Model 弹出框 确认*/
  async function handleModalExportOk(e) {
    const { keyStore, publickey } = data;
    const param = {
      keyStoreJson: keyStore,
      password: walletPassword || '',
    };

    const result = await services.webKeyStore.setKeypair(param);
    const fileName = keyStore.name;
    if (result === 'passworderror') {
      message.error(intl.get('wallet_restore_password_error'));
    } else {
      const blob = new Blob([JSON.stringify(keyStore)], { type: 'findorawallet/plain;charset=utf-8' });
      const fileData = new File([blob], `${fileName}.findorawallet`, {
        type: 'findorawallet/plain;charset=utf-8',
      });

      chrome.downloads.download({
        filename: `${fileName}.findorawallet`,
        saveAs: true,
        conflictAction: 'overwrite',
        url: URL.createObjectURL(fileData),
        method: 'GET',
      });

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

  /** 确认 删除钱包事件 */
  function handleModalRemoveOk() {
    // const walletInfo = walletStore.walletInfo;
    const { publickey } = data;

    const newWalletList = walletStore.walletImportList.filter((item) => item.publickey !== publickey);

    walletStore.importWallet({ walletList: newWalletList });

    setVisibleRemove(false);

    if (newWalletList.length > 0) {
      walletStore.setWalletInfo(newWalletList[0]);
    } else {
      walletStore.setWalletInfo({});
    }

    // history.push({ pathname: pageURL.closeWallet });
  }

  /** 取消 删除钱包事件 */
  function handleModalRemoveCancel(e) {
    setVisibleRemove(false);
  }

  return (
    <div className="wallet-item-ext-box">
      <WalletListItem
        className={classNames('wallet-item', {
          'select-wallet-item': data.publickey === walletStore.walletInfo.publickey,
        })}
        data={data}
        style={{ marginBottom: '12px' }}
      />
      <div className="wallet-item-ext">
        <Button className="mb20" onClick={handleClickExportWallet}>
          {intl.get('wallet_export_title')}
        </Button>
        <Button className="mb20" onClick={handleClickRemoveWallet}>
          {intl.get('wallet_remove_title')}
        </Button>
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
        destroyOnClose
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

export default observer(WalletListItemExt);
