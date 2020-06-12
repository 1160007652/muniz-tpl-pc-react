/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-02 17:20:42
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-04 17:17:04
 * @ Description: NetWork 网络请求 切换环境 库
 */

import axios from '_src/dataProxy';

class Network {
  /**
   * Creates an new Network object.
   * @param {string} protocol - Network protocol (e.g. http).
   * @param {string} host - Hostname (e.g. `localhost` or `testnet.findora.org`).
   * @param {int} queryPort - Query server port.
   * @param {int} submitPort - Submission server port.
   * @param {int} ledgerPort - Ledger server port.
   * @constructor
   */

  /**
   * 创建一个新的网络对象。
   * @param {string} protocol - 网络协议（例如http）。
   * @param {string} host - 主机名（例如`localhost'或`testnet.findora.org`）。
   * @param {int} queryPort - 查询服务器端口。
   * @param {int} SubmitPort - 提交服务器端口。
   * @param {int} ledgerPort - 分类帐服务器端口。
   * @构造函数
   */
  constructor(protocol, host, queryPort, submitPort, ledgerPort) {
    this.config = {
      protocol,
      host,
      queryPort,
      submitPort,
      ledgerPort,
    };
  }

  getSubmitRoute() {
    return `${this.config.protocol}://${this.config.host}:${this.config.submitPort}`;
  }

  getQueryRoute() {
    return `${this.config.protocol}://${this.config.host}:${this.config.queryPort}`;
  }

  getLedgerRoute() {
    return `${this.config.protocol}://${this.config.host}:${this.config.ledgerPort}`;
  }

  /**
   * Given a transaction handle, returns a promise that will eventually provide the status of a transaction that
   * has been submitted to the submission server.
   * @param {handle} - Transaction handle string.
   */

  /**
   * 给定一个事务句柄，返回一个诺言，该诺言最终将提供以下交易的状态：
   * 已提交到提交服务器。
   * @param {handle} - 事务句柄字符串。
   */
  async getTxnStatus(handle) {
    const status = await axios.get(`${this.getSubmitRoute()}/txn_status/${handle}`);
    return status.data;
  }

  /**
   * Submit a transaction to the ledger and return a promise for the
   * ledger's eventual response. The transaction will be enqueued for
   * validation. If it is valid, it will eventually be committed to the
   * ledger.

   * To determine whether or not the transaction has been committed to the ledger,
   * query the ledger by transaction handle.

   * Contained in the response of `submit_transaction` is a `TransactionHandle` that can be used to
   * query the status of the transaction.
   * @param {txn} - JSON-encoded transaction string.
   */

  /**
   * 将交易提交到分类帐并返回对 分类帐的最终响应。 交易将排队验证。 如果有效，它将最终提交给分类帐。
   * 要确定交易是否已提交到分类账，通过事务句柄查询分类帐。
   * 在“ submit_transaction”响应中包含的是“ TransactionHandle”，可用于查询交易状态。
   * @param {txn} - JSON编码的交易字符串。
   */
  async submitTransaction(txn) {
    try {
      const handle = await axios.post(`${this.getSubmitRoute()}/submit_transaction`, JSON.parse(txn));
      return handle.data;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * If successful, returns a promise that will eventually provide a
   * JSON-encoded transaction object.
   * Otherwise, returns 'not found'. The request fails if the transaction index does not correspond
   * to a transaction.
   *
   * @param {int} id - Transaction index.
   * @throws Will throw an error if the transaction cannot be fetched from the server.
   */

  /**
   * 如果成功，则返回承诺，最终将提供JSON编码的交易对象。否则，返回“未找到”。 如果事务索引不对应，则请求失败进行交易。
   *
   * @param {int} id - 交易索引。
   * @throws 如果无法从服务器获取事务，将抛出错误。
   */
  async getTxn(id) {
    const txn = await axios.get(`${this.getLedgerRoute()}/txn_sid/${id}`);
    return txn.data;
  }

  /**
   * If successful, returns a promise that will eventually provide a
   * JSON-encoded object representing the state commitment of the ledger.
   *
   * @throws Will throw an error if the state commitment cannot be fetched from the server.
   */

  /**
   * 如果成功，则返回承诺，最终将提供JSON编码的对象，代表分类帐的状态承诺。
   *
   * @throws 如果无法从服务器获取状态承诺，将抛出错误。
   */
  async getStateCommitment() {
    const stateCommitment = await axios.get(`${this.getLedgerRoute()}/global_state`);
    return stateCommitment.data;
  }

  /**
   * If successful, returns a promise that will eventually provide a
   * JSON-encoded utxo object.
   *
   * @param {String} path - Ledger server path
   * @param {int} index - Transaction index.
   * @thrrows Will throw an error if the utxo at the given index
   * cannot be fetched from the ledger server.
   */

  /**
   * 如果成功，则返回承诺，最终将提供JSON编码的utxo对象。
   *
   * @param {String} path - 分类帐服务器路径
   * @param {int} index - 交易索引。
   * @thrrows 如果给定索引的utxo将抛出错误,无法从分类帐服务器中获取。
   */
  async getUtxo(id) {
    const utxo = await axios.get(`${this.getLedgerRoute()}/utxo_sid/${id}`);
    return utxo.data;
  }

  /**
   * If successful, returns a list of of utxos owned by the given address.
   *
   * @param {string} address - Base64 encoded address string.
   * @throws Will throw an error if the utxo list cannot be fetched from the server.
   */

  /**
   * 如果成功,则返回给定地址拥有的utxos列表。
   *
   * @param {string} address - Base64编码的地址字符串。
   * @throws 如果无法从服务器获取utxo列表，将抛出错误。
   */

  async getOwnedSids(address) {
    const sids = await axios.get(`${this.getQueryRoute()}/get_owned_utxos/${address}`);
    return sids.data;
  }
}

export default Network;
