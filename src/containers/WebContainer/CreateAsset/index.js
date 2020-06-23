import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Radio } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const CreateAsset = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  return (
    <FindoraWebContainer className="create-asset" title="Create Asset">
      <div className="create-asset-box">
        <FindoraBoxView title="Founder" isRow>
          {walletStore.walletInfo.publickey}
        </FindoraBoxView>

        <FindoraBoxView title="Asset Name" isRow>
          <Input placeholder="Please to asset name" value="" />
        </FindoraBoxView>

        <FindoraBoxView title="Memo" isRow>
          <Input placeholder="Please to memo" value="" />
        </FindoraBoxView>

        <FindoraBoxView title="Max units" isRow>
          <Input placeholder="Please to Value" value="" />
        </FindoraBoxView>
        <FindoraBoxView title="Policy" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Fungible</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Traceable" isRow>
          <Radio.Group value={0}>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Transferable" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Updatable" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn">Create</FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateAsset);
