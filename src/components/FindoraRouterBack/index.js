/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-25 10:53:52
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import './index.less';

/**
 * FindoraRouterBack 纯组件, 返回上一级路由
 * @component
 * @example <caption>组件案例</caption>
 * const title = "导航标题"
 * const menu = <div>组件库</div>
 * return (
 *   <FindoraHeader title={title} menu={menu}/>
 * )
 *
 */
const FindoraRouterBack = ({ title, menu }) => {
  const history = useHistory();
  function handleClickBack() {
    history.goBack();
  }
  return (
    <div className="findora-router-back" onClick={handleClickBack}>
      <LeftOutlined /> Back
    </div>
  );
};

export default FindoraRouterBack;
