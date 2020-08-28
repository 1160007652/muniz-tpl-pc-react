/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 10:20:08
 * @ Description: 导入钱包后的列表组件
 */

import React, { Fragment } from 'react';
import { MobXProviderContext, observer } from 'mobx-react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';

import WalletListItem from '_components/WalletListItem';
// import FindoraButton from '_components/FindoraButton';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import pageURL from '_constants/pageURL';

import './index.less';

const WalletListView = ({ dataList, isFlipCard }) => {
  const hirstory = useHistory();
  const walletStore = React.useContext(MobXProviderContext).walletStore;

  function handleClickItem(result) {
    return () => {
      walletStore.setWalletInfo(result);
      if (!isFlipCard) {
        hirstory.push(pageURL.walletInfo);
      }
    };
  }
  /** 支持扩展的卡片 */
  function WalletItemExt(item) {
    return (
      <div className="wallet-item-box">
        <WalletListItem
          className={classNames('wallet-item', {
            'select-wallet-item': item.publickey === walletStore.walletInfo.publickey,
          })}
          data={item}
          onClick={handleClickItem(item)}
          style={{ marginBottom: '12px' }}
        />
        <div className="wallet-item-ext">
          <Button className="mb20">{intl.get('wallet_export_title')}</Button>
          <Button className="mb20">{intl.get('wallet_remove_title')}</Button>
        </div>
      </div>
    );
  }
  /** 不支持扩展的卡片 */
  function WalletItem(item) {
    return (
      <WalletListItem
        className={classNames('wallet-item', {
          'select-wallet-item': item.publickey === walletStore.walletInfo.publickey,
        })}
        data={item}
        onClick={handleClickItem(item)}
        style={{ marginBottom: '12px' }}
      />
    );
  }
  return (
    <div className="findora-wallet-list">
      {dataList &&
        dataList.map((item, index) => {
          return (
            <Fragment key={`${item.publickey}${index}`}>{isFlipCard ? WalletItemExt(item) : WalletItem(item)}</Fragment>
          );
        })}
    </div>
  );
};

WalletListView.propTypes = {
  /** 钱包列表数据源 */
  dataList: PropTypes.array,
  /** 是否支持翻转卡片 */
  isFlipCard: PropTypes.bool,
};

WalletListView.defaultProps = {
  dataList: [],
  isFlipCard: false,
};

export default observer(WalletListView);
