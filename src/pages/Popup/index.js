/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:59
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 18:37:36
 * @ Description: popup.html chrome 扩展插件, 弹出框的页面展示入口
 */

import { setConfig } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import Routes from '_src/routes';
import rootStore from '_src/stores';

import '_src/less/index.less';

import './index.less';

setConfig({
  reloadHooks: false, // 可以阻止 热更新时, 组件生命周期的 自动触发
});

// chrome.downloads.onDeterminingFilename.addListener(function (item, suggest) {
//   console.log(item);
//   suggest({ filename: item.filename.replace('.txt', '.findorawallet'), conflictAction: 'overwrite' });
// });

ReactDOM.render(
  <Provider {...rootStore}>
    <Routes />
  </Provider>,
  document.getElementById('root'),
);
