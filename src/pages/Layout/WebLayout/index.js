import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { ConfigProvider } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import LeftMenu from '_containers/LeftMenu';

// antd 组件库 多语言
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import './index.less';

const WebLayout = ({ children }) => {
  const localeStore = React.useContext(MobXProviderContext).localeStore;
  const currentLocale = localeStore.locale === 'en' ? enUS : zhCN;

  return (
    <div className="web-container" key={localeStore.locale}>
      <ConfigProvider locale={currentLocale}>
        <FindoraHeader menu={<HeaderMenu />} />
        <div className="layout">
          <div className="left">
            <LeftMenu />
          </div>
          <div className="right">{children}</div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default observer(WebLayout);
