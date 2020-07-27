import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MobXProviderContext } from 'mobx-react';
import intl from 'react-intl-universal';
import { Spin, message } from 'antd';

import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_components/ResultAsset';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const CreateAssetConfrim = ({ data }) => {
  const walletStore = React.useContext(MobXProviderContext).walletStore;
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const hirstory = useHistory();
  const { founder, asset, memo, policy, traceable, transferable, updatable } = data;

  // window.onbeforeunload = function (e) {
  //   e = e || window.event;
  //   return '关闭提示';
  // };

  /** 取消窗口 */
  function handleClickCancel() {
    window.postMessage('11111', '*');
    chrome.storage.sync.remove(['tempCreateAssetConfrim']);
    chrome.windows.getCurrent((curWindow) => {
      chrome.windows.remove(curWindow.id);
    });
  }
  /** 显示结果后, 按钮事件 */
  function handleClickView() {
    port.postMessage({ joke: '敲门' });
    // hirstory.replace({ pathname: pageURL.walletInfo });
  }
  /** 提交数据 */
  async function handleClickSubmit() {
    setLoading(true);
    try {
      const result = await services.assetServer.createAsset(data);

      // 如果 创建成功, 切换选中钱包成当前的创建成功钱包
      if (result.code === 0) {
        walletStore.setWalletInfo(data.walletInfo);
      }
      setLoading(false);
      setResultData({ type: result.code === 0, result });
      setShowResult(true);
    } catch {
      setLoading(false);
      message.error(intl.get('token_create_error1'));
    }
  }

  function confrimComponent() {
    return (
      <div className="create-asset-confrim">
        <Spin spinning={isLoading}>
          <div className="create-asset-confrim-box">
            <FindoraBoxView title={intl.get('token_issue_issuer')}>
              <span className="address">{founder}</span>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('asset_name')}>
              <div className="address" style={{ color: 'rgba(131, 151, 177, 0.6)' }}>
                {asset.short}
              </div>
              <div className="address">{asset.long}</div>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('memo')}>
              <span className="address">{memo}</span>
            </FindoraBoxView>
            {/* <FindoraBoxView title={intl.get('policy')}>
              <span className="address">{policy}</span>
            </FindoraBoxView> */}
            <FindoraBoxView title={intl.get('traceable')}>
              <span className="address">{traceable ? 'Yes' : 'No'}</span>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('transferable')}>
              <span className="address">{transferable ? 'Yes' : 'No'}</span>
            </FindoraBoxView>
            {/* <FindoraBoxView title={intl.get('updatable')}>
              <span className="address">{updatable ? 'Yes' : 'No'}</span>
            </FindoraBoxView> */}
            <FindoraBoxView title={intl.get('token_create_max_amount')}>
              <span className="address">{asset.maxNumbers}</span>
              {/* <span style={{ marginLeft: '4px' }}>{asset.short}</span> */}
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
    <ResultAsset title="Created" data={resultData} onClose={handleClickCancel} onView={handleClickView} />
  ) : (
    confrimComponent()
  );
};

export default CreateAssetConfrim;
