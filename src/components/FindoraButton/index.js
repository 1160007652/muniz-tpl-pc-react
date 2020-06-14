/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-14 11:58:28
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import './index.less';

/**
 * FindoraButton 纯组件
 * @namespace Component
 * @typedef {{children: Component, onCLick: onCLick}} ButtonProps
 * @type {React.StatelessComponent<ButtonProps>}
 * @param {object} props
 * @param {string} props.children - 子组件
 * @param {string} props.onCLick - 点击事件
 */
const FindoraButton = ({ children, onCLick }) => {
  return (
    <div className="findora-button" onClick={onCLick}>
      {children}
    </div>
  );
};

export default FindoraButton;
