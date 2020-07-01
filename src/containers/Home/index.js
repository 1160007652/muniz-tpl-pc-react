import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import FindoraHeader from '_components/FindoraHeader';
import WalletEmpty from '_containers/WalletEmpty';
import HeaderMenu from '_containers/HeaderMenu';
import WalletListView from '_containers/WalletListView';
import WalletInfoDetail from '_containers/WalletInfoDetail';

import './index.less';

const Home = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  let wallet = <WalletEmpty />;
  if (walletStore.walletImportList.length === 1) {
    wallet = <WalletInfoDetail />;
  }
  if (walletStore.walletImportList.length > 1) {
    wallet = <WalletListView dataList={walletStore.walletImportList} />;
  }

  return (
    <div className="home">
      <FindoraHeader title={intl.get('page_walet_title')} menu={<HeaderMenu />} />
      {wallet}
    </div>
  );
};

export default observer(Home);
