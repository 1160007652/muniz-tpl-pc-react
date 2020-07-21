/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 11:05:48
 * @ Description: 多语言切换组件
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Tag } from 'antd';
import intl from 'react-intl-universal';

import './index.less';

const SwitchAddress = ({ dataList, curAddress, onChange }) => {
  const [address, setAddress] = useState(curAddress);

  /** 选择地址事件 */
  async function handleSelectAddress(value) {
    setAddress(value);
    onChange(value);
  }

  function createSelectAddress() {
    return (
      <div className="findora-switch-address">
        <Select value={curAddress} style={{ width: '100%' }} onChange={handleSelectAddress}>
          {dataList.map((item) => {
            return (
              <Select.Option value={item.publickey} key={item.publickey}>
                {item.keyStore.name}
              </Select.Option>
            );
          })}
        </Select>
        <div className="tips"> {address} </div>
      </div>
    );
  }
  return dataList.length > 0 ? createSelectAddress() : <div>{intl.get('tips_wallet_create')}</div>;
};

SwitchAddress.propTypes = {
  /** 是否显示短地址 如: djhaskj73749ndsjas... */
  dataList: PropTypes.array,
  /** 当前钱包使用的地址 */
  curAddress: PropTypes.string,
  /** 钱包选中事件 */
  onChange: PropTypes.func,
};

SwitchAddress.defaultProps = {
  dataList: [],
  curAddress: '',
  onChange: () => {},
};

export default SwitchAddress;
