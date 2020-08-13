import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { ConfigProvider } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import LeftMenu from '_containers/LeftMenu';

// import Dom from '_src/utils/dom';
// antd 组件库 多语言
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import './index.less';

const WebLayout = ({ children }) => {
  const localeStore = React.useContext(MobXProviderContext).localeStore;
  const currentLocale = localeStore.locale === 'en' ? enUS : zhCN;
  // 当dom 更新完后, 再执行的 hook
  // useLayoutEffect(() => {
  //   Dom.changeRootSize();
  // });

  return (
    <div className="web-container">
      <ConfigProvider locale={currentLocale}>
        <FindoraHeader />
        <div className="layout">
          <div className="left">
            <LeftMenu />
          </div>
          <div className="right" key={localeStore.locale}>
            {children}
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default observer(WebLayout);
