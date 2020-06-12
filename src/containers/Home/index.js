import React from 'react';
import FindoraHeader from '_components/FindoraHeader';
import WalletEmpty from '_containers/WalletEmpty';
import HeaderMenu from '_containers/HeaderMenu';

import './index.less';

const HouseNumber = () => {
  return (
    <div className="home">
      <FindoraHeader title="Wallet" menu={<HeaderMenu />} />
      <WalletEmpty />
    </div>
  );
};

export default HouseNumber;
