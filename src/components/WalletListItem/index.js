/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 18:02:51
 * @ Description: 钱包导航, Header组件
 */

import React, { useState } from 'react';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import classNames from 'classNames';
import { NetworkLarge } from 'react-identicon-variety-pack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import './index.less';

/**
 * WalletListItem 纯组件, 渲染钱包列表使用
 * @component
 * @example <caption>组件案例</caption>
 * const data = [{ name: 'Alice1', address: '1234567==' }]
 * const onClick = ()=> {alert('点击成功')}
 * const
 * return (
 *   <WalletListItem data={data} onCLick={onCLick} />
 * )
 *
 */
const WalletListItem = ({ data, style, className, onClick }) => {
  const [isCopy, setCopy] = useState(false);
  function handleClickCopyAddress() {
    setCopy(true);
    const timer = setTimeout(() => {
      setCopy(false);
      clearTimeout(timer);
    }, 1000);
  }
  return (
    <div className={classNames('wallet-list-item', className)} style={style} onClick={onClick}>
      <NetworkLarge className="wallet-list-logo" size={48} seed={data.address} circle />

      <div className="wallet-list-text">
        <h3>{data.name}</h3>
        <div className="wallet-address">
          <span>{`${String(data.address).substr(0, 35)}...`}</span>
          <CopyToClipboard text={data.address} onCopy={handleClickCopyAddress}>
            {isCopy ? (
              <CheckOutlined
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            ) : (
              <CopyOutlined
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            )}
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

WalletListItem.propTypes = {
  /** 数据源 */
  data: Proptyps.arrayOf(Proptyps.object),
  /** 点击事件 */
  onCLick: PropTypes.function,
};

WalletListItem.defaultProps = {
  data: [{ name: 'Alice', address: '1234567==' }],
  onCLick: () => {},
};

export default WalletListItem;
