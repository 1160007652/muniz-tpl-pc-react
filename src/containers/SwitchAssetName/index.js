/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 17:02:06
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select, Skeleton } from 'antd';
import intl from 'react-intl-universal';

import pageURL from '_constants/pageURL';

import './index.less';

const SwitchAssetName = ({ onResult, address, actionTYpe, assetType }) => {
  const { assetStore } = React.useContext(MobXProviderContext);
  const [assetCurrent, setAssetCurrent] = useState();
  const [isShowComponent, setShowComponent] = useState(false);

  const getAssetListCallback = useCallback(
    (abortSignal) => {
      setShowComponent(false);
      async function getIssuedAssetList() {
        await assetStore.getIssuedAssetList(address);
        const assetList = toJS(assetStore.issuedAssetList);

        if (abortSignal.aborted) {
          return Promise.reject(intl.get('system_cancel_async'));
        } else {
          // 通知父组件结果
          onResult(assetList.length > 0 ? assetList[0] : {});
          setAssetCurrent(assetList[0]);
          setShowComponent(true);
        }
      }

      async function getCreatedAssetList() {
        await assetStore.getCreatedAssetList(address);

        const assetList = toJS(assetStore.createdAssetList);

        if (abortSignal.aborted) {
          return Promise.reject(intl.get('system_cancel_async'));
        } else {
          // 通知父组件结果
          onResult(assetList.length > 0 ? assetList[0] : {});
          // 自身UI 交互
          setAssetCurrent(assetList[0]);
          setShowComponent(true);
        }
      }

      async function getSendAssetList() {
        await assetStore.getSendAssetList({ address, assetType });

        const assetList = toJS(assetStore.sentAssetList);

        if (abortSignal.aborted) {
          return Promise.reject(intl.get('system_cancel_async'));
        } else {
          // 通知父组件结果
          onResult(assetList.length > 0 ? assetList[0] : {});
          // 自身UI 交互
          setAssetCurrent(assetList[0]);
          setShowComponent(true);
        }
      }

      const getData = {
        create: getCreatedAssetList,
        issue: getIssuedAssetList,
        send: getSendAssetList,
      };

      getData[actionTYpe]();
    },
    [address],
  );

  useEffect(() => {
    const abortController = new AbortController();
    const abortSignal = abortController.signal;
    if (address) {
      getAssetListCallback(abortSignal);
    }

    return () => {
      abortController.abort();
    };
  }, [getAssetListCallback]);

  /** 显示资产页面,切换资产事件 */
  function handleSelectAssetName(value) {
    const assetList = {
      create: toJS(assetStore.createdAssetList).filter((item) => item.long === value),
      issue: toJS(assetStore.issuedAssetList).filter((item) => item.asset.long === value),
      send: toJS(assetStore.sentAssetList).filter((item) => item.asset.long === value),
    };
    // 通知父组件结果
    onResult(assetList[actionTYpe].length > 0 ? assetList[actionTYpe][0] : {});

    // 自身UI 交互
    setAssetCurrent(assetList[actionTYpe][0]);
  }

  function getAssetListSelect() {
    // 增发列表
    const issueAssetListComponent =
      assetStore.issuedAssetList.length > 0 ? (
        <Fragment>
          <Select value={assetCurrent?.asset.long} style={{ width: '100%' }} onChange={handleSelectAssetName}>
            {assetStore.issuedAssetList.map((item) => {
              return (
                <Select.Option value={item.asset.long} key={item.asset.long}>
                  {item.asset.short || item.asset.long}
                </Select.Option>
              );
            })}
          </Select>
          <div className="tips">{assetCurrent?.asset.long}</div>
        </Fragment>
      ) : (
        <div className="error">
          {intl.get('token_empty_tips')}
          <Link to={pageURL.createAsset}>{intl.get('token_empty_here_tips')}</Link>
          {intl.get('token_empty_last_tips')}
        </div>
      );

    // 拥有资产的列表
    const createdAssetListComponent =
      assetStore.createdAssetList.length > 0 ? (
        <Fragment>
          <Select value={assetCurrent?.long} style={{ width: '100%' }} onChange={handleSelectAssetName}>
            {assetStore.createdAssetList.map((item) => {
              return (
                <Select.Option value={item.long} key={item.long}>
                  {item.short || item.long}
                </Select.Option>
              );
            })}
          </Select>
          <div className="tips"> {assetCurrent?.long}</div>
        </Fragment>
      ) : (
        <div className="error">
          {intl.get('token_issue_empty_tips')}
          <a href={`${chrome.runtime.getURL('popup.html')}#${pageURL.issueAsset}`} target="_blank">
            {intl.get('token_or_issue_empty_here')}
          </a>
          {intl.get('token_issue_create_btn_tips')}
        </div>
      );

    // 转账列表
    const sendAssetListComponent =
      assetStore.sentAssetList.length > 0 ? (
        <Fragment>
          <Select value={assetCurrent?.asset.long} style={{ width: '100%' }} onChange={handleSelectAssetName}>
            {assetStore.sentAssetList.map((item) => {
              return (
                <Select.Option value={item.asset.long} key={item.asset.long}>
                  {item.asset.short || item.asset.long}
                </Select.Option>
              );
            })}
          </Select>
          <div className="tips">{assetCurrent?.asset.long}</div>
        </Fragment>
      ) : (
        <div className="error">
          {intl.get('token_issue_empty_tips')}
          <a href={`${chrome.runtime.getURL('popup.html')}#${pageURL.issueAsset}`} target="_blank">
            {intl.get('token_or_issue_empty_here')}
          </a>
          {intl.get('token_issue_create_btn_tips')}
        </div>
      );

    if (isShowComponent) {
      const getData = {
        create: createdAssetListComponent,
        issue: issueAssetListComponent,
        send: sendAssetListComponent,
      };

      return getData[actionTYpe];
    } else {
      return <Skeleton.Input active />;
    }
  }

  return <div className="findora-switch-asset-name">{getAssetListSelect()}</div>;
};

SwitchAssetName.ACTION_TYPE = {
  CREATE: 'create',
  ISSUE: 'issue',
  SEND: 'send',
};

SwitchAssetName.propTypes = {
  /** 创建资产回调结果事件 */
  onResult: PropTypes.func,
  /** 当前钱包地址 */
  address: PropTypes.string,
  /** 资产类型 */
  assetType: PropTypes.string,
  /** 是否待增发 */
  actionTYpe: PropTypes.string,
};

SwitchAssetName.defaultProps = {
  onResult: () => {},
  address: '',
  assetType: 'all',
  actionTYpe: '',
};

export default observer(SwitchAssetName);
