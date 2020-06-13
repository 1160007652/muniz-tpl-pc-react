/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-13 17:36:42
 * @ Description: wallet info api , 钱包信息接口
 */

import webNetWork from './webNetWork';

const walletServer = {
  /**
   * @author Muniz
   * @description 查看钱包地址余额
   * @param string address - 钱包地址
   * @returns {object}
   */
  async getBlance(address) {
    const result = await webNetWork.getOwnedSids(address);
    return result;
  },
};

export default walletServer;
