/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-09 19:27:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-13 22:30:46
 * @ Description: 路由定义, 配置文件
 */

/**
 * 路由配置文件
 * @readonly
 * @enum {string}
 */
const pageURL = {
  /** 首页
   * @tutorial tutorial2
   */
  home: '/',
  /** 导入的钱包列表 */
  walletList: '/walletList',
  /** 创建钱包页面 */
  createwallet: '/createWallet',
  /** 恢复钱包页面 */
  restoreWallet: '/restoreWallet',
  /** 设置页面 */
  setting: '/setting',
  /** 下载KeyStore页面 */
  downKeyStore: '/downKeyStore',
  /** 钱包信息页面 */
  walletInfo: '/walletInfo',
  /** 交易页面 */
  send: '/send',
  /** 交易记录页面 */
  transactions: '/transactions',
  /** 生成Token页面 */
  createToken: '/createToken',
  /** 部署合约页面 */
  deployContract: '/deployContract',
  /** 测试合约页面 */
  contractTest: '/contractTest',
  /** 404页面 */
  empty: '*',
};

export default pageURL;
