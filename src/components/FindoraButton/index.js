/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 11:41:09
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

/**
 * FindoraButton 纯组件
 * @component
 * @example <caption>可用状态</caption>
 * const handleOnclick = ()=>{alert('findora-button')}
 * return (
 *   <FindoraButton onClick={handleOnclick}>点击按钮</FindoraButton>
 * )
 * @example <caption>禁用状态</caption>
 * return (
 *   <FindoraButton disabled>点击按钮</FindoraButton>
 * )
 *
 */
/**
 *
 * Findora button pure component.
 * @component
 * @example <caption>Enabled Status</caption>
 * const handleOnclick = ()=>{alert('findora-button')}
 * return (
 *   <FindoraButton onClick={handleOnclick}>Button</FindoraButton>
 * )
 * @example <caption>Disabled Status</caption>
 * return (
 *   <FindoraButton disabled>Button</FindoraButton>
 * )
 *
 */
const FindoraButton = ({ children, onClick, className, disabled }) => {
  return (
    <div
      className={classNames('findora-button', className, { disabled: disabled })}
      onClick={disabled ? () => {} : onClick}
    >
      {children}
    </div>
  );
};

FindoraButton.propTypes = {
  /** 点击事件 */
  /** Click event */
  onClick: PropTypes.func,
};

FindoraButton.defaultProps = {
  onClick: () => {},
};

export default FindoraButton;
