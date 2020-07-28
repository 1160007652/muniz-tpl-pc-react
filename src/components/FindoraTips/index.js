/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-17 15:15:16
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tooltip } from 'antd';

import './index.less';

/**
 * FindoraTips 纯组件
 * @component
 * @example
 * return (
 *  <FindoraTips desc="有关标题的描述信息">标题</FindoraTips>
 * )
 */
/**
 * Findora component to provide tips.
 * @component
 * @example
 * return (
 *  <FindoraTips desc="Description about the title.">Title</FindoraTips>
 * )
 */
const FindoraTips = ({ children, desc, placement, className }) => {
  return (
    <div className={classNames('findora-tips', className)}>
      <Tooltip placement={placement} title={desc}>
        <span className="tips-txt">{children}</span>
      </Tooltip>
    </div>
  );
};

FindoraTips.propTypes = {
  /** 提示信息 */
  /** Tip description */
  desc: PropTypes.string,
  /** 提示对齐方式 */
  /** Tip placement */
  placement: PropTypes.string,
};

FindoraTips.defaultProps = {
  desc: '',
  placement: 'topLeft',
};

export default FindoraTips;
