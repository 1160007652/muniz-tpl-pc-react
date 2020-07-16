/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 15:03:14
 * @ Description: 资产列表组件, 用于选着资产, 并返回结果
 */

import React, { useState, useEffect, Fragment, useCallback } from 'react';
import { toJS } from 'mobx';
import { MobXProviderContext, observer } from 'mobx-react';
import { useRouteMatch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Select, Skeleton } from 'antd';

import services from '_src/services';
import pageURL from '_constants/pageURL';

import './index.less';

const SwitchAssetName = ({ onResult, address, isIssued }) => {
  const assetStore = React.useContext(MobXProviderContext).assetStore;
  const [assetCurrent, setAssetCurrent] = useState();
  const [isShowComponent, setShowComponent] = useState(false);
  const routeMatch = useRouteMatch();

  const getAssetListCallback = useCallback(() => {
    setShowComponent(false);
    async function getCreatedAssetList() {
      await assetStore.getCreatedAssetList(address);
      const assetList = toJS(assetStore.issueAssetList);

      // 通知父组件结果
      onResult(assetList.length > 0 ? assetList[0] : {});

      // 自身UI 交互 s
      setAssetCurrent(assetList[0]);

      setShowComponent(true);
    }

    async function getIssuedAssetList() {
      await assetStore.getIssuedAssetList(address);
      const assetList = toJS(assetStore.createdAssetList);
      // 通知父组件结果
      onResult(assetList.length > 0 ? assetList[0] : {});

      // 自身UI 交互 s
      setAssetCurrent(assetList[0]);

      setShowComponent(true);
    }

    if (isIssued) {
      getCreatedAssetList();
    } else {
      getIssuedAssetList();
    }
  }, [address]);

  useEffect(() => {
    getAssetListCallback();
  }, [getAssetListCallback]);

  /** 显示资产页面,切换资产事件 */
  function handleSelectAssetName(value) {
    const assetList = isIssued
      ? toJS(assetStore.issueAssetList).filter((item) => item.long === value)
      : toJS(assetStore.createdAssetList).filter((item) => item.long === value);
    // 通知父组件结果
    onResult(assetList.length > 0 ? assetList[0] : {});

    // 自身UI 交互
    setAssetCurrent(assetList[0]);
  }

  function getAssetListSelect() {
    // 待增发列表
    const issueAssetListComponent =
      assetStore.issueAssetList.length > 0 ? (
        <Fragment>
          <Select value={assetCurrent?.long} style={{ width: '100%' }} onChange={handleSelectAssetName}>
            {assetStore.issueAssetList.map((item) => {
              return (
                <Select.Option value={item.long} key={item.long}>
                  {item.short}
                </Select.Option>
              );
            })}
          </Select>
          <div className="tips">{assetCurrent?.long}</div>
        </Fragment>
      ) : (
        <div>
          请先创建资产,
          {String(routeMatch.path).includes(pageURL.webContainer) ? (
            <Link to={pageURL.createAsset}>点击创建</Link>
          ) : (
            <a href={`${chrome.runtime.getURL('popup.html')}#${pageURL.createAsset}`} target="_blank">
              点击创建
            </a>
          )}
        </div>
      );

    // 已增发列表
    const createdAssetListComponent =
      assetStore.createdAssetList.length > 0 ? (
        <Fragment>
          <Select value={assetCurrent?.long} style={{ width: '100%' }} onChange={handleSelectAssetName}>
            {assetStore.createdAssetList.map((item) => {
              return (
                <Select.Option value={item.long} key={item.long}>
                  {item.short}
                </Select.Option>
              );
            })}
          </Select>
          <div className="tips">{assetCurrent?.long}</div>
        </Fragment>
      ) : (
        <div>
          请先增发资产,
          {String(routeMatch.path).includes(pageURL.webContainer) ? (
            <Link to={pageURL.issueAsset}>点击增发</Link>
          ) : (
            <a href={`${chrome.runtime.getURL('popup.html')}#${pageURL.issueAsset}`} target="_blank">
              点击增发
            </a>
          )}
        </div>
      );

    if (isShowComponent) {
      return isIssued ? issueAssetListComponent : createdAssetListComponent;
    } else {
      return <Skeleton.Input active />;
    }
  }

  return <div className="findora-switch-asset-name">{getAssetListSelect()}</div>;
};

SwitchAssetName.propTypes = {
  /** 创建资产回调结果事件 */
  onResult: PropTypes.func,
  /** 当前钱包地址 */
  address: PropTypes.string,
  /** 是否待增发 */
  isIssued: PropTypes.bool,
};

SwitchAssetName.defaultProps = {
  onResult: () => {},
  address: '',
  isIssued: false,
};

export default observer(SwitchAssetName);
