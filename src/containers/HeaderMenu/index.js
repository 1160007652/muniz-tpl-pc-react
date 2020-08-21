/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 11:19:19
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';

import { Tag } from 'antd';
import intl from 'react-intl-universal';

import SwitchLanguage from '_containers/SwitchLanguage';

import './index.less';

const HeaderMenu = () => {
  const { walletStore } = React.useContext(MobXProviderContext);
  const { walletInfo } = walletStore;
  console.log(walletInfo);
  return (
    <div className="findora-header-menu">
      {walletInfo && (
        <Tag className="current-wallet">
          {intl.get('menu_wallet')}: {walletInfo?.keyStore?.name}
        </Tag>
      )}
      <SwitchLanguage />
    </div>
  );
};

export default observer(HeaderMenu);
