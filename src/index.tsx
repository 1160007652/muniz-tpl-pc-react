/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:59
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 18:37:36
 * @ Description: popup.html chrome 扩展插件, 弹出框的页面展示入口
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '_src/routes';
import rootStore from '_src/stores';
import i18n from '_utils/i18n';
import { ThemeProvider } from '_components/SwitchThemes';

import { WebLayout } from '_src/Layout';

// antd 组件库 多语言
import antdEnUS from 'antd/lib/locale/en_US';
import antdZhCN from 'antd/lib/locale/zh_CN';

import '_assets/themes/light.css';
import '_assets/themes/dark.css';
import '_assets/less/index.less';

const Root = () => {
  return (
    <Provider {...rootStore}>
      <ThemeProvider>
        <ConfigProvider locale={i18n.language === 'zhCN' ? antdZhCN : antdEnUS}>
          <BrowserRouter>
            <WebLayout>
              <Routes />
            </WebLayout>
          </BrowserRouter>
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
