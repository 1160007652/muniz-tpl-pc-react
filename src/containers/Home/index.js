import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import './index.less';

function Home() {
  return (
    <div className="home">
      首页
      <div>{intl.get('menu_close_wallet')}</div>
    </div>
  );
}
export default observer(Home);
