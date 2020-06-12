import React, { useState } from 'react';
import FindoraHeader from '_components/FindoraHeader';
import WalletEmpty from '_containers/WalletEmpty';
import HeaderMenu from '_containers/HeaderMenu';
import WalletListView from '_containers/WalletListView';

import './index.less';

const HouseNumber = () => {
  const [isShowWalletList, setWalletListToogle] = useState(false);
  const walletList = [
    {
      name: 'Alice - 1',
      address: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6B…',
    },
    {
      name: 'Alice - 2',
      address: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6B…',
    },
    {
      name: 'Alice - 3',
      address: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6B…',
    },
  ];
  return (
    <div className="home">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      {isShowWalletList ? <WalletEmpty /> : <WalletListView dataList={walletList} />}
    </div>
  );
};

export default HouseNumber;
