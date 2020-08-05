/** @module utils/arrayDiff */

// /**
//  * 获取数组增加的数据
//  * @function arrayDiff
//  * @param {array} newArr 新的 arr 数组, 服务端返回的
//  * @param {array} oldArr 旧的 arr 数组, 数据库中的
//  * @returns {array} 返回计算好的数组差集
//  * @example
//  *
//  * const newArr = [1,2,3,4];
//  * const oldArr = [1,2];
//  *
//  * const diff = arrayDiff(newArr, oldArr);
//  * console.log(diff); // [3,4]
//  *
//  */
/**
 * Gets the new elements in an array.
 * @function arrayDiff
 * @param {array} newArr - New array fetched from the server.
 * @param {array} oldArr - Old array in the data storage.
 * @returns {array} New elements in the array.
 * @example
 *
 * const newArr = [1,2,3,4];
 * const oldArr = [1,2];
 *
 * const diff = arrayDiff(newArr, oldArr);
 * console.log(diff); // [3,4]
 *
 */
function arrayDiff(newArr, oldArr) {
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

export default arrayDiff;
