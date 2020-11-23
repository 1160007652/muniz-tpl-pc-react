import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';
import Logo from '_src/assets/images/logo.png';
import './index.less';

function Home() {
  return (
    <div className="home">
      <img src={Logo}></img>
      首页
      <div>{intl.get('menu_close_wallet')}</div>
    </div>
  );
}
export default observer(Home);
