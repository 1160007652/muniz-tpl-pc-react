/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-11 18:45:38
 * @ Description: background.js Chrome 启动时, 扩展插件 常驻后台文件
 */

// import services from '_src/services';

chrome.storage.sync.set({ foo: 'hello', bar: 'hi' }, function () {
  console.log('Settings saved');
});

// Read it using the storage API
chrome.storage.sync.get(['foo', 'bar'], function (items) {
  // message('Settings retrieved', items);
  console.log(items);
});

// async function toPopup() {
//   await services.webKeyStore.addNewKeypair({name: 'Alice', password:'123456789'});
// }

// toPopup();
