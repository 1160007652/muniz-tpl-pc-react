import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';

import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const TransactionsDetail = () => {
  const RouterLocation = useLocation();
  const { from, to, state, txn, asset, type, blind } = RouterLocation.state;
  return (
    <FindoraWebContainer className="transactions-detail" title={intl.get('page_transactions_detail_title')}>
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
        <FindoraBoxView title={`${intl.get('asset_name')} ${intl.get('memo')}`}>
          <div>{asset.memo}</div>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('balance')}>
          <span className="address">{asset.numbers}</span>
        </FindoraBoxView>

        <div className="tags">
          <span className="tag tag-type">{intl.get(`txn_${type}`)}</span>
          {blind.isAmount && <span className="tag">{intl.get('blind_amount')}</span>}
          {blind.isType && <span className="tag">{intl.get('blind_type')}</span>}
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default TransactionsDetail;
