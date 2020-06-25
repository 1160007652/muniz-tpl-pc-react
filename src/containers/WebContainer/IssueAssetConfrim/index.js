import React from 'react';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';

import './index.less';

const IssueAssetConfrim = ({ data }) => {
  const { issuer, asset, to, blind } = data;
  function handleClickCancel() {
    chrome.storage.sync.remove(['tempIssueAssetConfrim']);
    chrome.windows.getCurrent((curWindow) => {
      console.log(curWindow);
      chrome.windows.remove(curWindow.id);
    });
  }
  return (
    <div className="issue-asset-confrim">
      <div className="issue-asset-confrim-box">
        <FindoraBoxView title="Issuer">
          <span className="address">{issuer}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Asset Name">
          <span className="address">{asset.unit}</span>
        </FindoraBoxView>
        <FindoraBoxView title="To">
          <span className="address">{to}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Amount">
          <span className="address">{asset.numbers}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Blind Amount">
          <span className="address">{blind.isAmount ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
        <FindoraBoxView title="Blind Type">
          <span className="address">{blind.isType ? 'Yes' : 'No'}</span>
        </FindoraBoxView>
      </div>

      <div className="btn-area">
        <FindoraButton className="btn">Cancel</FindoraButton>
        <FindoraButton className="btn">Confrim</FindoraButton>
      </div>
    </div>
  );
};

export default IssueAssetConfrim;
