import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';

import FindoraBoxView from '_components/FindoraBoxView';
import FindoraHeader from '_components/FindoraHeader';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const TransactionsDetail = ({ data }) => {
  const RouterLocation = useLocation();
  const { from, to, state, txn, asset, type, blind } = data || RouterLocation.state;

  // 是否是跟踪资产
  const isTraceAsset = asset.asset_rules?.tracing_policies?.length > 0;

  function detail() {
    return (
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
          {isTraceAsset && <span className="tag tag-transferable">{intl.get('transferable')}</span>}
        </div>
      </div>
    );
  }
  function detailCommpoent() {
    return (
      <div className="transactions-detail">
        <FindoraHeader />
        {detail()}
      </div>
    );
  }
  function detailRouterCommpoent() {
    return (
      <FindoraWebContainer className="transactions-detail" title={intl.get('page_transactions_detail_title')}>
        {detail()}
      </FindoraWebContainer>
    );
  }
  return data ? detailCommpoent() : detailRouterCommpoent();
};

export default TransactionsDetail;
