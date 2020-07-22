/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-17 16:20:47
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-22 16:33:15
 * @ Description: 查看计算余额, 合并数据
 */
// import webNetWork from '_src/services/webNetWork';
// import { relatedDB, ownedDB } from '_src/IndexedDB';

export default async function balancesMerge({ dataList, asset }) {
  let numbers = 0;
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
