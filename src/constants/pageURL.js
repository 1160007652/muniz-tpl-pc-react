/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-11 13:08:42
 * @ Description: 路由定义, 配置文件
 */

const pageURL = {
  home: '/', // popup.html 首页
  walletList: '/walletList', // 导入的钱包列表
  createwallet: '/createWallet', // 首页 - 创建钱包
  restoreWallet: '/restoreWallet', // 回复钱包
  setting: '/setting', // 设置
  downKeyStore: '/downKeyStore', // 下载KeyStore
  walletInfo: '/walletInfo', // 钱包信息
  send: '/send', // 交易
  transactions: '/transactions', // 交易记录
  createToken: '/createToken', // 生成Token
  deployContract: '/deployContract', // 部署合约
  contractTest: '/contractTest', // 测试合约
  empty: '*', // 404 空页面
};

export default pageURL;
