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
   * 获取 定义的 资产
   *
   * @param {object} addres - 地址
   */
  async getAssetList({ address }) {
    await this.openDB();
    const assetList = await this.db.txns
      .where('address')
      .equals(address)
      .and((row) => {
        const { operations } = row.body;
        const result = operations.filter((item) => {
          return 'DefineAsset' in item;
        });
        return result.length > 0;
      })
      .toArray();
    await this.closeDB();
    console.log(assetList);
  }
}

export default new RelatedDB();
