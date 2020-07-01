/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 12:31:06
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';

import services from '_src/services';

import './index.less';

const Balance = ({ onResult, assetName, style, walletInfo }) => {
  const [asset, setAsset] = useImmer({ ...assetName, numbers: 1000 });

  useEffect(() => {
    /** 从服务端获取 已创建的资产 对应的余额 */
    // asset.unit.long 长资产名称

    const param = {
      walletInfo,
    };

    services.walletServer.getBlance(param).then((value) => {
      console.log(value);
    });

    onResult(asset);

    console.log(2);
  }, []);

  return (
    <div className="findora-balance" style={style}>
      {asset?.numbers || 0} <span>{asset.unit.short}</span>
    </div>
  );
};

Balance.propTypes = {
  /** 创建资产余额回调结果事件 */
  onResult: PropTypes.func,
  /** 当前资产名称 */
  assetName: PropTypes.object,
};

Balance.defaultProps = {
  onResult: () => {},
  assetName: null,
};

export default Balance;
