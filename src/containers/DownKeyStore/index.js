/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 14:36:30
 * @ Description: 下载钱包KeyStore 文件
 */

import React from 'react';
import { Alert, Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import FindoraHeader from '_components/FindoraHeader';
import pageURL from '_constants/pageURL';
import services from '_src/services';

import './index.less';

const DownKeyStore = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  const renderCancelComponent = (
    <Link to={pageURL.home} className="menu-cancel">
      Cancel
    </Link>
  );

  async function handleDownKeyStore(e) {
    if (e.remember) {
      // 如果 为 True , 才允许下载 KeyStore
      await services.webKeyStore.addNewKeypair(walletStore.createWalletData);
    }
  }

  return (
    <div className="findora-down-key-store">
      <FindoraHeader title="Create Wallet" menu={renderCancelComponent} />
      <div className="key-store-box">
        <Alert
          message="NOTICE"
          description="The keystore file is an encrypted file used to store the private key. It must be used with the password to unlock the wallet. Please keep the keystore file properly and remember the password. If one of them is lost,the asset will not be recovered."
          type="info"
          showIcon
        />
        <Form name="downKeyStore" {...formItemLayout} onFinish={handleDownKeyStore}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>I will save the keystore file and remember the password</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Download Keystore File
            </Button>
          </Form.Item>
        </Form>
        <Link to={pageURL.createwallet}>Back</Link>
      </div>
    </div>
  );
};

export default observer(DownKeyStore);
