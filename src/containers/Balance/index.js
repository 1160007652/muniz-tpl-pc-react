/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 16:51:51
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React from 'react';
import PropTypes from 'prop-types';

import './index.less';

const Balance = ({ style, asset }) => {
  return (
    <div className="findora-balance" style={style}>
      {asset?.unit?.numbers ?? ''}
      {/* <span>{asset.unit.short}</span> */}
    </div>
  );
};

Balance.propTypes = {
  /** 当前资产名称 */
  asset: PropTypes.object,
};

Balance.defaultProps = {
  asset: null,
};

export default Balance;
