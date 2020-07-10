/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-02 17:20:42
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-10 15:00:52
 * @ Description: NetWork 网络请求 切换环境 库
 */

import axios from '_src/dataProxy';

class Network {
  /**
   * 创建一个新的网络对象。
   */
  constructor() {
    this.config = {};
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
   * 给定一个事务句柄，返回一个诺言，该诺言最终将提供以下交易的状态：
   * 已提交到提交服务器。
   * @param {handle} - 事务句柄字符串。
   */
  async getTxnStatus(handle) {
    const status = await axios.get(`${this.getSubmitRoute()}/txn_status/${handle}`);
    return status.data;
  }

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
   * 如果成功，则返回承诺，最终将提供JSON编码的交易对象。否则，返回“未找到”。 如果事务索引不对应，则请求失败进行交易。
   *
   * @param {int} id - 交易索引。
   * @throws 如果无法从服务器获取事务，将抛出错误。
   */
  async getTxn(txnSid) {
    const txn = await axios.get(`${this.getLedgerRoute()}/txn_sid/${txnSid}`);
    return txn.data;
  }

  /**
   * 返回资产全量信息
   *
   * @param {int} code - 资产 token code.
   * @throws 如果无法从服务器获取资产信息，将引发错误.
   */
  async getAsset(code) {
    const asset = await axios.get(`${this.getLedgerRoute()}/asset_token/${code}`);
    return asset.data;
  }

  /**
   * 返回资产的 属性信息 包括： 代码，发行人，memo 和asset_rules。
   *
   * @param {int} code - 资产 token code.
   * @throws 如果无法从服务器获取资产信息，将引发错误.
   */
  async getAssetProperties(code) {
    const asset = await axios.get(`${this.getLedgerRoute()}/asset_token/${code}`);
    return asset.data.properties;
  }

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
   * 如果成功，则返回承诺，最终将提供JSON编码的utxo对象。
   *
   * @param {int} utxoSid - 交易索引。
   * @thrrows 如果给定索引的utxo将抛出错误,无法从分类帐服务器中获取。
   */
  async getUtxo(utxoSid) {
    const utxo = await axios.get(`${this.getLedgerRoute()}/utxo_sid/${utxoSid}`);
    return utxo.data;
  }

  /**
   * 如果成功，则返回承诺，最终将提供 JSON 编码的AIR结果对象。
   *
   * @param {String} key - 字符串化的凭据用户密钥。
   */
  async getAIRResult(addr) {
    const res = await axios.get(`${this.getLedgerRoute()}/air_address/${addr}`);
    return res.data;
  }

  /**
   * 如果成功，则返回与给定地址相关的Txn SID列表。
   * 我是资产的增发者、资产的输入输出者、资产-附加信息的 如 memo 更新, 多签
   *
   * 注意：这不同于getOwnedSids，后者返回UTXO SID的列表。
   *
   * @param {string}地址-Base64编码的地址字符串。
   * @throws 如果无法从服务器获取utxo列表，将抛出错误。
   */
  async getRelatedSids(address) {
    const sids = await axios.get(`${this.getQueryRoute()}/get_related_txns/${address}`);
    return sids.data;
  }

  /**
   * 如果成功,则返回给定地址拥有的utxos列表。
   *
   * 注意：这与getRelatedSids不同，后者返回事务SID的列表。
   *
   * @param {string} address - Base64编码的地址字符串。
   * @throws 如果无法从服务器获取utxo列表，将抛出错误。
   */

  async getOwnedSids(address) {
    const sids = await axios.get(`${this.getQueryRoute()}/get_owned_utxos/${address}`);
    return sids.data;
  }

  /**
   * 如果成功，则返回由给定地址创建的资产代码列表。
   *
   * @param {string}地址-Base64编码的地址字符串。
   * @throws如果无法从服务器获取创建的资产，将抛出错误。
   */
  async getCreatedAssets(address) {
    const sids = await axios.get(`${this.getQueryRoute()}/get_created_assets/${address}`);
    return sids.data;
  }

  /**
   * 如果成功，则返回由给定地址发出的记录列表。
   *
   * @param {string} address - Base64编码的地址字符串。
   * @throws  如果无法从服务器获取已发布的记录列表，将抛出错误。
   */
  async getIssuedRecords(address) {
    const records = await axios.get(`${this.getQueryRoute()}/get_issued_records/${address}`);
    return records.data;
  }

  /**
   * 如果成功，则返回给定地址拥有的UTXO SID的列表。
   *
   * @param {int} utxoSid - UTXO SID，可以通过getOwnedSids获取。
   * @throws 如果无法从服务器获取所有者备忘录，将引发错误。
   */
  async getOwnerMemo(utxoSid) {
    const memo = await axios.get(`${this.getQueryRoute()}/get_owner_memo/${utxoSid}`);
    return memo.data;
  }

}

export default Network;
