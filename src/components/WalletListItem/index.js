/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 22:14:12
 * @ Description: 钱包导航, Header组件
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CopyOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import classNames from 'classNames';
import { NetworkLarge } from 'react-identicon-variety-pack';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import WalletName from '../WalletName';

import './index.less';

/**
 * WalletListItem 纯组件, 渲染钱包列表使用
 * @component
 * @example <caption>组件案例</caption>
 * const data = [{ name: 'Alice1', address: '1234567==' }]
 * const onClick = ()=> {alert('点击成功')}
 * const
 * return (
 *   <WalletListItem data={data} onClick={onClick} />
 * )
 *
 */
const WalletListItem = ({ data, isShowEdit, style, className, onClick, onChangeName }) => {
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
      <NetworkLarge className="wallet-list-logo" size={48} seed={data.publickey} circle />
      <div className="wallet-list-text">
        <WalletName data={{ name: data.keyStore.name }} isShowEdit={isShowEdit} onChangeName={onChangeName} />
        <div className="wallet-address">
          <span>{`${String(data.publickey).substr(0, 35)}...`}</span>
          <CopyToClipboard text={data.publickey} onCopy={handleClickCopyAddress}>
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
  data: PropTypes.object,
  /** 是否显示名称编辑框 */
  isShowEdit: PropTypes.bool,
  /** 点击事件 */
  onClick: PropTypes.func,
  /** 修改钱包名称事件 */
  onChangeName: PropTypes.func,
};

WalletListItem.defaultProps = {
  data: [{ keyStore: { name: 'Alice' }, publickey: '1234567==' }],
  isShowEdit: false,
  onClick: () => {},
  onChangeName: () => {},
};

export default WalletListItem;
