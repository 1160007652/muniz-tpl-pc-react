/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:59
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 14:52:36
 * @ Description: popup.html chrome 扩展插件, 弹出框的页面展示入口
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Routes from '_src/routes';
import rootStore from '_src/stores';

import '_src/less/index.less';

import './index.less';

// 全局变量
window.WalletConfig = {
  zeiParams: '',
};

ReactDOM.render(
  <Provider {...rootStore}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
