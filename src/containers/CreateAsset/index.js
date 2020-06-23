import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import FindoraHeader from '_components/FindoraHeader';

import Dom from '_src/utils/dom';

import './index.less';
import pageURL from '_constants/pageURL';

Dom.changeRootSize();

const CreateAsset = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  return (
    <div className="create-asset">
      <FindoraHeader />
      <div>生成资产</div>
    </div>
  );
};

export default observer(CreateAsset);
