import React from 'react';

import LeftMenu from '_containers/LeftMenu';

import './index.less';

const WebLayout = ({ children }) => {
  return (
    <div className="web-container">
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
