/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-09 12:14:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-09 17:57:22
 * @ Description: 从服务端获取txn数据, 并且同步到浏览器数据库中, 主要做数据清洗塞选
 */

import webNetWork from '_src/services/webNetWork';
import { findoraDB } from '_src/IndexedDB';
import arrayDiff from '_src/utils/arrayDiff';

/**
 * 获取 getRelatedSids , sids 的差异, 计算出新的sids
 *
 * @param {object} { address } - 钱包地址
 */
async function getSidsDiff({ address }) {
  // 获取前端数据库中的sids
  const oldSids = await findoraDB.getSids({ address });
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
 * 此方法,主要用于 “资产、余额、交易记录” 事件, 通过sid 获取txn, 把数据过滤清洗存放到indexedDB数据库中.
 *
 * @param {object} { address } - 地址
 */
async function calculateTxn({ address }) {
  const { sidsDiff, sidsServer } = await getSidsDiff({ address });

  /**
   * 如果 sidsDiff.length > 0 , 先数据库中添加新的sids, 拉取新的 txn
   */
  if (sidsDiff.length > 0) {
    await findoraDB.putSids({ address, sids: sidsDiff });
    await getTxnDiff({ address, sidsDiff });
  }

  await findoraDB.getAssetList({ address });
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
    const item = {
      address,
      sid,
      body: txnData?.finalized_txn?.txn?.body || {},
    };

    txnDataList.push(item);
  }

  await findoraDB.putTxns(txnDataList);

  console.log('txn 数据:', txnDataList);
}

export default calculateTxn;
