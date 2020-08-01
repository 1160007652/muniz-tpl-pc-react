/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 14:58:43
 * @ Description: 下载钱包KeyStore 文件
 */

import React, { useState } from 'react';
import { Alert, Form, Button, Checkbox, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import pageURL from '_constants/pageURL';
import services from '_src/services';

import './index.less';

const DownKeyStore = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const history = useHistory();
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileData, setFileData] = useState(null);
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
      try {
        // 如果 为 True , 才允许下载 KeyStore
        let fileDataTemp = null;
        let fileName = '';

        if (!fileData) {
          fileDataTemp = await services.webKeyStore.addNewKeypair(walletStore.createWalletData);
          fileName = fileDataTemp.name;
        } else {
          fileName = fileData.name;
        }

        console.log(fileDataTemp);
        chrome.downloads.download(
          {
            filename: fileName,
            saveAs: true,
            conflictAction: 'overwrite',
            url: window.URL.createObjectURL(fileData || fileDataTemp),
            method: 'GET',
          },
          (downloadItem) => {
            console.log(downloadItem);
            if (downloadItem) {
              setFileData(fileDataTemp);
              message.success(intl.get('wallet_down_success'));
            } else {
              setFileData(null);
              message.error(intl.get('wallet_down_fail'));
            }
          },
        );

        setIsSuccess(true);
      } catch (eee) {
        console.log(eee);
        message.error(intl.get('wallet_down_fail'));
        setIsSuccess(false);
      }
    }
  }

  function handleOnClickToPath() {
    history.replace({ pathname: pageURL.restoreWallet });
  }

  return (
    <div className="findora-down-key-store">
      <FindoraHeader title="Create Wallet" isShowBack menu={<HeaderMenu />} />
      <div className="key-store-box">
        <Alert
          message={intl.get('notice')}
          style={{ marginBottom: '12px' }}
          description={intl.get('wallet_down_notice')}
          type="info"
          showIcon
        />
        <Form name="downKeyStore" {...formItemLayout} onFinish={handleDownKeyStore}>
          <Form.Item
            name="remember"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(intl.get('download_tips_checkbox')),
              },
            ]}
          >
            <Checkbox>{intl.get('wallet_down_agree')}</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: '0 auto', display: 'block' }}>
              {intl.get('wallet_down_btn')}
            </Button>
          </Form.Item>
        </Form>
        {isSuccess && (
          <Button type="primary" className="import-wallet" onClick={handleOnClickToPath}>
            {intl.get('wallet_create_lafter_import_tips')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(DownKeyStore);
