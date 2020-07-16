/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-09 12:14:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 09:32:26
 * @ Description: 从服务端获取txn数据, 并且同步到浏览器数据库中, 主要做数据清洗塞选
 */

import webNetWork from '_src/services/webNetWork';
import { relatedDB } from '_src/IndexedDB';
import arrayDiff from '_src/utils/arrayDiff';

/**
 * 获取 getRelatedSids , sids 的差异, 计算出新的sids
 *
 * @param {object} { address } - 钱包地址
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
 * @param {object} { address } - 钱包地址
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
 * 此方法,主要用于 “资产、余额、交易记录” 事件, 通过sid 获取txn, 把数据过滤清洗存放到indexedDB数据库中.
 *
 * @param {object} { address } - 地址
 */
async function calculateTxn({ address }) {
  console.groupCollapsed('=======>  开始获取 TxnSids');
  const { sidsDiff, sidsServer } = await getSidsDiff({ address });

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

  // await relatedDB.getAssetList({ address });
  console.groupEnd();
}

export default calculateTxn;
