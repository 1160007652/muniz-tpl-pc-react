import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Select, Radio } from 'antd';
import { useImmer } from 'use-immer';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import AssetName from '_containers/AssetName';

import pageURL from '_constants/pageURL';

import './index.less';

const IssueAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [data, setData] = useImmer({
    issuer: walletStore.walletInfo.publickey,
    asset: {
      unit: {
        short: '',
        long: '',
      },
      numbers: 100,
    },
    to: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
    blind: {
      isAmount: true,
      isType: true,
    },
  });
  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    chrome.storage.sync.set({ tempIssueAssetConfrim: JSON.stringify(data) });
    chrome.windows.create({
      url: `${chrome.runtime.getURL('popup.html')}#${pageURL.assetConfrim.replace(':actionType', 'issueAssetConfrim')}`,
      type: 'popup',
      width: 400,
      height: 630,
    });
  }
  /** 切换钱包地址 */
  function handleChangeSwitchAddress(address) {
    setData((state) => {
      state.issuer = address;
    });
  }
  /** 输入资产名称 */
  function handleChangeAssetName(value) {
    setData((state) => {
      state.asset.unit = value;
    });
  }
  return (
    <FindoraWebContainer className="issue-asset" title="Issue Asset">
      <div className="issue-asset-box">
        <FindoraBoxView title="Issuer" isRow>
          {/* {walletStore.walletInfo.publickey} */}
          <SwitchAddress
            dataList={walletStore.walletImportList}
            curAddress={data.issuer}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name" isRow>
          <AssetName onResult={handleChangeAssetName} address={walletStore.walletInfo.publickey} />
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
