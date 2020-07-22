import Dexie from 'dexie';

class RelatedDB {
  constructor() {
    this.db = new Dexie('RelatedDB');
    this.init();
  }
  async init() {
    // 定义数据库
    await this.db.version(1).stores({
      sids: '&address',
      txns: '++id, address, sid',
    });
  }
  /**
   * 打开数据库
   */
  async openDB() {
    // 打开数据库
    await this.db.open().catch(function (e) {
      console.error('数据库打开失败: ' + e);
    });
  }
  /**
   * 关闭数据库
   */
  async closeDB() {
    // 打开数据库
    await this.db.close();
  }
  /**
   * 获取数据库中的 sids
   */
  async getSids({ address }) {
    await this.openDB();
    const raw = await this.db.sids.where('address').equals(address).first();
    await this.closeDB();

    return raw?.sids || [];
  }

  /**
   * 获取可以转发的资产
   *
   * @param {object} address - 地址
   */
  async getIssuedAssetList({ address }) {
    await this.openDB();
    const assetList = await this.db.txns
      .where('address')
      .equals(address)
      .and((row) => {
        const { operations } = row.body;
        const result = operations.filter((item) => {
          return item.type === 'IssueAsset';
        });
        return result.length > 0;
      })
      .toArray();
    await this.closeDB();
    return assetList;
  }
  /**
   * 获取增发 及 交易记录
   *
   * @param {object} address - 地址
   */
  async getIssueAndTransactionList({ address, page }) {
    await this.openDB();
    const limit = 3;
    const offset = page * limit;
    let assetList = await this.db.txns
      .where('address')
      .equals(address)
      .and((row) => {
        const { operations } = row.body;
        const result = operations.filter((item) => {
          return ['IssueAsset', 'TransferAsset'].includes(item.type);
        });
        return result.length > 0;
      })
      .reverse();

    if (page >= 0) {
      assetList = assetList.offset(offset).limit(limit).toArray();
    } else if (page === -2) {
      assetList = assetList.offset(0).limit(1).toArray();
    } else {
      assetList = assetList.toArray();
    }

    await this.closeDB();
    return assetList;
  }
  /**
   * 获取交易记录
   *
   * @param {object} address - 地址
   */
  async getTransactionAssetList({ address }) {
    await this.openDB();
    const assetList = await this.db.txns
      .where('address')
      .equals(address)
      .and((row) => {
        const { operations } = row.body;
        const result = operations.filter((item) => {
          return ['TransferAsset'].includes(item.type);
        });
        return result.length > 0;
      })
      .toArray();
    await this.closeDB();
    return assetList;
  }
}

export default new RelatedDB();
