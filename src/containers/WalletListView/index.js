/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 17:43:40
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
          return <WalletListItem key={item.address} data={item.views} style={{ marginBottom: '12px' }} />;
        })}
    </div>
  );
};

export default WalletListView;
