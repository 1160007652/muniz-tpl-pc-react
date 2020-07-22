/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-21 15:47:06
 * @ Description: wallet info api , 交易记录接口
 *
 */

import transactionsMerge from '_src/utils/transactionsMerge';

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
  /**
   * Gets the list of transactions
   * @param {json} param - Information needed to get the transactions
   */
  // TODO: what does the structure of param look like?
  async getTxnList(param) {
    console.groupCollapsed('======>   开始获取交易列表');

    const result = await transactionsMerge(param);

    console.log('result: ', result);
    console.groupEnd();
    return result;
  },
};

/** The name of the module. */
export default txnServer;
