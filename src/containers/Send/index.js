import React, { useState } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Radio } from 'antd';
import intl from 'react-intl-universal';
import { useImmer } from 'use-immer';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import SwitchAddress from '_containers/SwitchAddress';
import SwitchAssetName from '_containers/SwitchAssetName';
import Balance from '_containers/Balance';

import pageURL from '_constants/pageURL';

import './index.less';
import { object } from 'prop-types';

const Send = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [nextDisabled, setNextDisabled] = useState(true);
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
      isAmount: false,
      isType: false,
    },
  });

  function handleClickItemInfo() {
    history.push({ pathname: pageURL.sendConfrim, state: data });
  }
  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    setNextDisabled(true);
    const asset_rules = {
      asset_rules: {
        max_units: null,
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
      console.log(1231321);
      setError((state) => {
        state.assetNameError = 'send_error6';
      });
      return;
    }
    console.log('ssssssss2222: ', value);
    if (!asset_rules.asset_rules.transferable) {
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
    setData((state) => {
      state.from = address;
    });
  }
  /** 输入 To 地址 */
  function handleChangeTo(e) {
    e.persist();
    const to = e.target.value;
    if (!to) {
      setNextDisabled(true);
      setError((state) => {
        state.toError = 'send_error4';
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
  function handleChangeAmount(e) {
    e.persist();
    const newAmount = e.target.value; // 准备转移的金额
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

  return (
    <div className="send">
      <FindoraHeader title={intl.get('page_send_title')} isShowBack menu={<HeaderMenu />} />
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
          <Input
            placeholder={intl.get('send_mount_placeholder')}
            type="number"
            value={data.numbers}
            onChange={handleChangeAmount}
          />
          {error.amountError && <div className="error">{intl.get(error.amountError)}</div>}
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('blind_amount')} isRow>
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        {/* <FindoraBoxView title={intl.get('blind_type')} isRow>
          <Radio.Group value={data.blind.isType} disabled onChange={handleChangeRadio('isType')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView> */}
        <div className="btn-area">{AssetRulesComponent()}</div>
      </div>
    </div>
  );
};

export default observer(Send);
