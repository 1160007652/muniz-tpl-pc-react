import React from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

import FindoraButton from '_components/FindoraButton';

import './index.less';

const ResultAsset = ({ data, title, onClose, onView }) => {
  const isSuccess = data.type;
  console.log(data);
  return (
    <div className="result-asset">
      {isSuccess ? (
        <div className="info">
          <div>
            <CheckOutlined className="icon success" />
          </div>
          <div className="tips"> {`Successfully ${title} Asset `}</div>
        </div>
      ) : (
        <div className="info">
          <div>
            <CloseOutlined className="icon fail" />
          </div>
          <div className="tips">Failed</div>
          <div className="message">{data.result.message}</div>
        </div>
      )}
      <div className="btn-area">
        {isSuccess ? (
          <FindoraButton className="btn" onClick={onView}>
            View
          </FindoraButton>
        ) : (
          <FindoraButton className="btn" onClick={onClose}>
            Close
          </FindoraButton>
        )}
      </div>
    </div>
  );
};

export default ResultAsset;
