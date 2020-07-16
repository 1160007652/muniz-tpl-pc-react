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
  const [tokenRules, setTokenRules] = useState();
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
    // to: walletStore.walletInfo.publickey,
    blind: {
      isAmount: false,
      isType: false,
    },
  });

  /*
  useEffect(() => {
    async function assetTokenRules() {
      const tokenRulesData = await webNetWork.getAssetProperties(data.asset.unit.long);
      // 如果 数量大于 0, 说明生成的资产有 max_units 限制, 那么在这里不可以隐藏数量
      setTokenRules(tokenRulesData);
      console.log('资产规则: ', tokenRulesData);
    }
    if (data.asset.unit.long !== '') {
      assetTokenRules();
    }
  }, [data.asset.unit.long]);
  */

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
          <SwitchAssetName onResult={handleChangeAssetName} isIssued address={data.issuer} />
        </FindoraBoxView>
        {/* <FindoraBoxView title={intl.get('to')} isRow>
          <Input placeholder="Please to address" value={data.to} onChange={handleChangeTo} />
        </FindoraBoxView> */}
        <FindoraBoxView title={intl.get('balance')} isRow>
          <Input
            placeholder={intl.get('token_issue_amount_placeholder')}
            type="number"
            value={data.asset.numbers}
            onChange={handleChangeAmount}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('blind_amount')} isRow>
          <Radio.Group
            value={data.blind.isAmount}
            disabled={tokenRules?.asset_rules?.max_units > 0}
            onChange={handleChangeRadio('isAmount')}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('blind_type')} isRow>
          <Radio.Group value={data.blind.isType} disabled onChange={handleChangeRadio('isType')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate}>
            {intl.get('confrim')}
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
