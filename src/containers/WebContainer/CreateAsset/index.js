import React, { useState } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Radio } from 'antd';
import { useImmer } from 'use-immer';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import AssetName from '_containers/AssetName';

import pageURL from '_constants/pageURL';

import './index.less';

const CreateAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [data, setData] = useImmer({
    founder: walletStore.walletInfo.publickey,
    walletInfo: toJS(walletStore.walletInfo),
    asset: {
      unit: {
        short: '',
        long: '',
      },
      maxNumbers: 6000,
    },
    memo: 'test memo asset',
    policy: 'fungible',
    traceable: false,
    transferable: false,
    updatable: false,
  });

  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    chrome.storage.sync.set({ tempCreateAssetConfrim: JSON.stringify(data) });

    chrome.windows.create({
      url: `${chrome.runtime.getURL('popup.html')}#${pageURL.assetConfrim.replace(
        ':actionType',
        'createAssetConfrim',
      )}`,
      type: 'popup',
      width: 400,
      height: 630,
    });
  }
  /** 切换钱包地址 */
  function handleChangeSwitchAddress(address) {
    setData((state) => {
      state.founder = address;
    });
  }
  /** 输入资产名称 */
  function handleChangeAssetName(value) {
    setData((state) => {
      state.asset.unit = value;
    });
  }
  /** 最大值定义资产 */
  function handleChangeAssetMaxNumbers(e) {
    e.persist();
    setData((state) => {
      state.asset.maxNumbers = e.target.value;
    });
  }
  /** 输入记录 */
  function handleChangeMemo(e) {
    e.persist();

    setData((state) => {
      state.memo = e.target.value;
    });
  }
  /** 更新 Radio 选择 */
  function handleChangeRadio(key) {
    return (e) => {
      setData((state) => {
        state[key] = e.target.value;
      });
    };
  }
  return (
    <FindoraWebContainer className="create-asset" title="Create Asset">
      <div className="create-asset-box">
        <FindoraBoxView title="Founder" isRow>
          <SwitchAddress
            dataList={walletStore.walletImportList}
            curAddress={data.founder}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>

        <FindoraBoxView title="Asset Name" isRow titleDirection="top">
          <AssetName isCreate onResult={handleChangeAssetName} />
        </FindoraBoxView>

        <FindoraBoxView title="Memo" isRow>
          <Input placeholder="Please to memo" value={data.memo} onChange={handleChangeMemo} />
        </FindoraBoxView>

        <FindoraBoxView title="Max units" isRow>
          <Input
            placeholder="Please to Value"
            type="number"
            value={data.asset.maxNumbers}
            onChange={handleChangeAssetMaxNumbers}
          />
        </FindoraBoxView>
        <FindoraBoxView title="Policy" isRow>
          <Radio.Group value={data.policy} onChange={handleChangeRadio('policy')}>
            <Radio value="fungible">Fungible</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Traceable" isRow>
          <Radio.Group value={data.traceable} onChange={handleChangeRadio('traceable')}>
            <Radio value={true} disabled>
              Yes
            </Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Transferable" isRow>
          <Radio.Group value={data.transferable} onChange={handleChangeRadio('transferable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Updatable" isRow>
          <Radio.Group value={data.updatable} onChange={handleChangeRadio('updatable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate}>
            Create
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateAsset);
