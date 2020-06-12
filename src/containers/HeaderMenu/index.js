/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-10 16:12:02
 * @ Description: 钱包菜单组件
 */

import React from 'react';
import { Menu, Dropdown, message } from 'antd';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
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
    page: pageURL.walletList,
    icon: <WalletInfoIcon />,
    title: 'Wallets',
    isShow: true,
  },
  {
    page: pageURL.createwallet,
    icon: <CreateWalletIcon />,
    title: 'Create Wallet',
    isShow: true,
  },
  {
    page: pageURL.restoreWallet,
    icon: <RestoreWalletIcon />,
    title: 'Import Wallet',
    isShow: true,
  },
  {
    page: pageURL.setting,
    icon: <SettingIcon />,
    title: 'Setting',
    isShow: true,
  },
  {
    page: pageURL.send,
    icon: <SendIcon />,
    title: 'sidebar_send',
    isShow: false,
  },
  {
    page: pageURL.transactions,
    icon: <TransactionsIcon />,
    title: 'sidebar_transactions',
    isShow: false,
  },
  {
    page: pageURL.createToken,
    icon: <CreateTokenIcon />,
    title: 'sidebar_createtoken',
    isShow: false,
  },
  {
    page: pageURL.deployContract,
    icon: <DeployContractIcon />,
    title: 'sidebar_deploycontract',
    isShow: false,
  },
  {
    page: pageURL.contractTest,
    icon: <ContractTestIcon />,
    title: 'sidebar_contracttest',
    isShow: false,
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
                <Link to={item.page}>
                  {item.icon}
                  <span style={{ marginLeft: '8px' }}>{item.title}</span>
                </Link>
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
