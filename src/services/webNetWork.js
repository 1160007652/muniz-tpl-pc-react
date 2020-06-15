/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 17:46:03
 * @ Description: 描述文案
 * @category Services
 * @module webNetWork
 */

import NetWork from '_src/lib/network';

/**
 * 请求地址
 */
const HOST = 'testnet.findora.org';
/**
 * 提交端口
 */
const SUBMISSION_PORT = '8669';
/**
 * 分类账本端口
 */
const LEDGER_PORT = '8668';
/**
 * 查询端口
 */
const QUERY_PORT = '8667';
/**
 * 网络协议端口
 */
const PROTOCOL = 'https';

export default new NetWork(PROTOCOL, HOST, QUERY_PORT, SUBMISSION_PORT, LEDGER_PORT);
