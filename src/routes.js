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
    path: pageURL.home,
    component: './containers/Home',
    exact: true,
    dynamic: true,
  },
  {
    path: pageURL.other,
    component: './containers/Other',
    exact: true,
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
