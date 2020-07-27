/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 11:28:36
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';

import FindoraRouterBack from '../FindoraRouterBack';

import './index.less';

/**
 * FindoraHeader 纯组件
 * @component
 * @example <caption>可返回的导航</caption>
 * const title = "Findora wallet"
 * return (
 *   <FindoraHeader title={title} isShowBack={true}/>
 * )
 *
 * @example <caption>带logo的导航</caption>
 * const title = "Findora wallet"
 * return (
 *   <FindoraHeader title={title} isShowBack={false}/>
 * )
 *
 * @example <caption>带菜单的导航</caption>
 * const title = "Findora wallet";
 * return (
 *   <FindoraHeader title={title} isShowBack={false} menu={<div>menu</div>} />
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
