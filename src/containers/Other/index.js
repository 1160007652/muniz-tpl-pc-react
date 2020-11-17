import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import './index.less';

function Other() {
  return <div className="other">其它页面</div>;
}
export default observer(Other);
