/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 17:04:07
 * @ Description: 导入钱包后的列表组件
 */

import React from 'react';
import { MobXProviderContext, observer } from 'mobx-react';

import WalletListItem from '_components/WalletListItem';
import { useHistory } from 'react-router-dom';
import pageURL from '_constants/pageURL';

import './index.less';
import { data } from 'autoprefixer';

const WalletListView = ({ dataList }) => {
  const hirstory = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  function handleClickItem(result) {
    return () => {
      walletStore.setWalletInfo(result);
      hirstory.push(pageURL.walletInfo);
    };
  }
  function handleChangeWalletName(index) {
    return (name) => {
      const newDataList = dataList;
      newDataList[index].keyStore.name = name;
      walletStore.importWallet({ walletList: newDataList });
    };
  }
  return (
    <div className="findora-wallet-list">
      {dataList &&
        dataList.map((item, index) => {
          return (
            <WalletListItem
              key={`${item.address}${item.name}${index}`}
              data={item}
              onClick={handleClickItem(item)}
              style={{ marginBottom: '12px' }}
              onChangeName={handleChangeWalletName(index)}
            />
          );
        })}
    </div>
  );
};

export default observer(WalletListView);
