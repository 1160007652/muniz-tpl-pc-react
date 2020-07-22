/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-17 16:20:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 13:28:29
 * @ Description: 查看计算余额, 合并数据
 */
// import webNetWork from '_src/services/webNetWork';
import { relatedDB, ownedDB } from '_src/IndexedDB';

/**
 * 处理交易中的增发数据, 返回处理完的 json 数据
 *
 * @param {*} data
 */
async function getIssueAssetData({ body, keypair }) {
  const findoraWasm = await import('wasm');
  const { records } = body;

  const result = {
    time: '9/19/2019 18:31',
    state: true,
    asset: {
      unit: '短名称',
    },
  };

  for (const recordsItem of records) {
    for (let k = 0; k < recordsItem.length; k++) {
      const assetRecord = await findoraWasm.ClientAssetRecord.from_json(recordsItem[0]);
      console.log('assetRecord: ', assetRecord);
      const ownerMemo = recordsItem[1] ? await findoraWasm.OwnerMemo.from_json(recordsItem[1]) : null;
      console.log('ownerMemo: ', ownerMemo, recordsItem[1]);
      const decryptAssetData = await findoraWasm.open_client_asset_record(assetRecord, ownerMemo, keypair);
      console.log('decryptAssetData: ', decryptAssetData);

      result.txn_type = 'input'; // 只能给自己增发, 增发必定是 输入
      result.asset.numbers = decryptAssetData.amount;
      result.from = decryptAssetData.blind_asset_record.public_key;
      result.to = decryptAssetData.blind_asset_record.public_key;
      result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptAssetData.asset_type);
    }
  }

  return result;
}

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
    asset: {
      unit: '短名称',
    },
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
      result.asset.inputNumbers = decryptInputAssetData.amount;

      // outputs 数据
      const outputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(outputs[k]);
      console.log('outputsAssetRecord: ', outputsAssetRecord);
      const decryptOutputAssetData = await findoraWasm.open_client_asset_record(outputsAssetRecord, ownerMemo, keypair);
      console.log('decryptOutputAssetData: ', outputsAssetRecord);

      result.to = decryptOutputAssetData.blind_asset_record.public_key;
      result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptOutputAssetData.asset_type);
      result.asset.numbers = decryptOutputAssetData.amount;
      result.asset.outputNumbers = decryptOutputAssetData.amount;

      // outputs 中 输入地址与 钱包地址一样, 表示:输入金额, 反之:输出金额
      if (decryptOutputAssetData.blind_asset_record.public_key === walletInfo.publickey) {
        result.txn_type = 'input'; // 输入
      } else {
        result.txn_type = 'output'; // 输出
      }
    }
  }

  return result;
}

export default async function balancesMerge({ walletInfo }) {
  const findoraWasm = await import('wasm');
  const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

  let txnList = await relatedDB.getIssueAndTransactionList({ address: walletInfo.publickey });
  // txnList = await relatedDB.getTransactionList({ address: walletInfo.publickey });
  console.log('txnListData: ', txnList);

  const result = [];

  for (let i = 0; i < txnList.length; i++) {
    const operations = txnList[i].body.operations;
    for (let j = 0; j < operations.length; j++) {
      const { type, body } = operations[j];
      if (type === 'IssueAsset') {
        const resultItem = await getIssueAssetData({ body, keypair });
        resultItem.txn = txnList[i].sid;
        result.push(resultItem);
      }
      if (type === 'TransferAsset') {
        const resultItem = await getTransactionAssetData({ body, keypair, walletInfo });
        resultItem.txn = txnList[i].sid;
        result.push(resultItem);
      }
    }
  }
  return result;
}
