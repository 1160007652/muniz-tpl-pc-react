import React, { useState, useEffect } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Tag, InputNumber, Radio, Drawer } from 'antd';
import { useImmer } from 'use-immer';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';
import IssueAssetConfrim from '_containers/IssueAssetConfrim';
import FindoraTips from '_components/FindoraTips';

import './index.less';

const IssueAsset = () => {
  const { walletStore, assetStore } = React.useContext(MobXProviderContext);
  const { issued: drawerInfo } = assetStore.drawerInfo;
  const [error, setError] = useImmer({
    amountError: '',
    assetNameError: '',
  });
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

  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    handleError(['inputNumbers'], () => {
      assetStore.toggleDrawer('issued', true);
    })();
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
      asset_rules: {
        max_units: null,
        transfer_multisig_rules: null,
        transferable: true,
        updatable: false,
      },
      ...value.asset,
    };

    // 是否支持隐藏数量, 隐藏类型, 并且修改状态
    if (asset_rules.asset_rules.max_units) {
      setData((state) => {
        state.blind.isAmount = false;
      });
    } else {
      setData((state) => {
        state.blind.isAmount = true;
      });
    }

    setError((state) => {
      state.amountError = '';
    });

    setData((state) => {
      const isAsset = value?.asset.code ? state.asset : {};
      state.asset = { ...isAsset, ...asset_rules };
      state.inputNumbers = '';
    });

    // if (value?.code) {
    //   setError((state) => {
    //     state.assetNameError = '';
    //   });
    // } else {
    //   setError((state) => {
    //     state.assetNameError = 'issuer_asset_no_empty';
    //   });
    // }

    console.log(data.asset);
  }

  function handleError(fileds, fn) {
    return () => {
      const { asset, inputNumbers } = data;
      let isError = false;

      // 判断 inputNumbers , 发行资产不能为空
      if (fileds.includes('inputNumbers')) {
        if (inputNumbers) {
          setError((state) => {
            state.amountError = '';
          });
          if (asset?.asset_rules?.max_units) {
            if (Number(inputNumbers) > asset?.asset_rules?.max_units - Number(asset?.numbers)) {
              setError((state) => {
                state.amountError = { type: 'info', msg: 'token_issue_error2' };
              });
              isError = true;
            } else {
              setError((state) => {
                state.amountError = '';
              });
            }
          } else {
            setError((state) => {
              state.amountError = '';
            });
          }
        } else {
          isError = true;
          setError((state) => {
            state.amountError = { type: 'error', msg: 'token_issue_error4' };
          });
        }
      }
      console.log(asset);
      if (asset?.code) {
        setError((state) => {
          state.assetNameError = '';
        });
      } else {
        console.log('有错误');
        setError((state) => {
          state.assetNameError = 'issuer_asset_no_empty';
        });
        isError = true;
      }

      // 提交
      if (fn && !isError) {
        fn();
        console.log('无错误');
      }
    };
  }

  /** 输入 Amount  */
  function handleChangeAmount(value) {
    setError((state) => {
      state.amountError = '';
    });

    setData((state) => {
      state.inputNumbers = value;
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

  /** 格式化 InputNumber 输入框显示 */
  function limitDecimals(value) {
    return Number(String(value).replace(/^(0+)|[^\d]+/g, '')) || '';
  }

  /** 关闭drawer */
  function onClose() {
    assetStore.toggleDrawer('issued', false);
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
            key={drawerInfo.componentKey}
            onResult={handleChangeAssetName}
            actionTYpe={SwitchAssetName.ACTION_TYPE.ISSUE}
            address={data.issuer}
          />
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('token_issue_amount')} isRow titleDirection="top">
          <div className="input-number-box">
            <InputNumber
              placeholder={intl.get('token_issue_amount_placeholder')}
              value={data.inputNumbers}
              min={0}
              max={
                data.asset?.asset_rules?.max_units
                  ? data.asset?.asset_rules?.max_units - Number(data.asset?.numbers)
                  : Number.MAX_SAFE_INTEGER
              }
              step={1}
              style={{ width: '100%' }}
              onChange={handleChangeAmount}
              onBlur={handleError('inputNumbers')}
              formatter={limitDecimals}
              parser={limitDecimals}
            />
            {data.asset?.asset_rules?.max_units ? (
              <Tag className="max-amount">{`max amount: ${
                data.asset?.asset_rules?.max_units - Number(data.asset?.numbers)
              }`}</Tag>
            ) : data.asset?.code ? (
              <Tag className="max-amount">{intl.get('token_issue_amount_unlimited')}</Tag>
            ) : null}
          </div>
          {error.amountError && <div className={error.amountError.type}>{intl.get(error.amountError.msg)}</div>}
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('blind_amount_tips')}>{intl.get('blind_amount')}</FindoraTips>}
          isRow
          titleDirection="top"
        >
          <Radio.Group
            value={data.blind.isAmount}
            disabled={data.asset?.asset_rules?.max_units}
            onChange={handleChangeRadio(['isAmount'])}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          <div className="info">{data.asset?.asset_rules?.max_units && intl.get('token_issue_error3')}</div>
        </FindoraBoxView>

        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate}>
            {intl.get('token_issue_issue')}
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
          <IssueAssetConfrim data={data} />
        </Drawer>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(IssueAsset);
