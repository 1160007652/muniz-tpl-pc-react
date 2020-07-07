import Dexie from 'dexie';

// 实列化数据库
var blanceDB = new Dexie('BlanceDB');

// 定义数据库 表
blanceDB.version(1).stores({
  sids: '++id, address',
  txn: '++id',
});

// 打开数据库
blanceDB.open().catch(function (e) {
  console.error('数据库打开失败: ' + e);
});

if (false) {
  blanceDB.sids.add({ address: 'a1234567', assetType: 'DefineAsset', data: { name: '资产1', age: 4 } });
  blanceDB.sids.add({ address: 'b1234567', assetType: 'DefineAsset', data: { name: '资产2', age: 5 } });
  blanceDB.sids.add({ address: 'c1234567', assetType: 'DefineAsset', data: { name: '资产3', age: 6 } });

  blanceDB.sids.add({ address: 'a1234567', assetType: 'Transaction', data: { name: '交易1', age: 7 } });
  blanceDB.sids.add({ address: 'b1234567', assetType: 'Transaction', data: { name: '交易2', age: 8 } });
  blanceDB.sids.add({ address: 'c1234567', assetType: 'Transaction', data: { name: '交易3', age: 9 } });

  blanceDB.sids.add({ address: 'a1234567', assetType: 'Balance', data: { name: '余额1', age: 1 } });
  blanceDB.sids.add({ address: 'b1234567', assetType: 'Balance', data: { name: '余额2', age: 2 } });
  blanceDB.sids.add({ address: 'c1234567', assetType: 'Balance', data: { name: '余额3', age: 3 } });
}

// blanceDB.sids.add({ address: 'c1234567', assetType: 'Balance', data: { name: '余额4', age: 3 } });

blanceDB.sids
  .where('address')
  .equals('c1234567')
  .and((row) => {
    return row.assetType === 'Balance';
  })
  // .toArray()
  .each((result) => {
    console.log('余额', result);
  });

export default blanceDB;
