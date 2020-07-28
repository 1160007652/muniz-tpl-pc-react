import { action, observable } from 'mobx';

/**
 * 交易管理Store
 * @category MobxStore
 */
/**
 * Store to manage transactions.
 * @category MobxStore
 */
class TransactionStore {
  /**
   * 交易记录数据
   * 模型: { 钱包地址: { data: 钱包交易数据, pages}}
   * */
  /**
   * Transaction data
   * structure: { address: { data: transaction data, pages}}
   * */
  @observable dataList = {};

  /**
   * 获取交易数据
   * @param {object} obj
   * @param {string} obj.address
   * @param {Array}  obj.data  最新的交易记录数据
   * @param {number} obj.page 页数
   * @example
   *
   * 如果page > 0, 插入到数组的尾位置
   * getTransactionData({address, data, page: 0})
   *
   * 如果page < 0, 插入到数组的首位置
   * getTransactionData({address, data, page: -2})
   *
   * 如果page <= 0, 首次获取数据覆盖数组
   * getTransactionData({address, data, page: -1})
   *
   *
   */
  /**
   * Gets transaction data
   * @param {object} obj
   * @param {string} obj.address - Wallet address.
   * @param {array}  obj.data - New transaction data.
   * @param {number} obj.page - Page.
   * @example
   *
   * If page > 0, adds to the tail of the array.
   * getTransactionData({address, data, page: 1})
   *
   * If page < 0, adds to the head of the array.
   * getTransactionData({address, data, page: -2})
   *
   * If page === 0, it's the first time getting the data, so directly assigns to the array.
   * getTransactionData({address, data, page: 0})
   *
   *
   */
  @action getTransactionData({ address, data, page = 0 }) {
    let dataList = this.dataList[address]?.data || [];

    if (page > 0) {
      dataList = dataList.concat(data);
    } else if (page === -2) {
      dataList.unshift(...data);
    } else {
      dataList = data;
    }

    this.dataList[address] = { data: dataList, page };
  }
}

export default TransactionStore;
