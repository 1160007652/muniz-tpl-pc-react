/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 11:19:19
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Tag } from 'antd';
import intl from 'react-intl-universal';

import SwitchLanguage from '_containers/SwitchLanguage';
import SwitchAddress from '_containers/SwitchAddress';

import './index.less';

const HeaderMenu = () => {
  const { walletStore } = React.useContext(MobXProviderContext);
  const { walletInfo } = walletStore;

  /** 切换钱包地址 */
  function handleChangeSwitchAddress(address) {
    const curWalletInfo = toJS(walletStore.walletImportList).filter((item) => {
      return item.publickey === address;
    });

    walletStore.setWalletInfo(curWalletInfo[0]);
  }

  function SwitchAddressComponent() {
    if (!walletInfo.publickey) {
      return null;
    }
    return (
      <div className="current-wallet">
        <SwitchAddress
          size="simal"
          dataList={toJS(walletStore.walletImportList)}
          curAddress={walletInfo.publickey}
          onChange={handleChangeSwitchAddress}
        />
      </div>
    );
  }

  return (
    <div className="findora-header-menu">
      {SwitchAddressComponent()}
      <SwitchLanguage />
    </div>
  );
};

export default observer(HeaderMenu);
