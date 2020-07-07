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

const dataList = [
  {
    txn: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB1',
    time: '9/19/2019 18:31',
    from: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
    to: 'n1NStVG4c9HqXGebAdNkfhypHebhGqdeNs5',
    state: true,
    asset: {
      numbers: '+10',
      unit: 'FIN',
    },
  },
  {
    txn: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB2',
    time: '9/19/2019 18:31',
    from: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
    to: 'n1NStVG4c9HqXGebAdNkfhypHebhGqdeNs5',
    state: false,
    asset: {
      numbers: '-10',
      unit: 'GIN',
    },
  },
];

const Transactions = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  useEffect(() => {
    const param = { walletInfo: toJS(walletStore.walletInfo) };
    services.txnServer.getTxnList(param).then((value) => {
      console.log(value);
    });
  }, []);

  function handleClickItemInfo(item) {
    return () => {
      history.push({ pathname: pageURL.transactionsDetail, state: item });
    };
  }

  return (
    <div className="transactions">
      <FindoraHeader title={intl.get('page_transactions_title')} isShowBack menu={<HeaderMenu />} />
      <ul className="transactions-box">
        {dataList &&
          dataList.map((item) => {
            return (
              <li onClick={handleClickItemInfo(item)} key={item.txn}>
                <TransactionsItem data={item} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default observer(Transactions);
