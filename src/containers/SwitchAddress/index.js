/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-28 11:31:51
 * @ Description: 多语言切换组件
 */

import React from 'react';
import { Select, Tag } from 'antd';

import './index.less';

const SwitchAddress = ({ dataList, curAddress, onChange }) => {
  // const walletStore = React.useContext(MobXProviderContext).walletStore;
  // const dataList = walletStore.walletImportList;

  function createSelectAddress() {
    return (
      <Select
        className="findora-switch-address"
        defaultValue={curAddress}
        style={{ width: '100%' }}
        onChange={onChange}
      >
        {dataList.map((item) => {
          return (
            <Select.Option value={item.publickey} key={item.publickey}>
              <Tag color="#f50">{item.keyStore.name}</Tag> <Tag>{item.publickey}</Tag>
            </Select.Option>
          );
        })}
      </Select>
    );
  }
  return dataList ? createSelectAddress() : <div>请先创建钱包地址</div>;
};

export default SwitchAddress;
