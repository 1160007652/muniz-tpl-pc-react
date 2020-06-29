/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-29 10:34:37
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-29 10:41:00
 * @ Description: Chrome.storage.sync => 异步转同步 方法
 */

const Storage = {
  /**
   * @description 获取storage持久存储数据
   * @param {Array} key , 获取的数据名称
   */
  get: (key) => {
    return Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result);
      });
    });
  },
};

export default Storage;
