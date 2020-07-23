/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 17:24:44
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import FindoraBoxView from '../FindoraBoxView';

import './index.less';
import { Divider } from 'antd';

/**
 * TransactionsItem 纯组件, 交易列表使用
 * @component
 * @example <caption>组件案例</caption>
 *
 */
const TransactionsItem = ({ data, onClick, className, style }) => {
  const { time, from, to, asset, state, txn_type } = data;
  return (
    <div className={classNames('transactions-item', className)} onClick={onClick} style={style}>
      {/* <div className="time">{time}</div> */}

      <div className="utxo">
        <FindoraBoxView title="From">
          <span className="address">{`${String(from).substr(0, 20)}...`}</span>
        </FindoraBoxView>
        <FindoraBoxView title="To">
          <span className="address">{`${String(to).substr(0, 20)}...`}</span>
        </FindoraBoxView>
      </div>

      <FindoraBoxView title="AssetType ">
        <div className="address">{asset.tokenCode}</div>
      </FindoraBoxView>

      <div className="state">
        <span className={state ? 'success' : 'fail'}>{state ? 'success' : 'fail'}</span>
        <div className="value">
          {txn_type === 'input' ? '+' : '-'}
          {asset?.numbers}
          {/* <span>{asset.short}</span> */}
        </div>
      </div>
    </div>
  );
};

TransactionsItem.propTypes = {
  /** 点击事件 */
  data: PropTypes.object,
  /** 是否横行展示 */
  onClick: PropTypes.func,
};

TransactionsItem.defaultProps = {
  data: {
    time: '',
    from: '',
    to: '',
    state: false,
    asset: {},
  },
  onClick: () => {},
};

export default TransactionsItem;
