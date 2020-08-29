/** @module utils/balancesMerge */

/**
 * 计算资产余额, 需要传入整合完毕的某个历史交易记录
 * @async
 * @param obj {object}
 * @param obj.dataList {array} 来自前端数据库中的某个钱包地址历史交易记录集
 * @param obj.asset {object} 某一个资产对象
 * @returns {array} 返回资产数组
 */
/**
 * Calculates the asset balance by merging the transaction history.
 * @async
 * @param {object} obj
 * @param {array} obj.dataList - Transaction history of an address fetched from data storage.
 * @param {object} obj.asset - Asset whose balance will be calculated.
 * @returns {array} Asset information
 */
async function balancesMerge({ dataList, asset }) {
  let numbers = 0;
  let codeAssetList = [];
  console.log(dataList);
  dataList.forEach((item) => {
    // {txn_type === 'input' ? '+' : '-'}

    if (item.asset.tokenCode === asset.code) {
      codeAssetList.push(item);

      if (item.txn_type === 'input') {
        numbers = numbers + item.asset.numbers;

        // 自己给自己转账的金额, 不计算在内, 需要把之前计算的金额, 减去
        // if (item.from === item.to && item.type === 'TransferAsset') {
        //   numbers = numbers - item.asset.numbers;
        // }
      } else {
        numbers = numbers - item.asset.numbers;
      }
    }
  });
  asset.numbers = numbers;
  return { asset, codeAssetList };
}

export default balancesMerge;
