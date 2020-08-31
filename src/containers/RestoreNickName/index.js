/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 10:38:34
 * @ Description: 恢复钱包、导入钱包组件
 */

import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { MobXProviderContext, observer } from 'mobx-react';
import { toJS } from 'mobx';

import services from '_src/services';

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
            return item.assetCode === cur.assetCode;
          });
          console.log(isPre);
          if (!isPre) {
            pre.push(cur);
          }

          return pre;
        }, jsonNickNameList);

        nickNameStore.importNickNameList({ nickNameList: result });
      }

      // 导入成功
      console.log('导入成功', reader.result);
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
        <Button icon={<UploadOutlined />}>Open another file</Button>
      </Upload>
    );
  }

  return <div className="nickname-box">{size === 'large' ? LargeComponent() : SmallComponent()}</div>;
};

export default observer(RestoreNickName);
