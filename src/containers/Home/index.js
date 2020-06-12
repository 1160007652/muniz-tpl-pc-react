import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';
import WalletEmpty from '_containers/WalletEmpty';
import HeaderMenu from '_containers/HeaderMenu';
import WalletListView from '_containers/WalletListView';

import './index.less';
import pageURL from '_constants/pageURL';

const Home = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  let wallet = <WalletEmpty />;
  if (walletStore.walletImportList.length === 1) {
    history.push(pageURL.walletInfo);
  }
  if (walletStore.walletImportList.length > 1) {
    wallet = <WalletListView dataList={walletStore.walletImportList} />;
  }

  return (
    <div className="home">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      {wallet}
    </div>
  );
};

export default Home;
