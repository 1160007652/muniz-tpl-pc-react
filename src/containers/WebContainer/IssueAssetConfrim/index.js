import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import intl from 'react-intl-universal';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_components/ResultAsset';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const IssueAssetConfrim = ({ data }) => {
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const hirstory = useHistory();
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
    hirstory.push({ pathname: pageURL.transactions });
  }
  /** 提交数据 */
  async function handleClickSubmit() {
    const result = await services.assetServer.issueAsset(data);

    setResultData({ type: result.code === 0, result });
    setShowResult(true);
  }

  function confrimComponent() {
    return (
      <div className="issue-asset-confrim">
        <div className="issue-asset-confrim-box">
          <FindoraBoxView title={intl.get('token_issue_issuer')}>
            <span className="address">{issuer}</span>
          </FindoraBoxView>
          <FindoraBoxView title={intl.get('asset_name')}>
            <div className="address" style={{ color: 'rgba(131, 151, 177, 0.6)' }}>
              {asset.unit.short}
            </div>
            <div className="address">{asset.unit.long}</div>
          </FindoraBoxView>
          {/* <FindoraBoxView title={intl.get('to')}>
            <span className="address">{to}</span>
          </FindoraBoxView> */}
          <FindoraBoxView title={intl.get('balance')}>
            <span className="address">{asset.numbers}</span>
            <span style={{ marginLeft: '4px' }}>{asset.unit.short}</span>
          </FindoraBoxView>
          <FindoraBoxView title={intl.get('blind_amount')}>
            <span className="address">{blind.isAmount ? 'Yes' : 'No'}</span>
          </FindoraBoxView>
          <FindoraBoxView title={intl.get('blind_type')}>
            <span className="address">{blind.isType ? 'Yes' : 'No'}</span>
          </FindoraBoxView>
        </div>

        <div className="btn-area">
          <FindoraButton className="btn" onClick={handleClickCancel}>
            {intl.get('cancel')}
          </FindoraButton>
          <FindoraButton className="btn" onClick={handleClickSubmit}>
            {intl.get('confrim')}
          </FindoraButton>
        </div>
      </div>
    );
  }

  return isShowResult ? (
    <ResultAsset title="Issued" data={resultData} onClose={handleClickCancel} onView={handleClickView} />
  ) : (
    confrimComponent()
  );
};

export default IssueAssetConfrim;
