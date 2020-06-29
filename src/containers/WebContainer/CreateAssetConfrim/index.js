import React, { useState } from 'react';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_containers/WebContainer/ResultAsset';

import services from '_src/services';

import './index.less';

const CreateAssetConfrim = ({ data }) => {
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);

  const { founder, asset, memo, policy, traceable, transferable, updatable } = data;

  /** 取消窗口 */
  function handleClickCancel() {
    chrome.storage.sync.remove(['tempCreateAssetConfrim']);
    chrome.windows.getCurrent((curWindow) => {
      chrome.windows.remove(curWindow.id);
    });
  }
  /** 显示结果后, 按钮事件 */
  function handleClickView() {
    console.log('信息展示');
  }
  /** 提交数据 */
  async function handleClickSubmit() {
    const result = await services.assetServer.createAsset(data);
    setShowResult(true);
    setResultData({ type: true });
  }

  function confrimComponent() {
    return (
      <div className="create-asset-confrim">
        <div className="create-asset-confrim-box">
          <FindoraBoxView title="Founder">
            <span className="address">{founder}</span>
          </FindoraBoxView>
          <FindoraBoxView title="Long Name">
            <span className="address">{asset.unit.long}</span>
          </FindoraBoxView>
          <FindoraBoxView title="Short Name">
            <span className="address">{asset.unit.short}</span>
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

export default CreateAssetConfrim;
