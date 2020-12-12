import React from 'react';
import SwitchLanguage from '_components/SwitchLanguage';

import Logo from '_assets/images/logo.png';
import './index.less';

const Home: React.FC = () => {
  return (
    <div className="home">
      <img src={Logo}></img>
      首页121s
      <img src={FavoriteSvg} style={{ color: 'red', fontSize: '48px' }} />
      <SwitchLanguage />
    </div>
  );
};
export default Home;
