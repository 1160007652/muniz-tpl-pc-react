/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-10 09:55:58
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-16 09:47:25
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

// 用于保存钱包全局信息
window.findoraConfig = {};

/** 通过 chrome.runtime.onMessage.addListener 监听 content.js 使用 chrome.runtime.sendMessage 发送的消息 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // type: 'content-script' ,path: 'openSend'
  const { type, path, data } = request;
  if (type === 'content-script') {
    if (path === 'openSend') {
      openSend(data);
    }
  }

  sendResponse('yes, 我已经收到 content.js 发送过来的消息');
  return true;
});

/** 唤醒转账界面 */
async function openSend(data) {
  /*
      // 最终数据
      asset_rules: {transferable: true, updatable: false, transfer_multisig_rules: null, tracing_policies: Array(1), max_units: null}
      code: "SIcvzzTUDng_eC3JDlm7xhbfdgRNB1GNte3zOPn_1m0="
      issuer: {key: "iLE0JnvHho3REOwklDxAgXSynMS-NtKBZF2XQ5jglgQ="}
      long: "SIcvzzTUDng_eC3JDlm7xhbfdgRNB1GNte3zOPn_1m0="
      memo: "this is memo"
      numbers: 100
      short: "this is memo"

      // 传入数据
      action: 'findora-ext-wallet',
      to: 'r4uk6Ha2i-EOJKsbNFraSSFtk0uuKa0uBKDvPv6-UqE=',
      assetCode: 'SIcvzzTUDng_eC3JDlm7xhbfdgRNB1GNte3zOPn_1m0=',
      numbers: '1',
      blind: {
        isAmount: true,
        isType: true,
      },
    */
  chrome.windows.create({
    url: `${chrome.runtime.getURL('popup.html')}#${pageURL.send}`,
    type: 'popup',
    width: 400,
    height: 600,
  });
}
