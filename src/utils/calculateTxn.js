/** @module utils/calculateTxn */

import webNetWork from '_src/services/webNetWork';
import { relatedDB } from '_src/IndexedDB';
import arrayDiff from '_src/utils/arrayDiff';

/**
 * 获取 getRelatedSids , sids 的差异, 计算出新的sids
 *
 * @async
 * @param {object} obj
 * @param {string} obj.address 钱包地址
 * @returns {object} 数据库sids,服务端sids,sids差集
 */
/**
 * Gets the new Txn SID associated with an address.
 *
 * @param {string} address - Base64-encoded address string
 */
async function getSidsDiff({ address }) {
  // 获取前端数据库中的sids
  const oldSids = await relatedDB.getSids({ address });
  console.log('数据库中的sids: ', oldSids);

  // 获取 服务端 的 sids
  let newRelatedSids = await webNetWork.getRelatedSids(address);
  newRelatedSids = newRelatedSids.sort((a, b) => a - b);
  console.log('服务端中的sids: ', newRelatedSids);

  // 获取数组的差集
  const sidsDiff = arrayDiff(newRelatedSids, oldSids);
  console.log('差异Sids: ', sidsDiff);

  return { sidsDB: oldSids, sidsServer: newRelatedSids, sidsDiff };
}

/**
 * 获取 sidsDiff 数据, 对应的 txn 数据
 *
 * @async
 * @param {object} obj
 * @param {string} obj.address 钱包地址
 * @param {array} obj.sidsDiff RelatedSids前端数据与服务端数据的差集
 * @returns {array} 返回sid对应的数据详情集
 */
/**
 * Gets the transactions with the new Txn SIDs.
 *
 * @param {} address - Address related to the transactions
 * @param {} sidsDiff - New Txn SIDs
 */
async function getTxnDiff({ address, sidsDiff }) {
  const txnDataList = [];

  for (let i = 0; i < sidsDiff.length; i++) {
    const sid = sidsDiff[i];
    const txnData = await webNetWork.getTxn(sid);
    const bodyData = txnData?.finalized_txn?.txn?.body;

    bodyData.operations = bodyData.operations.map((item) => {
      // 创建资产
      if ('DefineAsset' in item) {
        item.DefineAsset.type = 'DefineAsset';
        return item.DefineAsset;
      }
      // 增发资产
      if ('IssueAsset' in item) {
        item.IssueAsset.type = 'IssueAsset';
        return item.IssueAsset;
      }
      // 转账
      if ('TransferAsset' in item) {
        item.TransferAsset.type = 'TransferAsset';
        return item.TransferAsset;
      }
    });

    const item = {
      address,
      sid,
      body: bodyData || {},
    };

    txnDataList.push(item);
  }

  return txnDataList;
}

/**
 * 从服务端获取txn数据, 并且同步到浏览器数据库中, 主要做数据清洗塞选, 主要用于 “资产、余额、交易记录” 事件, 通过sid 获取txn, 把数据过滤清洗存放到indexedDB数据库中.
 *
 * @async
 * @param {object} obj
 * @param {string} obj.address 钱包地址
 */
/**
 * Gets the transaction information of an address.
 *
 * This function is used to view assets, balances and transactions.
 * The transaction information is fetched by the Txn SIDs, and will be stored in the indexDB database.
 *
 * @param {object} address - Address of the transaction information to retrieve
 */
async function calculateTxn({ address }) {
  console.groupCollapsed('=======>  开始获取 TxnSids');
  const { sidsDiff, sidsServer } = await getTxnSidsDiff({ address });

  /**
   * 如果 sidsDiff.length > 0 , 先数据库中添加新的sids, 拉取新的 txn
   */
  if (sidsDiff.length > 0) {
    const txnDataList = await getTxnDiff({ address, sidsDiff });
    console.log('txn 数据:', txnDataList);

    try {
      await relatedDB.openDB();
      await relatedDB.db.transaction('rw', [relatedDB.db.sids, relatedDB.db.txns], async () => {
        await relatedDB.db.sids.put({ address, sids: sidsServer });
        await relatedDB.db.txns.bulkAdd(txnDataList);
      });
    } finally {
      await relatedDB.closeDB();
    }
  }
  console.groupEnd();
}

export default calculateTxn;
