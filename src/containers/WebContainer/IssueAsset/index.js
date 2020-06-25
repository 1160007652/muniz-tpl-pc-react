import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Select, Radio } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import pageURL from '_constants/pageURL';

import './index.less';

const dataDemo = {
  issuer: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
  asset: {
    unit: 'FIN',
    numbers: 100,
  },
  to: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
  blind: {
    isAmount: true,
    isType: true,
  },
};

const IssueAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    chrome.storage.sync.set({ tempIssueAssetConfrim: JSON.stringify(dataDemo) });
    chrome.windows.create({
      url: `${chrome.runtime.getURL('popup.html')}#${pageURL.assetConfrim.replace(':actionType', 'issueAssetConfrim')}`,
      type: 'popup',
      width: 400,
      height: 630,
    });
  }
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
          <FindoraButton className="btn" onClick={handleClickCreate}>
            Confirm
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
