/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 18:00:44
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import './index.less';

/**
 * FindoraHeader 纯组件
 * @component
 * @example <caption>组件案例</caption>
 * const title = "导航标题"
 * const menu = <div>组件库</div>
 * return (
 *   <FindoraHeader title={title} menu={menu}/>
 * )
 *
 */
const FindoraHeader = ({ title, menu }) => {
  return (
    <div className="findora-header">
      <div className="header-area">
        <div className="findora-logo">Findora</div>
        <div className="header-menu">{menu}</div>
      </div>
      <div className="page-title">{title}</div>
    </div>
  );
};

FindoraHeader.propTypes = {
  /** 菜单 */
  menu: Proptyps.oneOfType([Proptyps.string, PropTypes.element]),
  /** 标题 */
  title: Proptyps.oneOfType([Proptyps.string, PropTypes.element]),
};

FindoraHeader.defaultProps = {
  menu: <div>菜单</div>,
  title: '标题',
};

export default FindoraHeader;
