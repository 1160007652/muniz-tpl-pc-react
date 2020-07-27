/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-17 14:27:27
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

/**
 * FindoraBoxView 纯组件, 用于包裹输入组件, 产出带标题, 展示信息的组件 s
 * @component
 * @example <caption>组件案例</caption>
 *
 * return(
 *  <FindoraBoxView title="标题" ><div style={{ backGround: 'green' }}>测试组件</div></FindoraBoxView>
 * )
 */
const FindoraBoxView = ({ children, title, titleDirection, isRow, className, style }) => {
  return (
    <div className={classNames('findora-box-view', className, { 'box-row': isRow })} style={style}>
      <div className={classNames('title', titleDirection)}>{title}</div>
      <div className="container">{children}</div>
    </div>
  );
};

FindoraBoxView.propTypes = {
  /** 点击事件 */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 是否横行展示 */
  isRow: PropTypes.bool,
  /** 标题显示位置 */
  titleDirection: PropTypes.oneOf(['top', 'center', 'bottom']),
};

FindoraBoxView.defaultProps = {
  title: '',
  isRow: false,
  titleDirection: 'center',
};

export default FindoraBoxView;
