import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import Logo from '_src/assets/images/logo.png';
import FavoriteSvg from '_src/assets/fonts/favorite.svg';
import './index.less';

function Home() {
  return (
    <div className="home">
      <img src={Logo}></img>
      首页
      <img src={FavoriteSvg} style={{ color: 'red', fontSize: '48px' }} />
    </div>
  );
}
export default observer(Home);
