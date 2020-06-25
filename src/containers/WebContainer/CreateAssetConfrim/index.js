import React from 'react';
import { useLocation } from 'react-router-dom';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';

import './index.less';

const CreateAssetConfrim = ({ data }) => {
  const RouterLocation = useLocation();
  const { founder, asset, memo, policy, traceable, transferable, updatable } = data;

  function handleClickCancel() {
    chrome.storage.sync.remove(['tempCreateAssetConfrim']);
    chrome.windows.getCurrent((curWindow) => {
      chrome.windows.remove(curWindow.id);
    });
  }
  return (
    <div className="create-asset-confrim">
      <div className="create-asset-confrim-box">
        <FindoraBoxView title="Founder">
          <span className="address">{founder}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name">
          <span className="address">{asset.unit}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Memo">
          <span className="address">{memo}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Policy">
          <span className="address">{policy}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Traceable">
          <span className="address">{traceable ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Transferable">
          <span className="address">{transferable ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Updatable">
          <span className="address">{updatable ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Max Units">
          <span className="address">{asset.maxNumbers}</span>
        </FindoraBoxView>
      </div>

      <div className="btn-area">
        <FindoraButton className="btn" onClick={handleClickCancel}>
          Cancel
        </FindoraButton>
        <FindoraButton className="btn">Confrim</FindoraButton>
      </div>
    </div>
  );
};

export default CreateAssetConfrim;
