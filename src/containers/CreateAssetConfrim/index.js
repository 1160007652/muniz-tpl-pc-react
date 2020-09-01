import React, { useState } from 'react';
import { MobXProviderContext } from 'mobx-react';
import intl from 'react-intl-universal';
import { Spin, message } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_components/ResultAsset';

import services from '_src/services';

import './index.less';

const CreateAssetConfrim = ({ data }) => {
  const { walletStore, assetStore, nickNameStore } = React.useContext(MobXProviderContext);
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { founder, asset, memo, policy, traceable, transferable, updatable } = data;

  /** 取消窗口 */
  function handleClickCancel() {
    assetStore.toggleDrawer('created', false);
  }
  /** 显示结果后, 按钮事件 */
  function handleClickView() {
    assetStore.toggleDrawer('created', false);
    assetStore.changeComponentKey('created');
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
      assetStore.changeComponentKey('created');

      // 设置资产昵称
      nickNameStore.importNickNameList({
        nickNameItem: { assetCode: asset.long, nickname: asset.short, nicknames: [] },
      });
      setLoading(false);
      setResultData({ type: result.code === 0, result });
      setShowResult(true);
    } catch (e) {
      setLoading(false);
      message.error(intl.get('token_create_error1'));
    }
  }

  function confrimComponent() {
    return (
      <div className="create-asset-confrim">
        <FindoraHeader />
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
