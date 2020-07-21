import React from 'react';
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
  let walletTitle = 'page_wallet_title';
  let wallet = <WalletEmpty />;
  if (walletStore.walletImportList.length === 1) {
    wallet = <WalletInfoDetail />;
    walletTitle = 'page_wallet_detail';
  }
  if (walletStore.walletImportList.length > 1) {
    wallet = <WalletListView dataList={walletStore.walletImportList} />;
    walletTitle = 'page_wallet_list';
  }

  return (
    <div className="home">
      <FindoraHeader title={intl.get(walletTitle)} menu={<HeaderMenu />} />
      {wallet}
    </div>
  );
};

export default observer(Home);
