/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 14:58:41
 * @ Description: 钱包导航, Header组件
 */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import './index.less';

/**
 * FindoraRouterBack 纯组件, 返回上一级路由
 * @component
 * @example <caption>组件案例</caption>
 * return (
 *   <FindoraRouterBack />
 * )
 *
 */
/**
 * Findora component to go back to the previous route.
 */
const FindoraRouterBack = () => {
  const history = useHistory();
  function handleClickBack() {
    history.goBack();
  }
  return (
    <div className="findora-router-back" onClick={handleClickBack}>
      <LeftOutlined /> {intl.get('navigation_back')}
    </div>
  );
};

export default FindoraRouterBack;
