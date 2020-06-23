import React, { useState } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { Input, Select, Radio } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';

import './index.less';
import pageURL from '_constants/pageURL';

const Send = () => {
  const history = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  return (
    <div className="send">
      <FindoraHeader title="Send" isShowBack menu={<HeaderMenu />} />
      <div className="send-box">
        <FindoraBoxView title="From">{walletStore.walletInfo.publickey}</FindoraBoxView>
        <FindoraBoxView title="To">
          <Input placeholder="Please to address" value="n1NStVG4c9HqXGebAdNkfhypHebhGqdeNs5" />
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name">
          <Select defaultValue="FIN" style={{ width: '100%' }}>
            <Select.Option value="FIN">FIN</Select.Option>
            <Select.Option value="GIN">GIN</Select.Option>
          </Select>
        </FindoraBoxView>
        <FindoraBoxView title="Value">
          <Input placeholder="Please to Value" value="" />
        </FindoraBoxView>
        <FindoraBoxView title="Blind Amount" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Blind Type" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn">Next</FindoraButton>
        </div>
      </div>
    </div>
  );
};

export default observer(Send);
