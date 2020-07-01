import React from 'react';
import intl from 'react-intl-universal';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import FindoraButton from '_components/FindoraButton';

import './index.less';

const ResultAsset = ({ data, title, onClose, onView }) => {
  const isSuccess = data.type;
  return (
    <div className="result-asset">
      {isSuccess ? (
        <div className="info">
          <div>
            <CheckOutlined className="icon success" />
          </div>
          <div className="tips">
            {title === 'Created'
              ? intl.get('tips_asset_create_result_success')
              : intl.get('tips_asset_issue_result_success')}
          </div>
        </div>
      ) : (
        <div className="info">
          <div>
            <CloseOutlined className="icon fail" />
          </div>
          <div className="tips">{intl.get('fail')}</div>
          <div className="message">{data.result.message}</div>
        </div>
      )}
      <div className="btn-area">
        {isSuccess ? (
          <FindoraButton className="btn" onClick={onView}>
            {intl.get('view')}
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

export default ResultAsset;
