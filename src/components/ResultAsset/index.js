import React from 'react';
import intl from 'react-intl-universal';
import PropTypes from 'prop-types';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import FindoraButton from '../FindoraButton';

import './index.less';

/**
 * ResultAsset 纯组件, 结果展示页面
 * @component
 *
 */
/**
 * Pure component to display the result.
 * @component
 */
const ResultAsset = ({ data, title, onClose, onView }) => {
  const isSuccess = data.type;

  function tipsSuccess(type) {
    const tips = {
      Created: intl.get('tips_asset_create_result_success'),
      Issued: intl.get('tips_asset_issue_result_success'),
      Send: intl.get('tips_asset_send_result_success'),
    };
    return tips[type];
  }
  return (
    <div className="result-asset">
      {isSuccess ? (
        <div className="info">
          <div>
            <CheckOutlined className="icon success" />
          </div>
          <div className="tips">{tipsSuccess(title)}</div>
        </div>
      ) : (
        <div className="info">
          <div>
            <CloseOutlined className="icon fail" />
          </div>
          <div className="tips">{intl.get('fail')}</div>
          <div className="message">{data?.result?.message}</div>
        </div>
      )}
      <div className="btn-area">
        {isSuccess ? (
          <FindoraButton className="btn" onClick={onView}>
            {title === 'Created' ? intl.get('done') : intl.get('view')}
          </FindoraButton>
        ) : (
          <FindoraButton className="btn" onClick={onClose}>
            {intl.get('close')}
          </FindoraButton>
        )}
      </div>
    </div>
  );
};

ResultAsset.propTypes = {
  /** 失败事件 */
  /** Failed event */
  onClose: PropTypes.func,
  /** 数据源 */
  /** Data source */
  data: PropTypes.object,
  /** 标题 */
  /** Title */
  title: PropTypes.string,
  /** 成功事件 */
  /** Succeed event */
  onView: PropTypes.func,
};

ResultAsset.defaultProps = {
  onClose: () => {},
  onView: () => {},
  title: 'Created',
  data: {},
};

export default ResultAsset;
