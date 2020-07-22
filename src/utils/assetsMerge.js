/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-17 16:20:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 17:29:16
 * @ Description: 提取转账中的资产信息
 */
// import webNetWork from '_src/services/webNetWork';
import { relatedDB, ownedDB } from '_src/IndexedDB';
// import calculateTxn from '_src/utils/calculateTxn';
// import calculateUtxo from '_src/utils/calculateUtxo';

/**
 * 获取交易中的正常转账数据, 返回处理完的 json 数据
 *
 * @param {*} data
 */
async function getTransactionAssetData({ body, keypair, walletInfo }) {
  const findoraWasm = await import('wasm');
  const { transfer } = body;

  const result = {
    time: '9/19/2019 18:31',
    state: true,
    asset: {},
  };

  const { inputs, outputs, owners_memos } = transfer;

  if (new Set([outputs.length, owners_memos.length]).size === 1) {
    for (let k = 0; k < inputs.length; k++) {
      // owners_memos 数据
      const ownerMemo = owners_memos[k];
      console.log('ownerMemo: ', ownerMemo);

      // inputs 数据
      const inputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(inputs[k]);
      console.log('inputsAssetRecord: ', inputsAssetRecord);

      const decryptInputAssetData = await findoraWasm.open_client_asset_record(inputsAssetRecord, ownerMemo, keypair);
      console.log('decryptInputAssetData: ', decryptInputAssetData);

      result.from = decryptInputAssetData.blind_asset_record.public_key;
      result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptInputAssetData.asset_type);
    }
  }

  return result;
}

export default async function assetsMerge({ walletInfo }) {
  // 获取交易数据, 在转账的时候需要使用
  // await calculateUtxo({ address: walletInfo.publickey });
  // 获取资产数据
  // await calculateTxn({ address: walletInfo.publickey });

  const findoraWasm = await import('wasm');
  const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

  let txnList = await relatedDB.getTransactionAssetList({ address: walletInfo.publickey });
  console.log('txnListData: ', txnList);

  const result = [];

  for (let i = 0; i < txnList.length; i++) {
    const operations = txnList[i].body.operations;
    for (let j = 0; j < operations.length; j++) {
      const { type, body } = operations[j];
      if (type === 'TransferAsset') {
        const resultItem = await getTransactionAssetData({ body, keypair, walletInfo });
        resultItem.txn = txnList[i].sid;
        result.push(resultItem);
      }
    }
  }

  return result;
}
