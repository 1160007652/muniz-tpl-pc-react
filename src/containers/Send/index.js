import React, { useState } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Radio } from 'antd';
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
    to: 'SZp3EnyxjX-YJ1tWvILkZZ_00zqgS-uIr0ZoxwnmqTc=',
    asset: {
      unit: {},
      numbers: '10',
    },
    blind: {
      isAmount: false,
      isType: false,
    },
  });
  // 切换资产, 拥有的最大可交易余额
  const [amount, setAmount] = useState(0);

  function handleClickItemInfo() {
    history.push({ pathname: pageURL.sendConfrim, state: data });
  }
  /** 资产名称选中事件, 回调结果 */
  function handleChangeSelectAssetName(value) {
    setData((state) => {
      state.asset.unit = value;
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
    setData((state) => {
      state.to = e.target.value;
    });
  }
  /** 资产余额回调 */
  function handleChangeBalance(obj) {
    setAmount(obj.numbers);
  }
  /** 输入 Amount  */
  function handleChangeAmount(e) {
    e.persist();
    const newAmount = e.target.value; // 准备转移的金额
    setData((state) => {
      // 如果待转账的金额 <= 剩余资产, 则转移进行;
      // 如果待转账的金额 > 剩余资产,  则转移剩余的全部资产
      state.asset.numbers = amount > newAmount ? newAmount : amount;
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
    <div className="send">
      <FindoraHeader title={intl.get('page_send_title')} isShowBack menu={<HeaderMenu />} />
      <div className="send-box">
        <FindoraBoxView title={intl.get('send_from')}>
          <SwitchAddress
            isShortAddress
            dataList={walletStore.walletImportList}
            curAddress={data.from}
            onChange={handleChangeSwitchAddress}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('send_to')}>
          <Input placeholder="Please to address" value={data.to} className="address" onChange={handleChangeTo} />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('send_asset_name')}>
          <SwitchAssetName onResult={handleChangeSelectAssetName} address={walletStore.walletInfo.publickey} />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('send_amount')}>
          <div className="send-balance">
            <span>{intl.get('send_amount_max')}</span>
            <Balance
              assetName={data.asset}
              onResult={handleChangeBalance}
              style={{ textAlign: 'right' }}
              key={data.asset.unit.long}
              walletInfo={data.walletInfo}
            />
          </div>
          <Input
            placeholder={intl.get('send_mount_placeholder')}
            type="number"
            value={data.asset.numbers}
            onChange={handleChangeAmount}
          />
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('send_blind_amount')} isRow>
          <Radio.Group value={data.blind.isAmount} onChange={handleChangeRadio('isAmount')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('send_blind_type')} isRow>
          <Radio.Group value={data.blind.isType} disabled onChange={handleChangeRadio('isType')}>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickItemInfo}>
            Next
          </FindoraButton>
        </div>
      </div>
    </div>
  );
};

export default observer(Send);
