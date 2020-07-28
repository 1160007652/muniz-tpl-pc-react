/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 15:01:51
 * @ Description: 钱包导航, Header组件
 */

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import intl from 'react-intl-universal';
import { FormOutlined, CheckOutlined } from '@ant-design/icons';

import './index.less';

/**
 * WalletName 钱包名称展示组件, 以及编辑功能
 * @component
 */
const WalletName = ({ data, onChangeName, isShowEdit }) => {
  const [name, setName] = useState(data.name);
  const [isEdit, setEdit] = useState(false);
  /**
   * Input onChange 事件
   */
  function handleClickName(e) {
    e.stopPropagation();
    setName(e.target.value);
  }
  /**
   * 确认修改的钱包名称
   */
  function handleClickEnter(e) {
    e.stopPropagation();
    setEdit(false);
    onChangeName(name);
  }
  /**
   * 显示钱包名称编辑框
   */
  function handleChangeWalletName(e) {
    e.stopPropagation();
    setEdit(true);
  }
  return (
    <div className="wallet-name" onClick={(e) => isShowEdit && e.stopPropagation()}>
      {isEdit ? (
        <Input
          placeholder={intl.get('wallet_name_edit_placeholder')}
          style={{ width: '168px' }}
          value={name}
          onChange={handleClickName}
          onPressEnter={handleClickEnter}
          addonAfter={<CheckOutlined onClick={handleClickEnter} />}
        />
      ) : (
        <Fragment>
          <span>{name}</span>
          {isShowEdit ? <FormOutlined onClick={handleChangeWalletName} /> : null}
        </Fragment>
      )}
    </div>
  );
};

WalletName.propTypes = {
  /** 数据源 */
  data: PropTypes.object,
  /** 是否显示编辑框 */
  isShowEdit: PropTypes.bool,
  /** 点击事件 */
  onChangeName: PropTypes.func,
};

WalletName.defaultProps = {
  data: { name: '' },
  isShowEdit: false,
  onChangeName: () => {},
};

export default WalletName;
