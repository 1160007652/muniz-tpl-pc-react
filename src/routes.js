import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MobXProviderContext, observer } from 'mobx-react';
import { ConfigProvider } from 'antd';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

import Loading from '_components/Loading';
import pageURL from '_constants/pageURL';
import Home from './containers/Home';

// antd 组件库 多语言
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

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
    path: pageURL.webContainer,
    component: './containers/WebContainer/',
    exact: false,
    dynamic: true,
  },
  {
    path: pageURL.assetConfrim,
    component: './containers/AssetConfrim',
    exact: false,
    dynamic: true,
  },
  // {
  //   path: undefined,
  //   component: './containers/Order',
  //   exact: false,
  //   dynamic: true,
  // },
];

const Routes = () => {
  const localeStore = React.useContext(MobXProviderContext).localeStore;
  const currentLocale = localeStore.locale === 'en' ? enUS : zhCN;
  return (
    <HashRouter>
      <ConfigProvider locale={currentLocale}>
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
      </ConfigProvider>
    </HashRouter>
  );
};

export default hot(module)(observer(Routes));
