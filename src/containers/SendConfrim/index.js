import React from 'react';
import { useLocation } from 'react-router-dom';
import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';

import services from '_src/services';

import './index.less';

const SendConfrim = () => {
  const RouterLocation = useLocation();
  const { from, to, asset, blind } = RouterLocation.state;

  async function handleClickSubmit() {
    const result = await services.sendServer.setSendAsset(RouterLocation.state);
  }

  return (
    <div className="send-confrim">
      <FindoraHeader title="Send" isShowBack menu={<HeaderMenu />} />
      <div className="send-confrim-box">
        <FindoraBoxView title="From">
          <span className="address">{from}</span>
        </FindoraBoxView>
        <FindoraBoxView title="To">
          <span className="address">{to}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name">
          <div className="address">{asset.unit.short}</div>
          <div className="address">{asset.unit.long}</div>
        </FindoraBoxView>
        <FindoraBoxView title="Value">
          <span className="address">{asset.numbers}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Blind Amount">
          <span className="address">{blind.isAmount ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
        {/* <FindoraBoxView title="Blind Type" isRow>
          <span className="address">{blind.isType ? 'Yes' : 'No'}</span>
        </FindoraBoxView> */}
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickSubmit}>
            Confrim
          </FindoraButton>
        </div>
      </div>
    </div>
  );
};

export default SendConfrim;
