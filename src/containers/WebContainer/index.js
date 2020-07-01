import React from 'react';
import { useHistory } from 'react-router-dom';

import Routes from './routes';
import FindoraHeader from '_components/FindoraHeader';
import LeftMenu from '_containers/WebContainer/LeftMenu';

import Dom from '_src/utils/dom';

import './index.less';

Dom.changeRootSize();

const WebContainer = () => {
  const history = useHistory();

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
