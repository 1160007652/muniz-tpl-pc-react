/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:38:34
 * @ Description: 恢复钱包、导入钱包组件
 */

import React from 'react';
import { Upload, Button, message, Modal } from 'antd';
import { InboxOutlined, UploadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';
import { toJS } from 'mobx';

import './index.less';

const RestoreNickName = ({ size }) => {
  const { nickNameStore } = React.useContext(MobXProviderContext);

  function handleBeforeUpload() {
    return false;
  }

  async function handleChangeUpload(e) {
    const { fileList } = e;
    if (fileList.length !== 0) {
      if (fileList.length !== 1) {
        fileList.splice(0, 1);
      }
      await handleUnlockKeystore(e.file);
    }
  }

  async function handleUnlockKeystore(file) {
    const reader = new FileReader();
    let isRepeat = false;

    reader.readAsText(file);

    reader.onload = async () => {
      const jsonNickNameList = toJS(nickNameStore.nickNameList);
      const newNickNameList = JSON.parse(reader.result);

      if (jsonNickNameList.length === 0) {
        nickNameStore.importNickNameList({ nickNameList: newNickNameList });
      } else {
        /**
         * 多文件导入去重复
         */
        const result = newNickNameList.reduce((pre, cur) => {
          const isPre = pre.some((item) => {
            const isEqualAssetCode = item.assetCode === cur.assetCode;
            if (isEqualAssetCode) {
              item.nicknames = [...new Set([...cur.nicknames, ...item.nicknames, cur.nickname, item.nickname])];
            }
            return isEqualAssetCode;
          });

          if (isPre) {
            isRepeat = true;
          } else {
            pre.push(cur);
          }

          return pre;
        }, jsonNickNameList);

        if (isRepeat) {
          Modal.confirm({
            title: intl.get('nickname_repeat_tips_title'),
            icon: <ExclamationCircleOutlined />,
            content: intl.get('nickname_repeat_tips_info'),
            onOk() {
              nickNameStore.importNickNameList({ nickNameList: result });
            },
          });
        } else {
          nickNameStore.importNickNameList({ nickNameList: result });
        }
      }
    };
  }

  function LargeComponent() {
    return (
      <Upload.Dragger
        onChange={handleChangeUpload}
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        accept=".findoranicknames"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{intl.get('nickname_restore_upload_file')}</p>
      </Upload.Dragger>
    );
  }

  function SmallComponent() {
    return (
      <Upload
        onChange={handleChangeUpload}
        showUploadList={false}
        beforeUpload={handleBeforeUpload}
        accept=".findoranicknames"
      >
        <Button icon={<UploadOutlined />}>{intl.get('nickname_restore_upload_file1')}</Button>
      </Upload>
    );
  }

  return <div className="nickname-box">{size === 'large' ? LargeComponent() : SmallComponent()}</div>;
};

export default observer(RestoreNickName);
