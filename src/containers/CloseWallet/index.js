import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import intl from 'react-intl-universal';

import WalletEmpty from '_containers/WalletEmpty';
import WalletListView from '_containers/WalletListView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

function CloseWallet() {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  let walletTitle = 'page_wallet_title';
  let wallet = <WalletEmpty />;
  if (walletStore.walletImportList.length > 0) {
    wallet = <WalletListView dataList={walletStore.walletImportList} />;
    walletTitle = 'page_wallet_list';
  }

  return (
    <FindoraWebContainer className="close-wallet" title={intl.get('menu_close_wallet')}>
      {wallet}
    </FindoraWebContainer>
  );
}
export default observer(CloseWallet);
