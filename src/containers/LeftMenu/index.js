/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 16:51:00
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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
import pageURL from '_constants/pageURL';

import './index.less';

const routers = [
  {
    page: pageURL.help,
    icon: <InfoCircleOutlined />,
    title: 'menu_application',
    isShow: true,
    children: [
      {
        page: pageURL.help,
        icon: <InfoCircleOutlined />,
        title: 'menu_about',
        isShow: true,
      },
      {
        page: pageURL.setting,
        icon: <SettingIcon />,
        title: 'menu_setting',
        isShow: true,
      },
    ],
  },
  {
    page: pageURL.home,
    icon: <WalletInfoIcon />,
    title: 'menu_wallet',
    isShow: true,
    children: [
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
    ],
  },
  {
    page: pageURL.createAsset,
    icon: <CreateTokenIcon />,
    title: 'menu_asset',
    isShow: true,
    children: [
      {
        page: pageURL.createAsset,
        icon: <CreateTokenIcon />,
        title: 'menu_asset_create1',
        isShow: true,
      },
      {
        page: pageURL.issueAsset,
        icon: <SendIcon />,
        title: 'menu_asset_issue',
        isShow: true,
      },
      {
        page: pageURL.send,
        icon: <SendIcon />,
        title: 'menu_asset_send',
        isShow: true,
      },
      {
        page: pageURL.transactions.replace(':action', 'detail-loading'),
        icon: <TransactionsIcon />,
        title: 'menu_asset_transactions',
        isShow: true,
      },
    ],
  },
];

const LeftMenu = () => {
  const RouterLocation = useLocation();
  return (
    <Menu
      className="left-menu-box"
      // defaultOpenKeys={[/(^\/.*?(?=[\/$]))/.exec(RouterLocation.pathname)[0]]}
      selectedKeys={[RouterLocation.pathname]}
      mode="inline"
    >
      {routers.map(
        (item) =>
          item.isShow && (
            <Menu.SubMenu key={item.page} icon={item.icon} title={intl.get(item.title)}>
              {item?.children?.map((subItem) => {
                return (
                  <Menu.Item key={subItem.page} className="menu-item">
                    <Link to={subItem.page}>
                      {subItem.icon}
                      <span style={{ marginLeft: '8px' }}>{intl.get(subItem.title)}</span>
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.SubMenu>
          ),
      )}
    </Menu>
  );
};

export default LeftMenu;
