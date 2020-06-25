import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import FindoraHeader from '_components/FindoraHeader';
import HeaderMenu from '_containers/HeaderMenu';

const CreateAssetConfrim = React.lazy(() => import('_containers/WebContainer/CreateAssetConfrim'));
const IssueAssetConfrim = React.lazy(() => import('_containers/WebContainer/IssueAssetConfrim'));

import './index.less';

const AssetConfrim = () => {
  const RouterParams = useParams();
  const { actionType } = RouterParams;
  const [data, setData] = useState(null);

  useEffect(() => {
    chrome.storage.sync.get(
      ['tempIssueAssetConfrim', 'tempCreateAssetConfrim'],
      ({ tempIssueAssetConfrim, tempCreateAssetConfrim }) => {
        let tempData = null;

        if (actionType === 'createAssetConfrim') {
          tempData = tempCreateAssetConfrim;
        }

        if (actionType === 'issueAssetConfrim') {
          tempData = tempIssueAssetConfrim;
        }

        const timer = setTimeout(() => {
          setData(JSON.parse(tempData) || null);
        }, 300);

        return () => {
          clearTimeout(timer);
        };
      },
    );
  }, []);

  function ConfrimComponent(result) {
    let selectComponent = <div className="error">Error</div>;
    if (actionType === 'createAssetConfrim') {
      selectComponent = <CreateAssetConfrim data={result} />;
    }
    if (actionType === 'issueAssetConfrim') {
      selectComponent = <IssueAssetConfrim data={result} />;
    }
    return (
      <Suspense
        fallback={
          <div className="loding">
            <Spin />
          </div>
        }
      >
        {selectComponent}
      </Suspense>
    );
  }
  return (
    <div className="asset-confrim">
      <FindoraHeader menu={<HeaderMenu />} />
      {data ? (
        ConfrimComponent(data)
      ) : (
        <div className="loding">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default AssetConfrim;
