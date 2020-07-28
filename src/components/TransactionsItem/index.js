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
import intl from 'react-intl-universal';

import FindoraBoxView from '../FindoraBoxView';

import './index.less';

/**
 * TransactionsItem 纯组件, 交易列表使用
 * @component
 */
/**
 * Pure component to display transaction list
 * @component
 */
const TransactionsItem = ({ data, onClick, className, style }) => {
  const { type, blind, from, to, asset, state, txn_type } = data;
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

      <FindoraBoxView title={intl.get('transaction_asset_type')}>
        <div className="address">{asset.tokenCode}</div>
      </FindoraBoxView>
      <div className="state">
        <div>
          <span className="tag">{intl.get(`txn_${type}`)}</span>
          {blind.isAmount && <span className="tag">{intl.get('blind_amount')}</span>}
          {blind.isType && <span className="tag">{intl.get('blind_type')}</span>}
        </div>
      </div>
      <div className="state">
        <div>
          <span className={state ? 'success tag' : 'fail tag'}>{state ? 'success' : 'fail'}</span>
        </div>
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
  /** 数据源 */
  /** Data source */
  data: PropTypes.object,
  /** 点击事件 */
  /** Click event */
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
