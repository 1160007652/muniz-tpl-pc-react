import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Select, Radio } from 'antd';
import { useImmer } from 'use-immer';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';

import pageURL from '_constants/pageURL';
import webNetWork from '_src/services/webNetWork';

import './index.less';

const IssueAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [isShowAmount, setShowAmount] = useState(false);
  const [data, setData] = useImmer({
    issuer: walletStore.walletInfo.publickey,
    walletInfo: toJS(walletStore.walletInfo),
    asset: {
      short: '',
      long: '',
      numbers: '',
    },
    inputNumbers: '',
    blind: {
      isAmount: false,
      isType: false,
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
    const asset_rules = {
      max_units: null,
      transfer_multisig_rules: null,
      transferable: true,
      updatable: false,
    };
    const isAmount = value?.asset_rules?.max_units
      ? data.inputNumbers + value?.numbers > value?.asset_rules?.max_units
      : false;
    setShowAmount(isAmount);

    setData((state) => {
      state.asset = { ...state.asset, asset_rules, ...value };
      console.log(state.asset);
    });
  }

  /** 输入 Amount  */
  function handleChangeAmount(e) {
    e.persist();
    const value = Number(e.target.value) || '';

    setData((state) => {
      state.inputNumbers = value;
    });

    if (value) {
      const isAmount = data.asset?.asset_rules?.max_units
        ? value + Number(data.asset?.numbers) > data.asset?.asset_rules?.max_units
        : false;
      setShowAmount(isAmount);
    } else {
      setShowAmount(false);
    }
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
    <FindoraWebContainer className="issue-asset" title={intl.get('menu_asset_issue')}>
      <div className="issue-asset-box">
        <FindoraBoxView title={intl.get('token_issue_issuer')} isRow titleDirection="top">
          <SwitchAddress
            dataList={walletStore.walletImportList}
            curAddress={data.issuer}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name')} isRow titleDirection="top">
          <SwitchAssetName
            onResult={handleChangeAssetName}
            actionTYpe={SwitchAssetName.ACTION_TYPE.ISSUE}
            address={data.issuer}
          />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('balance')} isRow titleDirection="top">
          <Input
            placeholder={intl.get('token_issue_amount_placeholder')}
            value={data.inputNumbers}
            type="text"
            onChange={handleChangeAmount}
            suffix={data.asset?.asset_rules?.max_units}
          />
          <div>sss e</div>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('blind_amount')} isRow titleDirection="top">
          <Radio.Group
            value={data.blind.isAmount}
            disabled={
              data.asset?.asset_rules?.max_units
                ? data.asset?.asset_rules?.max_units - Number(data.asset?.numbers)
                : null
            }
            onChange={handleChangeRadio('isAmount')}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          <div>{data.asset?.asset_rules?.max_units && '该资产不可以隐藏金额'}</div>
        </FindoraBoxView>
        {/* <FindoraBoxView title={intl.get('blind_type')} isRow>
          <Radio.Group value={data.blind.isType} disabled onChange={handleChangeRadio('isType')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate} disabled={isShowAmount}>
            {intl.get('confirm')}
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
