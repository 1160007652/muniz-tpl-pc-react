import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';

import Loading from '_components/Loading';
import pageURL from '_constants/pageURL';

const delay = 250;
const timeout = 10000;

const routeMap = [
  {
    path: pageURL.createAsset,
    component: './CreateAsset',
    exact: false,
    dynamic: true,
  },
  {
    path: pageURL.issueAsset,
    component: './IssueAsset',
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
      <Redirect from="/" to={pageURL.createAsset} />
    </Switch>
  );
};

export default hot(module)(Routes);
