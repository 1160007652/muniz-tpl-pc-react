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
   * 添加数据到sids表中
   *
   * @param {object} data - sids,数据 {address, sids}
   */
  async putSids(data) {
    await this.openDB();
    const result = await this.db.sids.put(data);
    await this.closeDB();
    console.log('添加sids数据: ', result);
  }
  /**
   * 添加数据到txns表中
   *
   * @param {object} data - sids,数据 {address, sids}
   */
  async putTxns(data) {
    await this.openDB();
    console.log('存储数据:', data);
    const result = await this.db.txns.bulkAdd(data);
    await this.closeDB();
    console.log('添加txns数据: ', result);
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
