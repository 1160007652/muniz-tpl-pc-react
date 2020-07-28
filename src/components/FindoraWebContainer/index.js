/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 20:06:32
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './index.less';

/**
 * FindoraWebContainer 纯组件, 在网页形式打开插件石, 的通用标题页面
 * @component
 * @example <caption>组件案例</caption>
 * return (
 *  <FindoraWebContainer title="演示页面">
 *    <div style={{ height: '100px', background: '#eee', paddingTop: '20px' }}>
 *       这里是关于显示页面的信息
 *    </div>
 *  </FindoraWebContainer>
 * )
 *
 */
const FindoraWebContainer = ({ children, title, className, style }) => {
  return (
    <div className={classNames('findora-web-container', className)} style={style}>
      <div className="web-container-title">{title}</div>
      {children}
    </div>
  );
};

FindoraWebContainer.propTypes = {
  /** 页面标题 */
  title: PropTypes.string,
};

FindoraWebContainer.defaultProps = {
  title: '',
};

export default FindoraWebContainer;
