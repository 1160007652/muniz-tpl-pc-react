import React, { useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';
import LeftMenu from '_containers/LeftMenu';

import Dom from '_src/utils/dom';

import './index.less';

const WebLayout = ({ children }) => {
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
        <div className="right">{children}</div>
      </div>
    </div>
  );
};

export default WebLayout;
