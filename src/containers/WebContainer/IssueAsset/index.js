import React, { useState } from 'react';
import { toJS } from 'mobx';
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
    walletInfo: toJS(walletStore.walletInfo),
    asset: {
      unit: {
        short: '',
        long: '',
      },
      numbers: 100,
    },
    to: 'SZp3EnyxjX-YJ1tWvILkZZ_00zqgS-uIr0ZoxwnmqTc=',
    blind: {
      isAmount: false,
      isType: false,
    },
  });
  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    // console.log(data.asset.unit);

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
  /** 输入 To 地址 */
  function handleChangeTo(e) {
    e.persist();
    setData((state) => {
      state.to = e.target.value;
    });
  }
  /** 输入 Amount  */
  function handleChangeAmount(e) {
    e.persist();
    setData((state) => {
      state.asset.numbers = e.target.value;
    });
  }
  /** 更新 Radio 选择 */
  function handleChangeRadio(key) {
    return (e) => {
      setData((state) => {
        state.blind[key] = e.target.value;
      });
    };
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
          <AssetName onShowResult={handleChangeAssetName} address={walletStore.walletInfo.publickey} />
        </FindoraBoxView>
        <FindoraBoxView title="To" isRow>
          <Input placeholder="Please to address" value={data.to} onChange={handleChangeTo} />
        </FindoraBoxView>
        <FindoraBoxView title="Amount" isRow>
          <Input
            placeholder="Please to amount"
            type="number"
            value={data.asset.numbers}
            onChange={handleChangeAmount}
          />
        </FindoraBoxView>
        <FindoraBoxView title="Blind Amount" isRow>
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Blind Type" isRow>
          <Radio.Group value={data.blind.isType} disabled onChange={handleChangeRadio('isType')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
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