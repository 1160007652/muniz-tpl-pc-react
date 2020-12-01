import React from 'react';
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal';

import pageURL from '_constants/pageURL';

import './index.less';

const LeftMenu = () => {
  return (
    <div className="left-menu-list">
      <Link to={pageURL.home}>首页</Link>
      <Link to={pageURL.other}>其它</Link>
    </div>
  );
};

export default LeftMenu;
