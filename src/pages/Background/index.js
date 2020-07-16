/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-15 17:20:57
 * @ Description: background.js Chrome 启动时, 扩展插件 常驻后台文件
 */

import calculateTxn from '_src/utils/calculateTxn';
import calculateUtxo from '_src/utils/calculateUtxo';

// import services from '_src/services';

import pageURL from '_constants/pageURL';

function exactWalletList() {
  chrome.storage.sync.get(['walletImportList'], async ({ walletImportList }) => {
    if (walletImportList) {
      const walletList = Object.values(JSON.parse(walletImportList)) || [];
      console.log('walletList: ', walletList);

      for (let i = 0; i < walletList.length; i++) {
        const address = walletList[i].publickey;
        // 异步执行
        await calculateUtxo({ address });
        await calculateTxn({ address });
      }
    }
  });
}

// 浏览器启动后, 强制立即同步一次数据
// 使用setTimeout , 去执行第一次的事件, 是为了在微任务中执行 同步数据 的功能
setTimeout(exactWalletList, 300);
// exactWalletList();
// 浏览器启动后, 自动 同步远程数据, 并且每间隔 1小时同步一次
setInterval(exactWalletList, 3600000);

// 提前执行该方法是为了缓存PublicParams = zeiParams , 这个数据, 这个数据在
// services.assetServer.getPublicParams();

window.findoraConfig = {
  zeiParams: '',
};

// 异步获取zeiParams数据
// setTimeout(() => {
//   services.assetServer.getPublicParams().then((result) => {
//     window.findoraConfig.zeiParams = result;
//   });
// }, 300);

/** 通过 chrome.runtime.onMessage.addListener 监听 content.js 使用 chrome.runtime.sendMessage 发送的消息 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // type: 'content-script' ,path: 'openSend'
  if (request.type === 'content-script') {
    chrome.windows.create({
      url: `${chrome.runtime.getURL('popup.html')}#${pageURL.send}`,
      type: 'popup',
      width: 400,
      height: 600,
    });
  }

  sendResponse('yes, 我已经收到 content.js 发送过来的消息');
  return true;
});
