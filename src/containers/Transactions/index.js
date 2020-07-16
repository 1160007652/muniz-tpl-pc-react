import React, { useState, useEffect } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import intl from 'react-intl-universal';
import { toJS } from 'mobx';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import TransactionsItem from '_components/TransactionsItem';
import pageURL from '_constants/pageURL';
import services from '_src/services';

import './index.less';

const Transactions = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const param = { walletInfo: toJS(walletStore.walletInfo) };
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    async function getTxnList() {
      const result = await services.txnServer.getTxnList(param);
      setDataList(result);
    }
    getTxnList();
  }, []);

  function handleClickItemInfo(item) {
    return () => {
      history.push({ pathname: pageURL.transactionsDetail, state: item });
    };
  }

  async function handleClickReload() {
    setDataList([]);
    const result = await services.txnServer.getTxnList(param);
    setDataList(result);
  }

  return (
    <div className="transactions">
      <FindoraHeader title={intl.get('page_transactions_title')} isShowBack menu={<HeaderMenu />} />
      <ul className="transactions-box">
        {dataList ? (
          dataList.map((item) => {
            return (
              <li onClick={handleClickItemInfo(item)} key={item.txn}>
                <TransactionsItem data={item} />
              </li>
            );
          })
        ) : (
          <li>暂无历史数据</li>
        )}
      </ul>
      <div onClick={handleClickReload}> 刷新数据 </div>
    </div>
  );
};

export default observer(Transactions);
