/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:59
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 18:37:36
 * @ Description: popup.html chrome 扩展插件, 弹出框的页面展示入口
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';
import Routes from '_src/routes';
import rootStore from '_src/stores';
import i18n from '_utils/i18n';

import { WebLayout } from '_src/pages/Layout';

import '_assets/less/index.less';

ReactDOM.render(
  <Provider {...rootStore}>
    <BrowserRouter>
      <WebLayout>
        <Routes />
      </WebLayout>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
