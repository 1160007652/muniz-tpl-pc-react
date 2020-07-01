/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 16:28:19
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { useImmer } from 'use-immer';

import services from '_src/services';

import './index.less';

const SwitchAssetName = ({ onResult, address }) => {
  const [isSelect, setSelect] = useState('default');

  const [assetList, setAssetList] = useImmer([
    { short: 'Muniz', long: '4bmu7QZ5CGYWsTJKKFVwNw==' },
    { short: 'LLO', long: 'tfXxLbGGMCv-X58eQymv-w==' },
  ]);

  const [assetNameLong, setAssetNameLong] = useState(assetList[0].long);

  useEffect(() => {
    /** 从服务端获取 已创建的资产 */
    services.assetServer.getAssetNameServer({ address }).then((value) => {
      console.log(value);
    });

    /** 触发onResult事件 */
    const result = assetList.filter((item) => item.long === assetNameLong);
    onResult(result.length > 0 ? result[0] : {});
  }, []);

  /** 显示资产页面,切换资产事件 */
  function handleSelectAssetName(value) {
    setAssetNameLong(value);

    /** 触发onResult事件 */
    const result = assetList.filter((item) => item.long === value);
    onResult(result.length > 0 ? result[0] : {});
  }

  function showAssetName() {
    return (
      <div className="findora-switch-asset-name">
        <Select defaultValue={assetNameLong} style={{ width: '100%' }} onChange={handleSelectAssetName}>
          {assetList.map((item) => {
            return (
              <Select.Option value={item.long} key={item.long}>
                {item.short}
              </Select.Option>
            );
          })}
        </Select>
        <div className="tips">{assetNameLong}</div>
      </div>
    );
  }
  return showAssetName();
};

SwitchAssetName.propTypes = {
  /** 创建资产回调结果事件 */
  onResult: PropTypes.func,
  /** 当前钱包地址 */
  address: PropTypes.string,
};

SwitchAssetName.defaultProps = {
  onResult: () => {},
  address: '',
};

export default SwitchAssetName;
