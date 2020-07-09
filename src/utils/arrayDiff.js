/**
 * @ Author: Muniz
 * @ Create Time: 2020-07-09 13:58:36
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-09 14:06:30
 * @ Description: 获取数组的差集
 */

/**
 *
 *
 * @export
 * @param {*} newArr 新的 arr 数组, 服务端返回的
 * @param {*} oldArr 旧的 arr 数组, 数据库中的
 * @returns []
 */

export default function arrayDiff(newArr, oldArr) {
  const set1 = new Set(newArr);
  const set2 = new Set(oldArr);

  const subset = [];

  for (let item of set1) {
    if (!set2.has(item)) {
      subset.push(item);
    }
  }

  return subset;
}
