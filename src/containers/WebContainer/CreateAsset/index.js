import React, { useState } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, InputNumber, Radio, Drawer } from 'antd';
import { useImmer } from 'use-immer';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import CreateAssetName from '_containers/CreateAssetName';
import FindoraTips from '_components/FindoraTips';
import CreateAssetConfrim from '../CreateAssetConfrim';

import './index.less';

const CreateAsset = () => {
  const { walletStore, assetStore } = React.useContext(MobXProviderContext);
  const { created: drawerInfo } = assetStore.drawerInfo;
  const [nextDisabled, setNextDisabled] = useState(false);
  const [error, setError] = useImmer({
    amountError: null,
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
    maxUnits: false,
  });

  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    assetStore.toggleDrawer('created', true);
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
  function handleChangeAssetMaxNumbers(value) {
    if (value) {
      setNextDisabled(false);
      setError((state) => {
        state.amountError = null;
      });
    } else {
      setNextDisabled(true);
      setError((state) => {
        state.amountError = 'token_create_max_amount_limit_tips';
      });
    }

    setData((state) => {
      state.asset = { ...state.asset, maxNumbers: value };
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
      const value = e.target.value;
      if (key === 'maxUnits') {
        if (value) {
          if (!data.asset.maxNumbers) {
            setNextDisabled(true);

            setError((state) => {
              state.amountError = 'token_create_max_amount_limit_tips';
            });
          } else {
            setNextDisabled(false);
            setError((state) => {
              state.amountError = null;
            });
          }
          setData((state) => {
            state.asset.maxNumbers = state.asset.maxNumbers;
          });
        } else {
          setData((state) => {
            state.asset.maxNumbers = '';
          });
        }
      }
      setData((state) => {
        state[key] = value;
      });
    };
  }
  /** 格式化InputNumber 输入框显示 */
  function limitDecimals(value) {
    return Number(String(value).replace(/^(0+)|[^\d]+/g, '')) || '';
  }
  /** 关闭抽屉 */
  function onClose() {
    assetStore.toggleDrawer('created', false);
  }
  return (
    <FindoraWebContainer className="create-asset" title={intl.get('menu_asset_create1')}>
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
          <CreateAssetName onResult={handleChangeAssetName} key={drawerInfo.componentKey} />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('memo')} isRow>
          <Input
            placeholder={intl.get('token_create_memo_placeholder')}
            value={data.memo}
            onChange={handleChangeMemo}
          />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('token_create_max_amount')} isRow titleDirection="top">
          <Radio.Group value={data.maxUnits} onChange={handleChangeRadio('maxUnits')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          {data.maxUnits && (
            <div style={{ marginTop: '10px' }}>
              <InputNumber
                placeholder={intl.get('token_create_max_amount_placeholder')}
                style={{ width: '100%' }}
                min={0}
                step={1}
                value={data.asset.maxNumbers}
                onChange={handleChangeAssetMaxNumbers}
                formatter={limitDecimals}
                parser={limitDecimals}
              />
              {error.amountError && <div className="error">{intl.get(error.amountError)}</div>}
            </div>
          )}
        </FindoraBoxView>
        {/* 第一版, 暂且不实现 该功能 */}
        {/* <FindoraBoxView title={<FindoraTips desc={intl.get('policy')}>{intl.get('policy')}</FindoraTips>} isRow>
          <Radio.Group value={data.policy} onChange={handleChangeRadio('policy')} disabled>
            <Radio value="fungible">Fungible</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        {/* <FindoraBoxView
          title={<FindoraTips desc={intl.get('traceable_tips')}>{intl.get('traceable')}</FindoraTips>}
          isRow
        >
          <Radio.Group value={data.traceable} onChange={handleChangeRadio('traceable')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
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
          <FindoraButton className="btn" onClick={handleClickCreate} disabled={nextDisabled}>
            {intl.get('token_create_create')}
          </FindoraButton>
        </div>

        <Drawer
          width="520px"
          maskClosable={true}
          destroyOnClose
          placement="right"
          closable={false}
          onClose={onClose}
          visible={drawerInfo.visible}
        >
          <CreateAssetConfrim data={data} />
        </Drawer>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateAsset);
