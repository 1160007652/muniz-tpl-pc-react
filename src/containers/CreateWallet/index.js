/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-11 15:34:14
 * @ Description: 创建钱包组件
 */

import React from 'react';
import { Input, Form, Button, Card, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import FindoraHeader from '_components/FindoraHeader';
import pageURL from '_constants/pageURL';
import services from '_src/services';

import './index.less';

const CreateWallet = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const history = useHistory();

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
  /**
   * @description 创建钱包, 下载 KeyStore 文件
   */
  async function handleCreateKeystoreWallet(e) {
    const param = {
      password: e.password.toString(),
      name: e.username.toString(),
    };
    if (!services.webKeyStore.hasKeypairWithName(param.name)) {
      walletStore.setCreateWalletData(param);
      history.push(pageURL.downKeyStore);
    } else {
      const args = {
        message: '警告提示',
        description: 'KeyStore 中 已存在该命名 密钥对',
        duration: 2,
      };
      notification.open(args);
    }
  }

  return (
    <div className="findora-wallet-create">
      <FindoraHeader title="Create Wallet" menu={renderCancelComponent} />
      <div className="create-wallet-box">
        {/* <div className="tip">{intl.get('createwallet_keystoreinfo')}</div> */}
        <Form name="createkeystorewallet" {...formItemLayout} onFinish={handleCreateKeystoreWallet}>
          <Form.Item
            name="username"
            label={intl.get('createwallet_inputname')}
            labelAlign="right"
            rules={[
              {
                required: true,
                message: intl.get('createwallet_passwordnotempty'),
              },
            ]}
            initialValue="Alice"
          >
            <Input type="text" className="inputwidth" />
          </Form.Item>
          <Form.Item
            name="password"
            label={intl.get('createwallet_inputpassword')}
            labelAlign="right"
            rules={[
              {
                required: true,
                message: intl.get('createwallet_passwordnotempty'),
              },
              { min: 9, message: intl.get('createwallet_passwordless9') },
            ]}
            initialValue="123456789"
          >
            <Input type="password" className="inputwidth" />
          </Form.Item>
          <Form.Item
            name="passwordagain"
            label={intl.get('createwallet_inputpasswordagain')}
            labelAlign="right"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: intl.get('createwallet_passwordnotempty'),
              },

              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value === getFieldValue('password')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(intl.get('createwallet_twopasswordnotmatch'));
                },
              }),
            ]}
            initialValue="123456789"
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { offset: 0 },
              sm: { offset: 11 },
            }}
          >
            <Button type="primary" htmlType="submit">
              {intl.get('createwallet_next')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default observer(CreateWallet);
