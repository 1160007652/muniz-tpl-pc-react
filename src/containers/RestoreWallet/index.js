/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 16:10:56
 * @ Description: 恢复钱包、导入钱包组件
 */

import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import FindoraHeader from '_components/FindoraHeader';
import pageURL from '_constants/pageURL';

import './index.less';

class RestoreWallet extends React.Component {
  renderCancelComponent = () => {
    return (
      <Link to={pageURL.home} className="menu-cancel">
        Cancel
      </Link>
    );
  };
  render() {
    return (
      <div className="findora-wallet-empty">
        <FindoraHeader title="Create Wallet" menu={this.renderCancelComponent()} />
      </div>
    );
  }
}

export default RestoreWallet;
