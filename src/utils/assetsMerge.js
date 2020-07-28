/** @module utils/assetsMerge */
import { relatedDB } from '_src/IndexedDB';

/**
 * 获取交易中的正常转账数据, 返回处理完的 json 数据
 * @param obj {object}
 * @param {object} obj.body 交易记录中的 operations.body 字段
 * @param {object} obj.keypair 钱包 keypair
 * @param {object} obj.walletInfo 单个钱包对象
 * @returns {object} 解密之后的资产数据
 */
/**
 * Gets the asset data of a transfer transaction
 *
 * @param {json} body - JSON-encoded transfer information
 * @param {XfrKeyPair} keypair - keypair of the asset owner
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

  // if (new Set([outputs.length, owners_memos.length]).size === 1) {
  for (let k = 0; k < inputs.length; k++) {
    // owners_memos 数据
    const ownerMemo = owners_memos[k] ? findoraWasm.OwnerMemo.from_json(owners_memos[k]) : null;
    console.log('ownerMemo: ', ownerMemo);

    // inputs 数据
    const outputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(outputs[k]);
    console.log('inputsAssetRecord: ', outputsAssetRecord);

    const decryptoutputAssetData = await findoraWasm.open_client_asset_record(
      outputsAssetRecord,
      ownerMemo?.clone(),
      keypair,
    );
    console.log('decryptInputAssetData: ', decryptoutputAssetData);

    result.to = decryptoutputAssetData.blind_asset_record.public_key;
    result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptoutputAssetData.asset_type);
  }
  // }

  return result;
}

/**
 * 将数据库中的交易数据,转化为清洗完毕的资产集
 * @export
 * @param obj {object}
 * @param {object} obj.walletInfo 单个钱包对象
 * @returns {array} 资产数据集
 */
async function assetsMerge({ walletInfo }) {
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

export default assetsMerge;
