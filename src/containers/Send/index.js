import React, { useState } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Radio, InputNumber, Tag } from 'antd';
import intl from 'react-intl-universal';
import { useImmer } from 'use-immer';

// import FindoraHeader from '_components/FindoraHeader';
// import HeaderMenu from '_containers/HeaderMenu';
import FindoraWebContainer from '_components/FindoraWebContainer';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';
import Balance from '_containers/Balance';
import FindoraTips from '_components/FindoraTips';

import pageURL from '_constants/pageURL';

import './index.less';

const Send = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [nextDisabled, setNextDisabled] = useState(true);
  const [blindError, setBlindError] = useImmer({
    isTypeError: null,
  });
  const [error, setError] = useImmer({
    assetNameError: null,
    amountError: 'send_error5',
    toError: 'send_error4',
  });
  const [data, setData] = useImmer({
    walletInfo: toJS(walletStore.walletInfo),
    from: walletStore.walletInfo.publickey,
    to: '',
    asset: {},
    numbers: '',
    blind: {
      isAmount: true,
      isType: true,
    },
  });

  function handleClickItemInfo() {
    history.push({ pathname: pageURL.sendConfrim, state: data });
  }
  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    setNextDisabled(true);
    console.log('xxxxxxxxxxssssssxxxx=', value);
    const asset_rules = {
      asset_rules: {
        max_units: null,
        tracing_policies: null,
        transfer_multisig_rules: null,
        transferable: true,
        updatable: false,
      },
      ...value,
    };

    if ('numbers' in value) {
      setError((state) => {
        state.assetNameError = null;
      });
    } else {
      setError((state) => {
        state.assetNameError = 'send_error6';
      });
      return;
    }

    if (asset_rules.asset_rules.tracing_policies) {
      setBlindError((state) => {
        state.isTypeError = 'send_error7';
      });
      setData((state) => {
        state.blind.isType = false;
      });
    } else {
      setBlindError((state) => {
        state.isTypeError = null;
      });
      setData((state) => {
        state.blind.isType = true;
      });
    }

    if (!asset_rules.asset_rules.transferable && data.from !== value?.issuer?.key) {
      setError((state) => {
        state.assetNameError = 'send_error2';
        state.amountError = 'send_error5';
        if (Object.values(state).every((item) => item !== null)) {
          setNextDisabled(false);
        }
      });
    } else {
      setError((state) => {
        state.assetNameError = null;
        state.amountError = 'send_error5';
        if (Object.values(state).every((item) => item !== null)) {
          setNextDisabled(false);
        }
      });
    }

    setData((state) => {
      state.asset = { ...state.asset, ...asset_rules };
      state.numbers = '';
    });
  }
  /** 切换钱包地址 */
  function handleChangeSwitchAddress(address) {
    if (address === data.to) {
      setError((state) => {
        state.toError = 'send_nosubmit_owne_tips';
      });
    } else {
      setError((state) => {
        state.toError = null;
        if (Object.values(state).every((item) => item === null)) {
          setNextDisabled(false);
        }
      });
    }
    setData((state) => {
      state.from = address;
    });
  }
  /** 输入 To 地址 */
  function handleChangeTo(e) {
    e.persist();
    const to = e.target.value;
    setNextDisabled(true);
    if (!to) {
      setError((state) => {
        state.toError = 'send_error4';
      });
    } else if (to === data.from) {
      setError((state) => {
        state.toError = 'send_nosubmit_owne_tips';
      });
    } else {
      setError((state) => {
        state.toError = null;
        if (Object.values(state).every((item) => item === null)) {
          setNextDisabled(false);
        }
      });
    }

    setData((state) => {
      state.to = to;
    });
  }

  /** 输入 Amount  */
  function handleChangeAmount(value) {
    const newAmount = value; // 准备转移的金额
    const amount = data.asset?.numbers ?? 0;

    if (newAmount) {
      if (newAmount > amount) {
        setNextDisabled(true);
        setError((state) => {
          state.amountError = 'send_error3';
        });
      } else {
        setError((state) => {
          state.amountError = null;
          if (Object.values(state).every((item) => item === null)) {
            setNextDisabled(false);
          }
        });
      }
    } else {
      setNextDisabled(true);
      setError((state) => {
        state.amountError = 'send_error5';
      });
    }

    setData((state) => {
      // 如果待转账的金额 <= 剩余资产, 则转移进行;
      // 如果待转账的金额 > 剩余资产,  则转移剩余的全部资产
      state.numbers = newAmount; // amount > newAmount ? newAmount : amount;
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

  /** 资产属性, 交互提示 */
  function AssetRulesComponent() {
    // 是否可以二次转账

    if (data.asset?.issuer?.key === data.from) {
      return (
        <FindoraButton className="btn" onClick={handleClickItemInfo} disabled={nextDisabled}>
          Next
        </FindoraButton>
      );
    }

    return (
      <FindoraButton className="btn" onClick={handleClickItemInfo} disabled={nextDisabled}>
        Next
      </FindoraButton>
    );
  }

  function limitDecimals(value) {
    return Number(String(value).replace(/^(0+)|[^\d]+/g, '')) || '';
  }

  return (
    <FindoraWebContainer className="send" title={intl.get('page_send_title')}>
      {/* <FindoraHeader title={intl.get('page_send_title')} isShowBack menu={<HeaderMenu />} /> */}
      <div className="send-box">
        <FindoraBoxView title={intl.get('from')}>
          <SwitchAddress
            isShortAddress
            dataList={walletStore.walletImportList}
            curAddress={data.from}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('to')}>
          <Input placeholder="Please to address" value={data.to} className="address" onChange={handleChangeTo} />
          {error.toError && <div className="error">{intl.get(error.toError)}</div>}
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name')}>
          <SwitchAssetName
            onResult={handleChangeSelectAssetName}
            address={data.from}
            actionTYpe={SwitchAssetName.ACTION_TYPE.SEND}
          />
          {error.assetNameError && <div className="error">{intl.get(error.assetNameError)}</div>}
        </FindoraBoxView>

        <FindoraBoxView title={intl.get('send_amount')}>
          <div className="send-balance">
            <span>{intl.get('send_amount_max')}</span>
            <Balance asset={data.asset} style={{ textAlign: 'right' }} key={data.asset.long} />
          </div>
          <InputNumber
            placeholder={intl.get('send_mount_placeholder')}
            value={data.numbers}
            min={0}
            max={data.asset.numbers}
            step={1}
            style={{ width: '100%' }}
            onChange={handleChangeAmount}
            formatter={limitDecimals}
            parser={limitDecimals}
          />

          {error.amountError && <div className="error">{intl.get(error.amountError)}</div>}
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('blind_amount_tips')}>{intl.get('blind_amount')}</FindoraTips>}
          isRow
          titleDirection="top"
        >
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView
          title={<FindoraTips desc={intl.get('blind_type_tips')}>{intl.get('blind_type')}</FindoraTips>}
          isRow
        >
          <Radio.Group
            value={data.blind.isType}
            disabled={blindError.isTypeError}
            onChange={handleChangeRadio('isType')}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
          {blindError.isTypeError && <div className="error">{intl.get(blindError.isTypeError)}</div>}
        </FindoraBoxView>

        <div className="btn-area">{AssetRulesComponent()}</div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(Send);
