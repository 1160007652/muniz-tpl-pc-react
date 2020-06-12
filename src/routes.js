import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import Loading from '_components/Loading';
import pageURL from '_constants/pageURL';

import Home from './containers/Home';

const delay = 250;
const timeout = 10000;

const routeMap = [
  {
    path: pageURL.home,
    component: Home,
    exact: true,
    dynamic: false,
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
  // {
  //   path: pageURL.send,
  //   component: './containers/Send',
  //   exact: true,
  //   dynamic: true,
  // },
  // {
  //   path: pageURL.transactions,
  //   component: './containers/Transactions',
  //   exact: true,
  //   dynamic: true,
  // },
  // {
  //   path: pageURL.createToken,
  //   component: './containers/CreateToken',
  //   exact: true,
  //   dynamic: true,
  // },
  // {
  //   path: undefined,
  //   component: './containers/Order',
  //   exact: false,
  //   dynamic: true,
  // },
];

const Routes = () => (
  <HashRouter>
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
  </HashRouter>
);

export default hot(module)(Routes);
