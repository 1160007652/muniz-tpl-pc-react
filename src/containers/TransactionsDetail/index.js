import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraBoxView from '_components/FindoraBoxView';

import './index.less';

const TransactionsDetail = () => {
  const RouterLocation = useLocation();
  const { from, to, state, txn, asset } = RouterLocation.state;
  return (
    <div className="transactions-detail">
      <FindoraHeader title={intl.get('page_transactions_detail_title')} isShowBack menu={<HeaderMenu />} />
      <div className="transactions-detail-box">
        {state ? (
          <div className="success">
            <CheckOutlined className="icon" /> {intl.get('success')}
          </div>
        ) : (
          <div className="fail">
            <CloseOutlined className="icon" /> {intl.get('fail')}
          </div>
        )}

        <FindoraBoxView title={intl.get('txn')}>
          <span className="address">{txn}</span>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('from')}>
          <span className="address">{from}</span>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('to')}>
          <span className="address">{to}</span>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name')}>
          <span className="address">{asset.tokenCode}</span>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('balance')}>
          <span className="address">{asset.numbers}</span>
        </FindoraBoxView>
      </div>
    </div>
  );
};

export default TransactionsDetail;
