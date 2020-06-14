/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-13 20:43:37
 * @ Description: wallet info api , 钱包信息接口
 *
 * @module my/pants
 * @see module:my/shirt
 */

import webNetWork from './webNetWork';

const sendServer = {
  /**
   * @author Muniz
   * @description 查看钱包地址余额
   * @param {string} address - 钱包地址
   *
   * @return {object}
   *
   * @example
   * getBlance(address)
   * =>
   * {blance: 0.2}
   */
  async getBlance(address) {
    const result = await webNetWork.getOwnedSids(address);
    return result;
  },
};

/** The name of the module. */
export default sendServer;
