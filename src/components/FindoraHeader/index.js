/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-25 10:53:45
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';

import FindoraRouterBack from '../FindoraRouterBack';

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
const FindoraHeader = ({ title, menu, isShowBack }) => {
  return (
    <div className="findora-header">
      <div className="header-area">
        {isShowBack ? <FindoraRouterBack /> : <div className="findora-logo">Findora</div>}

        <div className="header-menu">{menu}</div>
      </div>
      <div className="page-title">{title}</div>
    </div>
  );
};

FindoraHeader.propTypes = {
  /** 菜单 */
  menu: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 标题 */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /** 是否显示返回按钮 */
  isShowBack: PropTypes.bool,
};

FindoraHeader.defaultProps = {
  menu: null,
  title: null,
  isShowBack: false,
};

export default FindoraHeader;
