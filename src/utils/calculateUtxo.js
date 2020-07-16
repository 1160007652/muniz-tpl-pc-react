/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-09 12:14:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-15 16:06:00
 * @ Description: 从服务端获取txn数据, 并且同步到浏览器数据库中, 主要做数据清洗塞选
 */

import webNetWork from '_src/services/webNetWork';
import { ownedDB } from '_src/IndexedDB';
import arrayDiff from '_src/utils/arrayDiff';
import rootStore from '_src/stores';

/**
 * 获取 getRelatedSids , sids 的差异, 计算出新的sids
 *
 * @param {object} { address } - 钱包地址
 */
async function getSidsDiff({ address }) {
  // 获取前端数据库中的sids
  const oldSids = await ownedDB.getSids({ address });
  console.log('数据库中的sids: ', oldSids);

  // 获取 服务端 的 sids
  let newOwnedSids = await webNetWork.getOwnedSids(address);
  newOwnedSids = newOwnedSids.sort((a, b) => a - b);
  console.log('服务端中的sids: ', newOwnedSids);

  // 获取数组的差集
  const sidsDiff = arrayDiff(newOwnedSids, oldSids);
  console.log('差异Sids: ', sidsDiff);

  return { sidsDB: oldSids, sidsServer: newOwnedSids, sidsDiff };
}

/**
 * 获取 sidsDiff 数据, 对应的 txn 数据
 *
 * @param {object} { address } - 钱包地址
 */
async function getUtxoDiff({ address, sidsDiff, keyPairStr }) {
  const utxoDataList = [];

  // ownedDB.db.currentTransaction.abort();

  const findoraWasm = await import('wasm');
  const keypair = findoraWasm.keypair_from_str(keyPairStr);

  for (let i = 0; i < sidsDiff.length; i++) {
    const sid = sidsDiff[i];

    const utxoData = await webNetWork.getUtxo(sid);
    const memoData = await webNetWork.getOwnerMemo(sid);

    const assetRecord = findoraWasm.ClientAssetRecord.from_jsvalue(utxoData);
    const ownerMemo = memoData ? findoraWasm.OwnerMemo.from_jsvalue(memoData) : null;

    const decryptAssetData = findoraWasm.open_client_asset_record(assetRecord, ownerMemo, keypair);

    decryptAssetData.asset_type = findoraWasm.asset_type_from_jsvalue(decryptAssetData.asset_type);

    const item = {
      address,
      sid,
      body: decryptAssetData || {},
    };
    utxoDataList.push(item);
  }

  return utxoDataList;
}

/**
 * 此方法,主要用于 “资产、余额、交易记录” 事件, 通过sid 获取txn, 把数据过滤清洗存放到indexedDB数据库中.
 *
 * @param {object} { address } - 地址
 */
async function calculateUtxo({ address }) {
  console.groupCollapsed('=======>  开始获取 UtxoSids');
  const walletInfo = rootStore.walletStore.walletImportList.filter((item) => item.publickey === address)[0];
  const { publickey, keyPairStr } = walletInfo;
  const { sidsDiff, sidsServer } = await getSidsDiff({ address: publickey });
  console.log('address: ', publickey);
  /**
   * 如果 sidsDiff.length > 0 , 先数据库中添加新的sids, 拉取新的 txn
   */
  if (sidsDiff.length > 0) {
    const utxoDataList = await getUtxoDiff({ address: publickey, sidsDiff, keyPairStr });
    console.log('utxo 数据:', utxoDataList);

    try {
      await ownedDB.openDB();
      await ownedDB.db.transaction('rw', [ownedDB.db.sids, ownedDB.db.txns], async () => {
        await ownedDB.db.sids.put({ address: publickey, sids: sidsServer });
        await ownedDB.db.txns.bulkAdd(utxoDataList);
      });
    } finally {
      await ownedDB.closeDB();
    }
  }

  console.groupEnd();
}

export default calculateUtxo;
