import Dexie from 'dexie';

class OwnedDB {
  constructor() {
    this.db = new Dexie('OwnedDB');
    this.init();
  }
  async init() {
    // 定义数据库 String(process.env.VERSION_APP).split('.')[0]
    await this.db.version(1).stores({
      sids: '&address',
      txns: '[address+sid], address, sid',
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
  async getAssetLast({ address, tokenCode }) {
    await this.openDB();
    console.log(address, tokenCode);
    const assetList = await this.db.txns
      .where('address')
      .equals(address)
      .and((row) => {
        console.log(row);
        const { asset_type } = row.body;
        console.log('数据库中的 asset_type, ', asset_type);
        return asset_type === tokenCode;
      })
      .last();
    await this.closeDB();
    return assetList;
  }
}

export default new OwnedDB();
