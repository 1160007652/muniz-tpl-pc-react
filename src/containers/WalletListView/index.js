/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 21:26:17
 * @ Description: 导入钱包后的列表组件
 */

import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';

import WalletListItem from '_components/WalletListItem';
import { useHistory } from 'react-router-dom';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletListView = ({ dataList }) => {
  const hirstory = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  function handleClickItem(result) {
    return () => {
      walletStore.setWalletInfo(result.views);
      hirstory.push(pageURL.walletInfo);
    };
  }
  return (
    <div className="findora-wallet-list">
      {dataList &&
        dataList.map((item) => {
          return (
            <WalletListItem
              key={`${item.address}${item.name}`}
              data={item.views}
              onClick={handleClickItem(item)}
              style={{ marginBottom: '12px' }}
            />
          );
        })}
    </div>
  );
};

export default observer(WalletListView);
