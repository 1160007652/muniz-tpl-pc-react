/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-05-26 01:27:10
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 14:09:33
 * @ Description: 多语言状态Mobx 模块
 */

import { action, observable, when } from 'mobx';
import intl from 'react-intl-universal';

/**
 * 交易管理Store
 * @category MobxStore
 */
class TransactionStore {
  constructor() {
    // this.init();
  }

  /**
   * 交易记录数据
   *
   * { 钱包地址: { data: 钱包交易数据, pages}}
   * */
  @observable dataList = {};

  /** 切换多语言方法 */
  @action getTransactionData({ address, data, page = 0 }) {
    let dataList = this.dataList[address]?.data || [];

    if (page > 0) {
      dataList = dataList.concat(data);
    } else {
      dataList = data;
    }

    this.dataList[address] = { data: dataList, page };
  }
}

export default TransactionStore;
