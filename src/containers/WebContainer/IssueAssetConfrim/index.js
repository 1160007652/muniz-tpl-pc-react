import React, { useState } from 'react';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_containers/WebContainer/ResultAsset';

import './index.less';

const IssueAssetConfrim = ({ data }) => {
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const { issuer, asset, to, blind } = data;

  /** 取消窗口 */
  function handleClickCancel() {
    chrome.storage.sync.remove(['tempIssueAssetConfrim']);
    chrome.windows.getCurrent((curWindow) => {
      console.log(curWindow);
      chrome.windows.remove(curWindow.id);
    });
  }
  /** 显示结果后, 按钮事件 */
  function handleClickView() {
    console.log('信息展示');
  }
  /** 提交数据 */
  async function handleClickSubmit() {
    // const result = await services.assetServer.createAsset(data);
    setShowResult(true);
    setResultData({ type: true });
  }

  function confrimComponent() {
    return (
      <div className="issue-asset-confrim">
        <div className="issue-asset-confrim-box">
          <FindoraBoxView title="Issuer">
            <span className="address">{issuer}</span>
          </FindoraBoxView>
          <FindoraBoxView title="Long Name">
            <span className="address">{asset.unit.long}</span>
          </FindoraBoxView>
          <FindoraBoxView title="Short Name">
            <span className="address">{asset.unit.short}</span>
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
          <FindoraButton className="btn" onClick={handleClickCancel}>
            Cancel
          </FindoraButton>
          <FindoraButton className="btn" onClick={handleClickSubmit}>
            Confrim
          </FindoraButton>
        </div>
      </div>
    );
  }

  return isShowResult ? (
    <ResultAsset title="Created" data={resultData} onClose={handleClickCancel} onView={handleClickView} />
  ) : (
    confrimComponent()
  );
};

export default IssueAssetConfrim;
