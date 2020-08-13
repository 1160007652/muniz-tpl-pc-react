/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 11:19:19
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import intl from 'react-intl-universal';
import { InfoCircleOutlined } from '@ant-design/icons';

import {
  CreateWalletIcon,
  RestoreWalletIcon,
  WalletInfoIcon,
  SendIcon,
  TransactionsIcon,
  CreateTokenIcon,
  DeployContractIcon,
  ContractTestIcon,
  SettingIcon,
} from '_src/assets/icons/wallet_icons';
import pageURL from '../../constants/pageURL';

import './index.less';

const routers = [
  {
    page: pageURL.home,
    icon: <WalletInfoIcon />,
    title: 'menu_home',
    isShow: true,
  },
  {
    page: pageURL.createwallet,
    icon: <CreateWalletIcon />,
    title: 'menu_wallet_create',
    isShow: true,
  },
  {
    page: pageURL.restoreWallet,
    icon: <RestoreWalletIcon />,
    title: 'menu_wallet_import',
    isShow: true,
  },
  {
    page: pageURL.setting,
    icon: <SettingIcon />,
    title: 'menu_setting',
    isShow: true,
  },
  {
    page: pageURL.createAsset,
    icon: <CreateTokenIcon />,
    title: 'menu_asset_create',
    isShow: true,
  },
  {
    page: pageURL.help,
    icon: <InfoCircleOutlined />,
    title: 'menu_about',
    isShow: true,
  },
];

class HeaderMenu extends React.Component {
  render() {
    const menu = (
      <Menu className="menu-box">
        {routers.map(
          (item) =>
            item.isShow && (
              <Menu.Item key={item.page} className="menu-item">
                {item.page === pageURL.createAsset ? (
                  <a href={`${chrome.runtime.getURL('popup.html')}#${item.page}`} target="_blank">
                    {item.icon}
                    <span style={{ marginLeft: '8px' }}>{intl.get(item.title)}</span>
                  </a>
                ) : (
                  <Link to={item.page}>
                    {item.icon}
                    <span style={{ marginLeft: '8px' }}>{intl.get(item.title)}</span>
                  </Link>
                )}
              </Menu.Item>
            ),
        )}
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight" trigger="click" overlayClassName="header-menu-antd">
        <MenuOutlined />
      </Dropdown>
    );
  }
}

export default HeaderMenu;
