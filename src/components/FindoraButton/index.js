/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-16 09:55:58
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

/**
 * FindoraButton 纯组件
 * @component
 * @example <caption>组件案例</caption>
 * const onCLick = ()=>{console.log('点击了按钮')}
 * <Box><FindoraButton onCLick={onCLick} >点击按钮</FindoraButton></Box>
 * return (
 *   <FindoraButton onCLick={onCLick} >点击按钮</FindoraButton>
 * )
 *
 */
const FindoraButton = ({ children, onClick }) => {
  return (
    <div className="findora-button" onClick={onClick}>
      {children}
    </div>
  );
};

FindoraButton.propTypes = {
  /** 点击事件 */
  onClick: PropTypes.function,
};

FindoraButton.defaultProps = {
  onClick: () => {},
};
export default FindoraButton;
