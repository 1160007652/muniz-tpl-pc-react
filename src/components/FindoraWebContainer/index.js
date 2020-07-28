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
 * FindoraWebContainer 纯组件, 创建资产、增发资产承载容器页面的通用页面模型
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
/**
 * Findora web container pure component for creating and issuing assets.
 * @component
 * @example <caption>Component Example</caption>
 * return (
 *  <FindoraWebContainer title="Demo Page">
 *    <div style={{ height: '100px', background: '#eee', paddingTop: '20px' }}>
 *       Here's the information about the Demo Page.
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
  /** Page title */
  title: PropTypes.string,
};

FindoraWebContainer.defaultProps = {
  title: '',
};

export default FindoraWebContainer;
