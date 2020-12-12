import React from 'react';
import { Route, Switch } from 'react-router-dom';

import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
import { timeout } from 'promise-timeout';
import pageURL from '_constants/pageURL';

import Home from '_containers/Home';

const LOADABLE_DELAY = 250;
const LOADABLE_TIMEOUT = 10000;

const routeMap = [
  {
    path: pageURL.home,
    component: Home,
    exact: true,
    dynamic: false,
  },
  {
    path: pageURL.other,
    component: 'containers/Other',
    exact: true,
    dynamic: true,
  },
  {
    path: '*',
    component: () => <div>404</div>,
    exact: true,
    dynamic: false,
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
              ? loadable(() =>
                  pMinDelay(
                    timeout(import(/* webpackPrefetch: true */ `./${item.component}`), LOADABLE_TIMEOUT),
                    LOADABLE_DELAY,
                  ),
                )
              : item.component
          }
        />
      ))}
    </Switch>
  );
};

export default Routes;
