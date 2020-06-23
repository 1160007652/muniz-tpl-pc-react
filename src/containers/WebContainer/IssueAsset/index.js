import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Radio } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import './index.less';

const IssueAsset = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  return (
    <FindoraWebContainer className="issue-asset" title="Issue Asset">
      <div className="issue-asset-box">
        <FindoraBoxView title="Issuer" isRow>
          {walletStore.walletInfo.publickey}
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name" isRow>
          <Select defaultValue="FIN" style={{ width: '100%' }}>
            <Select.Option value="FIN">FIN</Select.Option>
            <Select.Option value="GIN">GIN</Select.Option>
          </Select>
        </FindoraBoxView>
        <FindoraBoxView title="To" isRow>
          <Input placeholder="Please to address" value="" />
        </FindoraBoxView>
        <FindoraBoxView title="Amount" isRow>
          <Input placeholder="Please to amount" value="" />
        </FindoraBoxView>
        <FindoraBoxView title="Blind Amount" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        {/* <FindoraBoxView title="Blind Type" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        <div className="btn-area">
          <FindoraButton className="btn">Confirm</FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
