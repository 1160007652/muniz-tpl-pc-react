/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-14 13:41:16
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

/**
 * FindoraButton 纯组件
 * @component
 * @example <caption>Using second component inside</caption>
 * const onCLick = ()=>{console.log('点击了按钮')}
 * return (
 *   <FindoraButton onCLick={onCLick} >点击按钮</FindoraButton>
 * )
 *
 */
const FindoraButton = ({ children, onCLick }) => {
  return (
    <div className="findora-button" onClick={onCLick}>
      {children}
    </div>
  );
};

FindoraButton.propTypes = {
  /** 点击事件 */
  onCLick: PropTypes.function,
};

export default FindoraButton;
