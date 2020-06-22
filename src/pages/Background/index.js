/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 09:48:17
 * @ Description: background.js Chrome 启动时, 扩展插件 常驻后台文件
 */

// import services from '_src/services';

/** 通过 chrome.runtime.onMessage.addListener 监听 content.js 使用 chrome.runtime.sendMessage 发送的消息 */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender, sendResponse);
  // 打开新的 tab 页,
  // chrome.tabs.create({ url: 'https://www.baidu.com' });

  chrome.windows.create({
    url: chrome.extension.getURL('popup.html'),
    type: 'popup',
    width: 400,
    height: 480,
  });
  // popup

  sendResponse('yes, 我已经收到 content.js 发送过来的消息');
  return true;
});
