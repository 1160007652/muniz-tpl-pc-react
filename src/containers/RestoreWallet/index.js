/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:38:34
 * @ Description: 恢复钱包、导入钱包组件
 */

import React, { useState } from 'react';
import { Input, Form, Button, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const RestoreWallet = () => {
  const [filename, setFileName] = useState('');
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  const renderCancelComponent = (
    <Link to={pageURL.home} className="menu-cancel">
      {intl.get('cancel')}
    </Link>
  );

  function handleBeforeUpload() {
    return false;
  }

  function handleChangeUpload(e) {
    const { fileList } = e;
    if (fileList.length !== 0) {
      if (fileList.length !== 1) {
        fileList.splice(0, 1);
      }
      setFileName(e.file.name);
    }
  }

  async function handleUnlockKeystore(e) {
    const reader = new FileReader();

    reader.readAsText(e.upload.file);

    reader.onload = async () => {
      const param = {
        keyStoreJson: JSON.parse(reader.result),
        password: e.password.toString(),
      };

      const result = await services.webKeyStore.setKeypair(param);

      if (result === 'passworderror') {
        message.error(intl.get('wallet_restore_password_error'));
      } else {
        // 导入钱包解密数据 与 keyStore原始数据,
        const walletInfoResult = { ...result, keyStore: param.keyStoreJson };

        // 如果钱包列表 ===  0 , 默认选中第一个钱包为当前选择项的状态
        // 如果钱包列表 >= 1, 那么 由用户在页面,进行UI交互选中某一个钱包作为当前选择项的状态
        if (walletStore.walletImportList.length === 0) {
          walletStore.setWalletInfo(walletInfoResult);
        }
        // 在钱包列表页面展示时使用解密数据, 在改名下载钱包时使用原始数据
        walletStore.importWallet({ walletInfo: walletInfoResult });
        history.push(pageURL.home);
      }
    };
  }
  return (
    <div className="findora-wallet-empty">
      <FindoraHeader title={intl.get('page_wallet_import_title')} isShowBack menu={<HeaderMenu />} />
      <div className="wallet-box">
        <Form name="restorekeystore" onFinish={handleUnlockKeystore}>
          <Row align="middle" justify="center" style={{ margin: '30px auto 10px', textAlign: 'center' }}>
            <Col xs={20} sm={8}>
              <Form.Item
                valuePropName="file,fileList"
                name="upload"
                rules={[
                  () => ({
                    validator(fileList, val) {
                      try {
                        if (val.fileList !== undefined) {
                          return Promise.resolve();
                        }
                        return Promise.reject(intl.get('wallet_restore_no_upload_file'));
                      } catch (error) {
                        return Promise.reject(intl.get('wallet_restore_no_upload_file'));
                      }
                    },
                  }),
                ]}
              >
                <Upload
                  showUploadList={false}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleChangeUpload}
                  accept=".txt"
                >
                  <Button type="primary">
                    <UploadOutlined />
                    {intl.get('wallet_restore_upload_file')}
                  </Button>
                  <div className="file-name">{filename}</div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" justify="center">
            <Col xs={24} sm={8}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: intl.get('wallet_restore_inputpassword'),
                  },
                ]}
                // initialValue="123456789"
              >
                <Input type="password" placeholder={intl.get('wallet_restore_inputpassword')} />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Col xs={24} sm={12}>
              <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
                {intl.get('wallet_restore_submit')}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default observer(RestoreWallet);
