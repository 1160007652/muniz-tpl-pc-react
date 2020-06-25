import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import { Input, Radio } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import FindoraWebContainer from '_components/FindoraWebContainer';

import pageURL from '_constants/pageURL';

import './index.less';

const dataDemo = {
  founder: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
  asset: {
    unit: 'FIN',
    maxNumbers: 6000,
  },
  memo: 'hahaha',
  policy: 'Fungible',
  traceable: true,
  transferable: true,
  updatable: true,
};

const CreateAsset = () => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  /**
   * 创建资产, 唤醒插件, 校验信息
   */
  function handleClickCreate() {
    chrome.storage.sync.set({ tempCreateAssetConfrim: JSON.stringify(dataDemo) });

    chrome.windows.create({
      url: `${chrome.runtime.getURL('popup.html')}#${pageURL.assetConfrim.replace(
        ':actionType',
        'createAssetConfrim',
      )}`,
      type: 'popup',
      width: 400,
      height: 630,
    });
  }
  return (
    <FindoraWebContainer className="create-asset" title="Create Asset">
      <div className="create-asset-box">
        <FindoraBoxView title="Founder" isRow>
          {walletStore.walletInfo.publickey}
        </FindoraBoxView>

        <FindoraBoxView title="Asset Name" isRow>
          <Input placeholder="Please to asset name" value="" />
        </FindoraBoxView>

        <FindoraBoxView title="Memo" isRow>
          <Input placeholder="Please to memo" value="" />
        </FindoraBoxView>

        <FindoraBoxView title="Max units" isRow>
          <Input placeholder="Please to Value" value="" />
        </FindoraBoxView>
        <FindoraBoxView title="Policy" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Fungible</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Traceable" isRow>
          <Radio.Group value={0}>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Transferable" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <FindoraBoxView title="Updatable" isRow>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </FindoraBoxView>
        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCreate}>
            Create
          </FindoraButton>
        </div>
      </div>
    </FindoraWebContainer>
  );
};

export default observer(CreateAsset);
