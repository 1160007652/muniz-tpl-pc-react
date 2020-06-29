/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-29 11:52:10
 * @ Description: 描述文案
 * @category Services
 * @module webNetWork
 */

import NetWork from '_src/lib/network';

class WebNetWork extends NetWork {
  constructor() {
    super();
    this.switchNetWork();
  }

  async switchNetWork() {
    const config = {
      testnet: {
        protocol: 'https',
        host: 'testnet.findora.org',
        queryPort: '8667',
        submitPort: '8669',
        ledgerPort: '8668',
      },
      online: {
        protocol: 'https',
        host: 'online.findora.org',
        queryPort: '8667',
        submitPort: '8669',
        ledgerPort: '8668',
      },
    };
    chrome.storage.sync.get(['networkConfig'], ({ networkConfig }) => {
      if (networkConfig) {
        this.config = config[networkConfig];
      } else {
        this.config = config.online;
      }
      console.log(this.config, networkConfig);
    });
    chrome.storage.onChanged.addListener((changes) => {
      if ('networkConfig' in changes) {
        const networkConfig = changes?.networkConfig;
        this.config = config[networkConfig.newValue];
        console.log(this.config, networkConfig);
      }
    });
  }
}

export default new WebNetWork();
