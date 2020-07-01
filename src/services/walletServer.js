/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-01 11:46:07
 * @ Description: wallet info api , 钱包信息接口
 */

import webNetWork from './webNetWork';

/**
 * @category Services
 * @class
 */
const walletServer = {
  /**
   * @description 查看钱包地址余额
   * @param string address - 钱包地址
   * @returns {object}
   */
  async getBlance(param) {
    console.log('余额表单数据:', param);
    const { walletInfo } = param;
    const result = await webNetWork.getOwnedSids(walletInfo.publickey);
    console.log('Sids 数据: ', result);

    return result;
  },
};

export default walletServer;
