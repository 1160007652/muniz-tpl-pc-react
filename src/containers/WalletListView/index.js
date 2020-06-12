/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 16:17:00
 * @ Description: 导入钱包后的列表组件
 */

import React from 'react';
import WalletListItem from '_components/WalletListItem';

import './index.less';

const WalletListView = ({ dataList }) => {
  return (
    <div className="findora-wallet-list">
      {dataList &&
        dataList.map((item) => {
          return <WalletListItem data={item} style={{ marginBottom: '12px' }} />;
        })}
    </div>
  );
};

export default WalletListView;
