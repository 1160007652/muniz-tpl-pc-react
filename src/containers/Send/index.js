import React from 'react';
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

const Send = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;
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
    const asset_rules = {
      max_units: null,
      transfer_multisig_rules: null,
      transferable: true,
      updatable: false,
    };
    setData((state) => {
      state.asset = { ...state.asset, asset_rules, ...value };
    });
    // setData((state) => {
    //   state.asset = value;
    // });
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
    setData((state) => {
      state.to = e.target.value;
    });
  }

  /** 输入 Amount  */
  function handleChangeAmount(e) {
    e.persist();
    const newAmount = e.target.value; // 准备转移的金额
    const amount = data.asset?.numbers ?? 0;
    setData((state) => {
      // 如果待转账的金额 <= 剩余资产, 则转移进行;
      // 如果待转账的金额 > 剩余资产,  则转移剩余的全部资产
      state.numbers = amount > newAmount ? newAmount : amount;
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
    const isTran = !data.asset?.asset_rules?.transferable;

    if (data.asset?.issuer?.key === data.from) {
      return (
        <FindoraButton className="btn" onClick={handleClickItemInfo}>
          Next
        </FindoraButton>
      );
    }

    return !isTran ? (
      data.asset?.asset_rules ? (
        <div>不可以二次转账</div>
      ) : (
        ''
      )
    ) : (
      <FindoraButton className="btn" onClick={handleClickItemInfo}>
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
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name')}>
          <SwitchAssetName
            onResult={handleChangeSelectAssetName}
            address={data.from}
            actionTYpe={SwitchAssetName.ACTION_TYPE.SEND}
          />
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
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('blind_amount')} isRow>
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
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
        <div className="btn-area">{AssetRulesComponent()}</div>
      </div>
    </div>
  );
};

export default observer(Send);
