import React from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Radio } from 'antd';
import { useImmer } from 'use-immer';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import CreateAssetName from '_containers/CreateAssetName';
import FindoraTips from '_components/FindoraTips';

import pageURL from '_constants/pageURL';

import './index.less';

const CreateAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [windowInfo, setWindowInfo] = useImmer({
    isCreatedWindow: false,
  });
  const [data, setData] = useImmer({
    founder: walletStore.walletInfo.publickey,
    walletInfo: toJS(walletStore.walletInfo),
    asset: {
      short: '',
      long: '',
      maxNumbers: '',
    },
    memo: '',
    policy: 'fungible',
    traceable: false,
    transferable: true,
    updatable: false,
  });

  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    chrome.storage.sync.set({ tempCreateAssetConfrim: JSON.stringify(data) });

    if (!windowInfo.isCreatedWindow) {
      const www = chrome.windows.create(
        {
          url: `${chrome.runtime.getURL('popup.html')}#${pageURL.assetConfrim.replace(
            ':actionType',
            'createAssetConfrim',
          )}`,
          type: 'popup',
          width: 400,
          height: 630,
        },
        () => {
          // setWindowInfo((state) => {
          //   state.isCreatedWindow = true;
          // });
        },
      );
    }
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
      state.asset = { ...state.asset, ...value };
    });
  }
  /** 最大值定义资产 */
  function handleChangeAssetMaxNumbers(e) {
    e.persist();
    setData((state) => {
      state.asset = { ...state.asset, maxNumbers: e.target.value };
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
    <FindoraWebContainer className="create-asset" title={intl.get('menu_asset_create')}>
      <div className="create-asset-box">
        <FindoraBoxView title={intl.get('token_issue_issuer')} isRow titleDirection="top">
          <SwitchAddress
            dataList={walletStore.walletImportList}
            curAddress={data.founder}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>

        <FindoraBoxView
          title={<FindoraTips desc={intl.get('asset_name_tips')}>{intl.get('asset_name')}</FindoraTips>}
          isRow
          titleDirection="top"
        >
          <CreateAssetName onResult={handleChangeAssetName} />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('memo')} isRow>
          <Input placeholder="Please to memo" value={data.memo} onChange={handleChangeMemo} />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('token_create_max_amount')} isRow>
          <Input
            placeholder="Please to Value"
            type="number"
            value={data.asset.maxNumbers}
            onChange={handleChangeAssetMaxNumbers}
          />
        </FindoraBoxView>
        {/* 第一版, 暂且不实现 该功能 */}
        {/* <FindoraBoxView title={<FindoraTips desc={intl.get('policy')}>{intl.get('policy')}</FindoraTips>} isRow>
          <Radio.Group value={data.policy} onChange={handleChangeRadio('policy')} disabled>
            <Radio value="fungible">Fungible</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('traceable_tips')}>{intl.get('traceable')}</FindoraTips>}
          isRow
        >
          <Radio.Group value={data.traceable} onChange={handleChangeRadio('traceable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('transferable_tips')}>{intl.get('transferable')}</FindoraTips>}
          isRow
        >
          <Radio.Group value={data.transferable} onChange={handleChangeRadio('transferable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        {/* <FindoraBoxView
          title={<FindoraTips desc={intl.get('updatable_tips')}>{intl.get('updatable')}</FindoraTips>}
          isRow
        >
          <Radio.Group value={data.updatable} onChange={handleChangeRadio('updatable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate}>
            {intl.get('token_create_create')}
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateAsset);
