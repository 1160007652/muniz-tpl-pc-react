import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import intl from 'react-intl-universal';
import { Spin, message } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_components/ResultAsset';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const IssueAssetConfrim = ({ data }) => {
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const hirstory = useHistory();
  const { issuer, asset, inputBumbers, blind } = data;

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
    hirstory.replace({ pathname: pageURL.transactions.replace(':action', 'loading') });
  }
  /** 提交数据 */
  async function handleClickSubmit() {
    setLoading(true);
    try {
      const result = await services.assetServer.issueAsset(data);
      // 如果 创建成功, 切换选中钱包成当前的创建成功钱包
      if (result.code === 0) {
        // ...
      }
      setLoading(false);
      setResultData({ type: result.code === 0, result });
      setShowResult(true);
    } catch {
      setLoading(false);
      message.error(intl.get('token_issue_error1'));
    }
  }

  function confrimComponent() {
    return (
      <div className="issue-asset-confrim">
        <Spin spinning={isLoading}>
          <div className="issue-asset-confrim-box">
            <FindoraBoxView title={intl.get('token_issue_issuer')}>
              <div className="address">{issuer}</div>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('asset_name')}>
              <div className="address" style={{ color: 'rgba(131, 151, 177, 0.6)' }}>
                {asset.short}
              </div>
              <div className="address">{asset.long}</div>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('balance')}>
              <span className="address">{inputBumbers}</span>
              {/* <span style={{ marginLeft: '4px' }}>{asset.short}</span> */}
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
              {intl.get('confirm')}
            </FindoraButton>
          </div>
        </Spin>
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
