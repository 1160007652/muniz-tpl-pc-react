import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import intl from 'react-intl-universal';
import { message, Spin } from 'antd';

import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';
import FindoraButton from '_components/FindoraButton';
import FindoraBoxView from '_components/FindoraBoxView';
import ResultAsset from '_components/ResultAsset';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const SendConfrim = () => {
  const RouterLocation = useLocation();
  const hirstory = useHistory();
  const [resultData, setResultData] = useState({ type: false });
  const [isShowResult, setShowResult] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { from, to, asset, blind, numbers } = RouterLocation.state;

  /** 取消窗口 */
  function handleClickCancel() {
    setShowResult(false);
  }
  /** 显示结果后, 按钮事件 */
  function handleClickView() {
    hirstory.replace({ pathname: pageURL.transactions.replace(':action', 'refresh') });
  }

  /** 提交转账 */
  async function handleClickSubmit() {
    setLoading(true);
    try {
      const result = await services.sendServer.setSendAsset(RouterLocation.state);

      // 如果 转账成功, 需要做某件事情, 打开注释进行编写
      // if (result.code === 0) {
      //   console.log('转账成功');
      // }

      if (result.code === -2) {
        message.error(intl.get('send_submit_not_last_transaction'));
        return;
      }
      setLoading(false);
      setResultData({ type: result.code === 0, result });
      setShowResult(true);
    } catch (err) {
      setLoading(false);
      console.log(err);
      message.error(intl.get('send_error1'));
    }
  }

  function confrimComponent() {
    return (
      <div className="send-confrim">
        <FindoraHeader title="Send" isShowBack menu={<HeaderMenu />} />
        <Spin spinning={isLoading}>
          <div className="send-confrim-box">
            <FindoraBoxView title={intl.get('from')}>
              <span className="address">{from}</span>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('to')}>
              <span className="address">{to}</span>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('asset_name')}>
              {/* <div className="address">{asset.short}</div> */}
              <div className="address">{asset.long}</div>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('send_amount')}>
              <span className="address">{numbers}</span>
            </FindoraBoxView>
            <FindoraBoxView title={intl.get('blind_amount')}>
              <span className="address">{blind.isAmount ? 'Yes' : 'No'}</span>
            </FindoraBoxView>
            {/* <FindoraBoxView title={intl.get('blind_type')}>
              <span className="address">{blind.isType ? 'Yes' : 'No'}</span>
            </FindoraBoxView> */}
            <div className="btn-area">
              <FindoraButton className="btn" onClick={handleClickSubmit}>
                {intl.get('send_submit')}
              </FindoraButton>
            </div>
          </div>
        </Spin>
      </div>
    );
  }

  return isShowResult ? (
    <div className="send-confrim">
      <FindoraHeader title="Send" />
      <ResultAsset title="Send" data={resultData} onClose={handleClickCancel} onView={handleClickView} />
    </div>
  ) : (
    confrimComponent()
  );
};

export default SendConfrim;
