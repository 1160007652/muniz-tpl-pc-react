/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-25 14:39:55
 * @ Description: background.js Chrome 启动时, 扩展插件 常驻后台文件
 */

import pageURL from '_constants/pageURL';

// import services from '_src/services';

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
