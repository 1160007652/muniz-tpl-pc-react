import React from 'react';
import ReactDOM from 'react-dom';
import intl from 'react-intl-universal';
import { Provider } from 'mobx-react';
import rootStore from '_src/stores';

import '_src/less/index.less';
import './index.less';

ReactDOM.render(
  <Provider {...rootStore}>
    <div className="about-box">
      <h3>{intl.get('about_title')}</h3>
      <div className="version">
        {intl.get('about_version')}: {process.env.VERSION_APP}
      </div>
      <p>{intl.get('about_info')}</p>
      For help, email &nbsp;
      <a href="mailto:testnet@findora.org">testnet@findora.org</a>.
    </div>
  </Provider>,
  document.getElementById('root'),
);
