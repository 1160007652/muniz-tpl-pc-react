import React, { useState, useEffect } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import intl from 'react-intl-universal';
import { toJS } from 'mobx';
import { List, Button, Spin } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import TransactionsItem from '_components/TransactionsItem';
import pageURL from '_constants/pageURL';
import services from '_src/services';

import './index.less';

const Transactions = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const transactionStore = React.useContext(MobXProviderContext).transactionStore;
  const historyParams = useParams();
  const walletInfo = toJS(walletStore.walletInfo);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshLoding, setRefreshLoding] = useState(false);
  const dataList = transactionStore.dataList[walletInfo.publickey]?.data || [];

  useEffect(() => {
    async function getTxnList(page) {
      const param = { page, walletInfo };
      const result = await services.txnServer.getTxnList(param);
      if (result.length > 0) {
        await transactionStore.getTransactionData({ address: walletInfo.publickey, data: result, page });
      }
      setInitLoading(false);
      setRefreshLoding(false);
    }
    if (dataList.length > 0) {
      // 默认加载 loading, 下拉刷新 refresh
      if (historyParams.action === 'refresh') {
        setRefreshLoding(true);
        getTxnList(-2);
      }
      setInitLoading(false);
    } else {
      getTxnList(0);
    }
  }, []);

  function handleClickItemInfo(item) {
    return () => {
      history.push({ pathname: pageURL.transactionsDetail, state: item });
    };
  }

  async function handleClickReload() {
    const page = transactionStore.dataList[walletInfo.publickey]?.page + 1;
    const param = { page, walletInfo };
    const result = await services.txnServer.getTxnList(param);
    if (result.length > 0) {
      await transactionStore.getTransactionData({ address: walletInfo.publickey, data: result, page });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  const loadMore = () => {
    if (initLoading) {
      return loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={handleClickReload}>{intl.get('transaction_loade_more')}</Button>
        </div>
      ) : null;
    } else {
      return !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={handleClickReload}>{intl.get('transaction_loade_more')}</Button>
        </div>
      ) : (
        <div className="data-empty">{intl.get('transaction_loade_empty')}</div>
      );
    }
  };

  return (
    <div className="transactions">
      <FindoraHeader title={intl.get('page_transactions_title')} isShowBack menu={<HeaderMenu />} />
      <Spin spinning={refreshLoding}>
        <List
          className="transactions-box"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore()}
          dataSource={dataList}
          renderItem={(item) => (
            <li onClick={handleClickItemInfo(item)} key={item.txn}>
              <TransactionsItem data={item} />
            </li>
          )}
        />
      </Spin>
    </div>
  );
};

export default observer(Transactions);
