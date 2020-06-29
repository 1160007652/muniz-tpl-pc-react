import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraBoxView from '_components/FindoraBoxView';

import './index.less';

const TransactionsDetail = () => {
  const RouterLocation = useLocation();
  const { from, to, state, txn, asset } = RouterLocation.state;
  return (
    <div className="transactions-detail">
      <FindoraHeader title="Transactions" isShowBack menu={<HeaderMenu />} />
      <div className="transactions-detail-box">
        {state ? (
          <div className="success">
            <CheckOutlined className="icon" /> Success
          </div>
        ) : (
          <div className="fail">
            <CloseOutlined className="icon" /> Fail
          </div>
        )}

        <FindoraBoxView title="Txn">
          <span className="address">{txn}</span>
        </FindoraBoxView>
        <FindoraBoxView title="From">
          <span className="address">{from}</span>
        </FindoraBoxView>
        <FindoraBoxView title="To">
          <span className="address">{to}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name">
          <span className="address">{asset.unit}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Value">
          <span className="address">{asset.numbers}</span>
        </FindoraBoxView>
      </div>
    </div>
  );
};

export default TransactionsDetail;