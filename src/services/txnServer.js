/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-07 14:50:16
 * @ Description: wallet info api , 交易记录接口
 *
 */

import webNetWork from './webNetWork';

/**
 * @category Services
 * @class
 */
const txnServer = {
  /**
   * @author Muniz
   * @description 获取交易信息
   * @param {param} address - 转账需要的表单数据
   *
   * @return {object}
   */
  async getTxnList(param) {
    console.log('交易列表');
    console.log('交易-表单数据: ', param);
    const { walletInfo } = param;
    const findoraWasm = await import('wasm');
    const utxosids = await webNetWork.getRelatedSids(walletInfo.publickey);
    console.log(utxosids);
  },
};

/** The name of the module. */
export default txnServer;
