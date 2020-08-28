import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import WalletEmpty from '_containers/WalletEmpty';
import WalletListView from '_containers/WalletListView';
import WalletInfoDetail from '_containers/WalletInfoDetail';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const Statement = () => {
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
    <FindoraWebContainer className="home" title={intl.get('menu_asset_statement')}>
      {wallet}
    </FindoraWebContainer>
  );
};

export default observer(Statement);
