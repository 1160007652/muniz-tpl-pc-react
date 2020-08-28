import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

import Loading from '_components/Loading';
import pageURL from '_constants/pageURL';

const delay = 250;
const timeout = 10000;

const routeMap = [
  {
    path: pageURL.closeWallet,
    component: './containers/CloseWallet',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.statement,
    component: './containers/Statement',
    exact: true,
    dynamic: true,
  },

  {
    path: pageURL.help,
    component: './containers/Help',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.createAsset,
    component: './containers/CreateAsset',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.issueAsset,
    component: './containers/IssueAsset',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.walletList,
    component: './containers/WalletListView',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.createwallet,
    component: './containers/CreateWallet',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.restoreWallet,
    component: './containers/RestoreWallet',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.setting,
    component: './containers/Setting',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.downKeyStore,
    component: './containers/DownKeyStore',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.walletInfo,
    component: './containers/WalletInfo',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.send,
    component: './containers/Send',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.sendConfrim,
    component: './containers/SendConfrim',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.transactions,
    component: './containers/Transactions',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.transactionsDetail,
    component: './containers/TransactionsDetail',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.assetConfrim,
    component: './containers/AssetConfrim',
    exact: false,
    dynamic: true,
  },
];

const Routes = () => {
  return (
    <Switch>
      {routeMap.map((item, index) => (
        <Route
          key={index}
          path={item.path}
          exact={item.exact}
          component={
            item.dynamic
              ? Loadable({
                  loader: () => import(`${item.component}`),
                  loading: Loading,
                  delay,
                  timeout,
                })
              : item.component
          }
        />
      ))}
    </Switch>
  );
};

export default hot(module)(Routes);
