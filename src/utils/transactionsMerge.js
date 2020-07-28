/** @module utils/transactionsMerge */
import { relatedDB, ownedDB } from '_src/IndexedDB';
import calculateTxn from '_src/utils/calculateTxn';
import calculateUtxo from '_src/utils/calculateUtxo';
import webNetWork from '_src/services/webNetWork';

/**
 * 处理交易中的增发数据, 返回处理完的 json 数据
 *
 * @async
 * @param {object} obj
 * @param {object} obj.body 交易记录中的 operations.body 字段
 * @param {object} obj.keypair 钱包 keypair
 * @returns {object} 返回解密之后的增发资产数据
 */
/**
 * Gets the assets issued by an issuer.
 *
 * @param {json} body - JSON-encoded asset records
 * @param {XfrKeyPair} keypair - Keypair of the issuer
 */
async function getIssueAssetData({ body, keypair }) {
  const findoraWasm = await import('wasm');
  const { records } = body;

  const result = {
    time: '9/19/2019 18:31',
    state: true,
    asset: {},
    blind: {
      isAmount: false,
      isType: false,
    },
  };

  for (const recordsItem of records) {
    for (let k = 0; k < recordsItem.length; k++) {
      if ('NonConfidential' in recordsItem[0].amount) {
        result.blind.isAmount = false;
      } else {
        result.blind.isAmount = true;
      }

      if ('NonConfidential' in recordsItem[0].asset_type) {
        result.blind.isType = false;
      } else {
        result.blind.isType = true;
      }

      const assetRecord = await findoraWasm.ClientAssetRecord.from_json(recordsItem[0]);
      console.log('assetRecord: ', assetRecord);
      const ownerMemo = recordsItem[1] ? await findoraWasm.OwnerMemo.from_json(recordsItem[1]) : null;
      console.log('ownerMemo: ', ownerMemo, recordsItem[1]);
      const decryptAssetData = await findoraWasm.open_client_asset_record(assetRecord, ownerMemo?.clone(), keypair);
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
 * @async
 * @param {object} obj
 * @param {object} obj.body 交易记录中的 operations.body 字段
 * @param {object} obj.keypair 钱包 keypair
 * @param {object} obj.walletInfo 单个钱包对象
 * @returns {object} 解密之后的交易资产数据
 */
/**
 * Gets the transaction data of an asset transfer
 *
 * @param {json} body - JSON-encoded transfer information
 * @param {XfrKeyPair} keypair - keypair of the asset owner
 * @param {json} walletInfo - JSON-encoded wallet information
 */
async function getTransactionAssetData({ body, keypair, walletInfo }) {
  const findoraWasm = await import('wasm');
  const { transfer } = body;
  const ownedInput = body?.inputs[0];
  const result = {
    time: '9/19/2019 18:31',
    state: true,
    asset: {},
    blind: {
      isAmount: false,
      isType: false,
    },
  };

  const { inputs, outputs, owners_memos } = transfer;

  if (new Set([outputs.length, owners_memos.length]).size === 1) {
    if ('NonConfidential' in outputs[0].amount) {
      result.blind.isAmount = false;
    } else {
      result.blind.isAmount = true;
    }

    if ('NonConfidential' in outputs[0].asset_type) {
      result.blind.isType = false;
    } else {
      result.blind.isType = true;
    }

    // for (let k = 0; k < inputs.length; k++) {
    if (walletInfo.publickey === inputs[0].public_key) {
      // 发送者解密数据

      const memoData = await webNetWork.getOwnerMemo(ownedInput.Absolute);
      console.log('memoData absoult', memoData);

      const ownerMemoInput = memoData ? findoraWasm.OwnerMemo.from_json(memoData) : null;

      // inputs 数据 我的 ownedData
      const ownerMemo = owners_memos[1] ? findoraWasm.OwnerMemo.from_json(owners_memos[1]) : null;
      console.log('ownerMemo: ', ownerMemo);

      const inputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(inputs[0]);
      console.log('inputsAssetRecord: ', inputsAssetRecord);

      const decryptInputAssetData = await findoraWasm.open_client_asset_record(
        inputsAssetRecord,
        ownerMemoInput?.clone(),
        keypair,
      );

      console.log('decryptInputAssetData: ', decryptInputAssetData);

      // outputs 数据 我的 ownedData
      const outputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(outputs[1]);
      console.log('outputsAssetRecord: ', outputsAssetRecord);

      const decryptOutputAssetData = findoraWasm.open_client_asset_record(
        outputsAssetRecord,
        ownerMemo?.clone(),
        keypair,
      );

      console.log('decryptOutputAssetData: ', decryptOutputAssetData);

      result.from = inputs[0].public_key;
      result.to = outputs[0].public_key;

      result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptOutputAssetData.asset_type);

      result.asset.numbers = decryptInputAssetData.amount - decryptOutputAssetData.amount;
      result.asset.outputNumbers = decryptOutputAssetData.amount;

      // outputs 中 输入地址与 钱包地址一样, 表示:输入金额, 反之:输出金额
      if (decryptOutputAssetData.blind_asset_record.public_key === walletInfo.publickey && result.to !== result.from) {
        result.txn_type = 'output'; // 输入
      } else {
        result.txn_type = 'input'; // 输出
      }

      // result.asset.inputNumbers = decryptInputAssetData.amount;
    } else {
      // 接受者解密数据

      // owners_memos 数据
      const ownerMemo = owners_memos[0] ? findoraWasm.OwnerMemo.from_json(owners_memos[0]) : null;
      console.log('ownerMemo: ', ownerMemo);

      result.from = inputs[0].public_key;

      // outputs 数据
      const outputsAssetRecord = await findoraWasm.ClientAssetRecord.from_json(outputs[0]);
      console.log('outputsAssetRecord: ', outputsAssetRecord);

      const decryptOutputAssetData = findoraWasm.open_client_asset_record(
        outputsAssetRecord,
        ownerMemo?.clone(),
        keypair,
      );
      console.log('decryptOutputAssetData: ', decryptOutputAssetData);

      result.to = decryptOutputAssetData.blind_asset_record.public_key;

      result.asset.tokenCode = findoraWasm.asset_type_from_jsvalue(decryptOutputAssetData.asset_type);

      result.asset.numbers = decryptOutputAssetData.amount;
      result.asset.outputNumbers = decryptOutputAssetData.amount;
      console.log(11111);
      // outputs 中 输入地址与 钱包地址一样, 表示:输入金额, 反之:输出金额
      if (decryptOutputAssetData.blind_asset_record.public_key === walletInfo.publickey) {
        result.txn_type = 'input'; // 输入
      } else {
        result.txn_type = 'output'; // 输出
      }
    }
    // }
  }

  return result;
}

/**
 * 从数据库中, 计算合并出可用于查询交易列表页面的数据
 * @param {object} obj
 * @param {object} obj.page 分页查询
 * @param {object} obj.walletInfo 单个钱包对象
 * @returns {array} 历史交易记录集
 * @example
 * 如果page === -1, 返回全部数据
 * transactionsMerge({walletInfo, page: -1});
 * 如果page === -2, 返回最新的一条数据
 * transactionsMerge({walletInfo, page: -2});
 * 如果page >= 0, 分页加载数据, 一次加载3条.
 * transactionsMerge({walletInfo, page: 1});
 *
 */
async function transactionsMerge({ walletInfo, page }) {
  // 获取交易数据, 在转账的时候需要使用
  await calculateUtxo({ address: walletInfo.publickey });
  // 获取资产数据
  await calculateTxn({ address: walletInfo.publickey });

  const findoraWasm = await import('wasm');
  const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

  let txnList = await relatedDB.getIssueAndTransactionList({ address: walletInfo.publickey, page });

  console.log('txnListData: ', txnList);

  const result = [];

  for (let i = 0; i < txnList.length; i++) {
    const operations = txnList[i].body.operations;
    for (let j = 0; j < operations.length; j++) {
      const { type, body } = operations[j];

      if (type === 'IssueAsset') {
        const resultItem = await getIssueAssetData({ body, keypair });
        resultItem.type = 'IssueAsset';
        resultItem.txn = txnList[i].sid;
        result.push(resultItem);
      }
      if (type === 'TransferAsset') {
        const resultItem = await getTransactionAssetData({ body, keypair, walletInfo });
        resultItem.type = 'TransferAsset';
        resultItem.txn = txnList[i].sid;
        result.push(resultItem);
      }
    }
  }
  return result;
}

export default transactionsMerge;
