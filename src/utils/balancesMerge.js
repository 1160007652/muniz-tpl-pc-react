/** @module utils/balancesMerge */

/**
 * 计算资产余额, 需要传入整合完毕的某个历史交易记录
 * @async
 * @param obj {object}
 * @param obj.dataList {array} 来自前端数据库中的某个钱包地址历史交易记录集
 * @param obj.asset {object} 某一个资产对象
 * @returns {array} 返回资产数组
 */
async function balancesMerge({ dataList, asset }) {
  let numbers = 0;
  console.log(dataList);
  dataList.forEach((item) => {
    // {txn_type === 'input' ? '+' : '-'}
    if (item.asset.tokenCode === asset.code) {
      if (item.txn_type === 'input') {
        numbers = numbers + item.asset.numbers;
      } else {
        numbers = numbers - item.asset.numbers;
      }
    }
  });
  asset.numbers = numbers;
  return asset;
}

export default balancesMerge;
