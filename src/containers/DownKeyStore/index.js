/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 15:35:21
 * @ Description: 下载钱包KeyStore 文件
 */

import React from 'react';
import { Alert, Form, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';
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
      {intl.get('cancel')}
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
        <Alert message={intl.get('notice')} description={intl.get('wallet_down_notice')} type="info" showIcon />
        <Form name="downKeyStore" {...formItemLayout} onFinish={handleDownKeyStore}>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{intl.get('wallet_down_agree')}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {intl.get('wallet_down_btn')}
            </Button>
          </Form.Item>
        </Form>
        <Link to={pageURL.createwallet}>{intl.get('navigation_back')}</Link>
      </div>
    </div>
  );
};

export default observer(DownKeyStore);
