/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-14 14:06:04
 * @ Description: wallet info api , 钱包信息接口
 *
 */

import webNetWork from './webNetWork';

/**
 * @category Services
 * @class
 */
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
