/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 18:09:27
 * @ Description: 路由定义, 配置文件
 */

/**
 * 路由配置文件
 * @readonly
 * @enum {string}
 */
/**
 * Route configuration.
 * @readonly
 * @enum {string}
 */
const pageURL = {
  /** 关闭钱包 */
  /** closeWallet page*/
  closeWallet: '/closeWallet',
  /** 声明 */
  /** statement page*/
  statement: '/',
  /** 关于页面 */
  /** Help page */
  help: '/help',
  /** 导入的钱包列表 */
  /** Imported wallets page */
  walletList: '/walletList',
  /** 创建钱包页面 */
  /** Wallet creation page */
  createwallet: '/createWallet',
  /** 恢复钱包页面 */
  /** Wallet restoration page */
  restoreWallet: '/restoreWallet',
  /** 设置页面 */
  /** Setting page */
  setting: '/setting',
  /** 下载KeyStore页面 */
  /** Keystore download page */
  downKeyStore: '/downKeyStore',
  /** 钱包信息页面 */
  /** Wallet information page */
  walletInfo: '/walletInfo',
  /** 转账页面 */
  /** Asset transfer page */
  send: '/send/',
  /** 转账详情页面 */
  /** Transfer details page */
  sendConfrim: '/sendConfrim',
  /** 交易记录页面 */
  /** Transaction page */
  transactions: '/transactions/:action',
  /** 交易记录详情页面 */
  /** Transaction details page */
  transactionsDetail: '/transactionsDetail',
  /** 资产信息审核页面, 包含 生成资产、 增发资产 信息审核 */
  /** Asset confirmation page, for creating, issuing and verifying assets */
  assetConfrim: '/assetConfrim/:actionType',
  /** 生成资产页面 */
  /** Asset creation page */
  createAsset: '/createAsset',
  /** 增发资产页面 */
  /** Asset issuance page */
  issueAsset: '/issueAsset',
  /** 生成Token页面 */
  /** Token generation page */
  createToken: '/createToken',
  /** 部署合约页面 */
  /** Contract deployment page */
  deployContract: '/deployContract',
  /** 测试合约页面 */
  /** Contract testing page */
  contractTest: '/contractTest',
  /** 404页面 */
  /** 404 (Empty) page */
  empty: '*',
};

export default pageURL;
