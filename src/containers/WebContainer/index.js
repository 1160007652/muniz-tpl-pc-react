import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Routes from './routes';
import FindoraHeader from '_components/FindoraHeader';
import LeftMenu from '_containers/WebContainer/LeftMenu';

import Dom from '_src/utils/dom';

import './index.less';

const WebContainer = () => {
  const history = useHistory();

  // 当dom 更新完后, 再执行的 hook
  useLayoutEffect(() => {
    Dom.changeRootSize();
  });

  return (
    <div className="web-container">
      <FindoraHeader />
      <div className="layout">
        <div className="left">
          <LeftMenu />
        </div>
        <div className="right">
          <Routes />
        </div>
      </div>
    </div>
  );
};

export default WebContainer;
