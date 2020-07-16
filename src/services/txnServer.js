/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-04 17:10:14
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 18:35:06
 * @ Description: wallet info api , 交易记录接口
 *
 */

import webNetWork from './webNetWork';
import { relatedDB } from '_src/IndexedDB';

/**
 * @category Services
 * @class
 */
const txnServer = {
  /**
   * @author Muniz
   * @description 获取交易信息
   * @param {param} address - 转账需要的表单数据
   *
   * @return {object}
   */
  async getTxnList(param) {
    console.groupCollapsed('======>   开始获取交易列表');
    console.log('参数: ', param);
    const findoraWasm = await import('wasm');
    const { walletInfo } = param;
    const keypair = findoraWasm.keypair_from_str(walletInfo.keyPairStr);

    const txnList = await relatedDB.getTransactionList({ address: walletInfo.publickey });
    console.log('txnListData: ', txnList);

    const result = [];
    /*
    {
      txn: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB2',
      time: '9/19/2019 18:31',
      from: 'JAKzGqStME5FW6e1NmTME5FW6e1NFW6e1NrEB',
      to: 'n1NStVG4c9HqXGebAdNkfhypHebhGqdeNs5',
      state: false,
      asset: {
        numbers: '-10',
        unit: 'GIN',
      },
    },
*/
    for (let i = 0; i < txnList.length; i++) {
      const operations = txnList[i].body.operations;
      for (let j = 0; j < operations.length; j++) {
        const resultItem = {
          time: '9/19/2019 18:31',
          state: true,
          asset: {
            unit: '短名称',
          },
        };
        if (operations[j].type === 'IssueAsset') {
          const { records } = operations[j].body;

          // 处理解密数据
          for (const recordsItem of records) {
            for (let k = 0; k < recordsItem.length; k++) {
              const assetRecord = await findoraWasm.ClientAssetRecord.from_jsvalue(recordsItem[0]);
              console.log('assetRecord: ', assetRecord);
              const ownerMemo = recordsItem[1] ? await findoraWasm.OwnerMemo.from_jsvalue(recordsItem[1]) : null;
              console.log('ownerMemo: ', ownerMemo, recordsItem[1]);
              const decryptAssetData = await findoraWasm.open_client_asset_record(assetRecord, ownerMemo, keypair);
              console.log('decryptAssetData: ', decryptAssetData);

              resultItem.asset.numbers = `+ ${decryptAssetData.amount}`;
              resultItem.from = decryptAssetData.blind_asset_record.public_key;
              resultItem.to = decryptAssetData.blind_asset_record.public_key;
              resultItem.txn = txnList[i].sid;
            }
          }

          result.push(resultItem);
        }
        if (operations[j].type === 'TransferAsset') {
          //
        }
      }
    }

    console.log('result: ', result);
    console.groupEnd();
    return result;
  },
};

/** The name of the module. */
export default txnServer;
