import Dexie from 'dexie';

class AssetDB {
  constructor() {
    this.db = new Dexie('AssetDB');
    this.init();
  }
  init() {
    // 定义数据库
    this.db.version(1).stores({
      sids: '++id, address',
      txn: '++id, address',
    });
    // 打开数据库
    this.db.open().catch(function (e) {
      console.error('数据库打开失败: ' + e);
    });
  }
  /**
   * 显示资产余额
   *
   * @memberof BlanceDB
   *
   * @param {object} addres - 地址
   */
  searchBalance({ address }) {
    this.db.sids
      .where('address')
      .equals(address)
      .and((row) => {
        return row.assetType === 'Balance';
      })
      // .toArray()
      .each((result) => {
        console.log('余额', result);
      });
  }
  /**
   * 添加 sids 数据
   *
   * @memberof BlanceDB
   */
  addSids() {
    // this.db.sids.add({ address: 'a1234567', assetType: 'DefineAsset', data: { name: '资产1', age: 4 } });
  }
  /**
   * 添加 Txns 数据
   *
   * @memberof BlanceDB
   */
  addTxns() {
    // this.db.sids.add({ address: 'a1234567', assetType: 'DefineAsset', data: { name: '资产1', age: 4 } });
  }
}

export default new AssetDB();
