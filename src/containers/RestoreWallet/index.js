/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 18:36:09
 * @ Description: 恢复钱包、导入钱包组件
 */

import React, { useState } from 'react';
import { Input, Form, Button, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';
import { Link, useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';
import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const RestoreWallet = () => {
  const [filename, setFileName] = useState('');
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  const renderCancelComponent = (
    <Link to={pageURL.home} className="menu-cancel">
      Cancel
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
        message.error(intl.get('restorewallet_passworderror'));
      } else {
        // 如果钱包列表 ===  0 , 默认选中第一个钱包为当前选择项的状态
        // 如果钱包列表 >= 1, 那么 由用户在页面,进行UI交互选中某一个钱包作为当前选择项的状态
        if (walletStore.walletImportList.length === 0) {
          walletStore.setWalletInfo(result.views);
        }
        walletStore.importWallet(result);
        history.push(pageURL.home);
      }
    };
  }
  return (
    <div className="findora-wallet-empty">
      <FindoraHeader title="Create Wallet" menu={renderCancelComponent} />
      <div>
        <Form name="restorekeystore" onFinish={handleUnlockKeystore}>
          <Row align="middle" justify="center" style={{ margin: '30px auto 10px', textAlign: 'center' }}>
            <Col xs={20} sm={8}>
              <Form.Item
                valuePropName="file,fileList"
                name="upload"
                rules={[
                  () => ({
                    validator(fileList) {
                      try {
                        if (fileList !== undefined) {
                          return Promise.resolve();
                        }
                        return Promise.reject(intl.get('restorewallet_nouploadfile'));
                      } catch (error) {
                        return Promise.reject(intl.get('restorewallet_nouploadfile'));
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
                    {intl.get('restorewallet_uploadfile')}
                  </Button>
                  <div>{filename}</div>
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
                    message: intl.get('restorewallet_inputpassword'),
                  },
                ]}
                initialValue="123456789"
              >
                <Input type="password" placeholder={intl.get('restorewallet_inputpassword')} />
              </Form.Item>
            </Col>
          </Row>

          <Row align="middle" justify="center" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Col xs={24} sm={12}>
              <Button type="primary" htmlType="submit" style={{ width: '30%' }}>
                {intl.get('restorewallet_submit')}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default observer(RestoreWallet);