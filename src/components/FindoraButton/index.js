/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 18:07:56
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

FindoraButton.defaultProps = {
  onCLick: () => {},
};
export default FindoraButton;
