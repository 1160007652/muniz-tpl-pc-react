/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 14:02:48
 * @ Modified by: Muniz
 * @ Modified time: 2020-07-13 11:50:58
 * @ Description: 描述文案
 * @category Services
 * @module webNetWork
 */

import NetWork from '_src/lib/network';

// TODO: missing documentation
class WebNetWork extends NetWork {
  constructor() {
    super();
    this.switchNetWork();
  }

  switchNetWork(type = 'testnet') {
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
    localStorage.setItem('networkConfig', type);
    const networkConfig = localStorage.getItem('networkConfig');
    this.config = config[networkConfig];
    console.log(networkConfig);
  }
}

export default new WebNetWork();
