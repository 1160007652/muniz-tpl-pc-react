import React from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { useImmer } from 'use-immer';
import intl from 'react-intl-universal';

import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';

import './index.less';

const IssueAsset = () => {
  const { walletStore, assetStore } = React.useContext(MobXProviderContext);
  const { issued: drawerInfo } = assetStore.drawerInfo;

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
      isAmount: true,
    },
  });

  /** 切换钱包地址 */
  function handleChangeSwitchAddress(address) {
    setData((state) => {
      state.issuer = address;
    });
  }
  /** 输入资产名称 */
  function handleChangeAssetName(value) {
    const asset_rules = {
      asset_rules: {
        max_units: null,
        transfer_multisig_rules: null,
        transferable: true,
        updatable: false,
      },
      ...value.asset,
    };

    setData((state) => {
      const isAsset = value?.asset?.code ? state.asset : {};
      state.asset = { ...isAsset, ...asset_rules };
    });

    console.log(asset_rules);
  }

  return (
    <FindoraWebContainer className="trace-asset" title={intl.get('menu_asset_trace')}>
      <div className="trace-asset-box">
        <FindoraBoxView title={intl.get('token_issue_issuer')} isRow titleDirection="top">
          <SwitchAddress
            dataList={walletStore.walletImportList}
            curAddress={data.issuer}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name')} isRow titleDirection="top">
          <SwitchAssetName
            key={drawerInfo.componentKey}
            onResult={handleChangeAssetName}
            actionTYpe={SwitchAssetName.ACTION_TYPE.SEND}
            address={data.issuer}
            assetType="trace"
          />
        </FindoraBoxView>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
