import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import TransactionsItem from '_components/TransactionsItem';

import './index.less';
import pageURL from '_constants/pageURL';

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

  function handleClickItemInfo(item) {
    return () => {
      history.push({ pathname: pageURL.transactionsDetail, state: item });
    };
  }
  return (
    <div className="transactions">
      <FindoraHeader title="Transactions" isShowBack menu={<HeaderMenu />} />
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