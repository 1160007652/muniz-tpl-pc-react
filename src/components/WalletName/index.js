/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 22:13:30
 * @ Description: 钱包导航, Header组件
 */

import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { FormOutlined, CheckOutlined } from '@ant-design/icons';

import './index.less';

/**
 * WalletName 钱包名称展示组件, 以及编辑功能
 * @component
 * @example <caption>组件案例</caption>
 * const data = [{ name: 'Alice1', address: '1234567==' }]
 * const onClick = ()=> {alert('点击成功')}
 * const
 * return (
 *   <WalletListItem data={data} onClick={onClick} />
 * )
 *
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
          placeholder="Basic usage"
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
