/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-25 13:24:32
 * @ Description: 可注入页面的content-scripts.js 资源
 */

/** 通过 addEventListener 监听 网页端 使用 postMessage 发送的消息 */
window.addEventListener(
  'message',
  (event, a, b) => {
    const { data } = event;
    // 如果没消息就退出
    if (!data) {
      return;
    }
    // 如果标识符一致,开始分发事件
    if (data.action === 'findora-ext-wallet') {
      /** 使用 chrome.runtime.sendMessage , 向后台 background.js 发送消息*/
      chrome.runtime.sendMessage({ type: 'content-script', action: 'openSend', data }, (response) => {
        console.log(response);
        // chrome.extension.getURL("normal_popup.html")
      });
    }
  },
  false,
);

/*

window.postMessage({
    action: 'findora-ext-wallet',
    to: 'r4uk6Ha2i-EOJKsbNFraSSFtk0uuKa0uBKDvPv6-UqE=',
    assetCode: 'SIcvzzTUDng_eC3JDlm7xhbfdgRNB1GNte3zOPn_1m0=',
    numbers: '1',
    blind: {
      isAmount: true,
      isType: true,
    },
}, "*");

*/
