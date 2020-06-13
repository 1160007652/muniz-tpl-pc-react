/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-13 17:27:56
 * @ Description: wallet info api , 钱包信息接口
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

export default sendServer;
