/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:30:59
 * @ Description: 创建钱包组件
 */

import React from 'react';
import { Input, Form, Button, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import pageURL from '_constants/pageURL';
import services from '_src/services';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const CreateWallet = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const history = useHistory();

  const formItemLayout = {
    labelCol: {
      xs: { span: 8 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
  };

  /**
   * @description 创建钱包, 下载 KeyStore 文件
   */
  async function handleCreateKeystoreWallet(e) {
    const param = {
      password: e.password.toString(),
      name: e.username.toString(),
    };
    // 校验已导入的离线钱包名称
    const importWalletHasName = walletStore.walletImportList.some((item) => {
      return item.keyStore.name === param.name;
    });
    // 校验本次活动状态下,创建过的离线钱包名称
    // services.webKeyStore.hasKeypairWithName(param.name) ||
    if (importWalletHasName) {
      const args = {
        message: intl.get('error'),
        description: intl.get('wallet_create_exists', { userName: param.name }),
        duration: 3,
      };
      notification.open(args);
    } else {
      walletStore.setCreateWalletData(param);
      history.push(pageURL.downKeyStore);
    }
  }

  return (
    <FindoraWebContainer className="findora-wallet-create" title={intl.get('menu_wallet_create')}>
      <div className="create-wallet-box">
        <p>{intl.get('wallet_create_keystore_info')}</p>
        <Form name="createkeystorewallet" {...formItemLayout} onFinish={handleCreateKeystoreWallet}>
          <Form.Item
            name="username"
            label={intl.get('wallet_create_inputname')}
            labelAlign="right"
            rules={[
              {
                required: true,
                message: intl.get('wallet_create_username_no_empty'),
              },
            ]}
            // initialValue="Alice"
          >
            <Input type="text" className="inputwidth" />
          </Form.Item>
          <Form.Item
            name="password"
            label={intl.get('wallet_create_inputpassword')}
            labelAlign="right"
            rules={[
              {
                required: true,
                message: intl.get('wallet_create_password_no_empty'),
              },
              { min: 9, message: intl.get('wallet_create_password_less9') },
            ]}
          >
            <Input type="password" className="inputwidth" />
          </Form.Item>
          <Form.Item
            name="passwordagain"
            label={intl.get('wallet_create_inputpassword_again')}
            labelAlign="right"
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: intl.get('wallet_create_password_no_empty'),
              },

              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value === getFieldValue('password')) {
                    return Promise.resolve();
                  }
                  return Promise.reject(intl.get('wallet_create_password_no_match'));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { offset: 0 },
              sm: { offset: 4 },
            }}
            labelCol={{
              xs: { span: 8 },
              sm: { span: 4 },
            }}
          >
            <Button type="primary" htmlType="submit">
              {intl.get('wallet_create_next')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateWallet);
