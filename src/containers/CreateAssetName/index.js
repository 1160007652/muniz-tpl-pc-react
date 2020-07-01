/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 15:16:28
 * @ Description: 创建资产组件, 1、自定义创建短名称 - 映射到 长名称; 2、系统创建长名称
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Radio, Alert } from 'antd';
import intl from 'react-intl-universal';
import { useImmer } from 'use-immer';

import FindoraBoxView from '_components/FindoraBoxView';
import services from '_src/services';

import './index.less';

const CreateAssetName = ({ onResult }) => {
  const [isSelect, setSelect] = useState('default');

  // 系统生成 longName
  const [assetNameData, setAssetNameData] = useImmer({
    short: '',
    long: '',
  });

  // 自定义短名字 , 生成 longName
  const [assetNameDataCust, setAssetNameDataCust] = useImmer({
    short: '',
    long: '',
  });

  useEffect(() => {
    /** 初始化资产名称 */
    services.assetServer.getAssetNameLong().then((value) => {
      setAssetNameData((state) => {
        state.long = value;
      });
    });
  }, []);

  /** 监听默认属性变化, 自动触发保存onResult事件 */
  useEffect(() => {
    onResult(assetNameData);
  }, [assetNameData]);

  /** 监听自定义属性变化, 自动触发保存onResult事件 */
  useEffect(() => {
    onResult(assetNameData);
  }, [assetNameDataCust]);

  /** 监听面板属性变化, 自动触发保存onResult事件 */
  useEffect(() => {
    if (isSelect === 'default') {
      onResult(assetNameData);
    } else {
      onResult(assetNameDataCust);
    }
  }, [isSelect]);

  /** 切换Asset Name 创建名称方式 */
  function handleSelectAssetTab(e) {
    setSelect(e.target.value);
  }

  /** 默认资产短名字, 修改事件 */
  function handleChangeShortName(e) {
    e.persist();
    setAssetNameData((state) => {
      state.short = e.target.value;
    });
  }

  /** 自定义资产短名字, 修改事件 */
  function handleChangeShortNameCust(e) {
    e.persist();
    setAssetNameDataCust((state) => {
      state.short = e.target.value;
    });
  }

  /** 自定义, 根据shortName 生成 longName */
  function handleGenerateLongName(e) {
    e.persist();
    setAssetNameDataCust((state) => {
      state.long = state.short;
    });
  }

  function defaultAssetName() {
    return (
      <div className="asset-name-box">
        <Alert
          message={intl.get('notice')}
          description={intl.get('asset_name_create_default_notice')}
          type="info"
          showIcon
          style={{ marginBottom: '25px', background: '#EEE2FF' }}
        />

        <FindoraBoxView title={intl.get('asset_name_long')} isRow className="long-name">
          {assetNameData.long}
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name_short')} isRow>
          <Input
            placeholder={intl.get('asset_name_short_placeholder')}
            value={assetNameData.short}
            onChange={handleChangeShortName}
          />
        </FindoraBoxView>
      </div>
    );
  }

  function customizeAssetName() {
    return (
      <div className="asset-name-box">
        <Alert
          message={intl.get('notice')}
          description={intl.get('asset_name_create_customize_notice')}
          type="info"
          showIcon
          style={{ marginBottom: '25px', background: '#EEE2FF' }}
        />
        <FindoraBoxView title={intl.get('asset_name_short')} isRow>
          <div className="generate-name">
            <Input
              placeholder={intl.get('asset_name_short_placeholder')}
              value={assetNameDataCust.short}
              onChange={handleChangeShortNameCust}
            />
            <div className="generate-name-btn" onClick={handleGenerateLongName}>
              {intl.get('asset_name_generate')}
            </div>
          </div>
        </FindoraBoxView>
        <FindoraBoxView title={intl.get('asset_name_long')} isRow className="long-name">
          {assetNameDataCust.long}
        </FindoraBoxView>
      </div>
    );
  }

  function createAssetName() {
    return (
      <div className="findora-create-asset-name">
        <Radio.Group value={isSelect} buttonStyle="solid" onChange={handleSelectAssetTab}>
          <Radio value="default">{intl.get('asset_name_type_default')}</Radio>
          <Radio value="customize" disabled>
            {intl.get('asset_name_type_customize')}
          </Radio>
        </Radio.Group>
        {isSelect === 'default' ? defaultAssetName() : customizeAssetName()}
      </div>
    );
  }
  /** 显示资产页面,切换资产事件 */
  function handleSelectAssetName(value) {
    setAssetNameLong(value);

    /** 触发onResult事件 */
    const result = assetList.filter((item) => item.long === value);
    onShowResult(result.length > 0 ? result[0] : {});
  }
  return createAssetName();
};

CreateAssetName.propTypes = {
  /** 创建资产回调结果事件 */
  onResult: PropTypes.func,
};

CreateAssetName.defaultProps = {
  onResult: () => {},
};

export default CreateAssetName;
