/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-23 19:55:44
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
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
    page: pageURL.createAsset,
    icon: <CreateTokenIcon />,
    title: 'Create Asset',
    isShow: true,
  },
  {
    page: pageURL.issueAsset,
    icon: <SendIcon />,
    title: 'Issue Asset',
    isShow: true,
  },
];

const LeftMenu = () => {
  const RouterLocation = useLocation();

  return (
    <Menu className="left-menu-box" selectedKeys={[RouterLocation.pathname]}>
      {routers.map(
        (item) =>
          item.isShow && (
            <Menu.Item key={item.page} className="menu-item">
              <Link to={item.page}>
                {item.icon}
                <span style={{ marginLeft: '8px' }}>{item.title}</span>
              </Link>
            </Menu.Item>
          ),
      )}
    </Menu>
  );
};

export default LeftMenu;
