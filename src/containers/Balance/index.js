/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-09 18:27:24
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useImmer } from 'use-immer';
import { MobXProviderContext, observer } from 'mobx-react';

import services from '_src/services';

import './index.less';

const Balance = ({ onResult, assetName, style, walletInfo }) => {
  const assetStore = React.useContext(MobXProviderContext).assetStore;

  const [asset, setAsset] = useImmer({ ...assetName, numbers: 1000 });

  useEffect(() => {
    /** 从服务端获取 已创建的资产 对应的余额 */
    // asset.unit.long 长资产名称

    const param = {
      walletInfo,
    };

    // services.walletServer.getBlance(param).then((value) => {});
    assetStore.getAssetBalance({ address: walletInfo.publickey, tokenCode: asset.unit.long });

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
