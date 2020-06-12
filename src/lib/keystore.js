/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-02 17:20:42
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-11 18:01:41
 * @ Description: 轻量级JSON可序列化的密钥库。存储加密的Findora密钥对
 */

import Encrypt from './encrypt';

class KeyStore {
  /**
   * Creates an empty KeyStore.
   * @constructor
   */
  constructor() {
    this.keys = [];
  }

  /**
   * If successful, adds a new named encrypted keypair to the KeyStore.
   * @param {string} kpString - String representation of keypair to add to KeyStore.
   * @param {string} password - Password to encrypt keypair with.
   * @param {string} name - Keypair name (e.g. Bob, Alice, bank_key).
   * @throws Will throw an error if a keypair with the given name already exists.
   *
   *
   */

  /**
   *如果成功，则将新的命名加密密钥对添加到KeyStore。
   * @param {string} kpString - 要添加到KeyStore的密钥对的字符串表示形式。
   * @param {string} password - 用于加密密钥对的密码。
   * @param {string} name - 密钥对名称（例如Bob，Alice，bank_key）。
   * @throws 如果给定名称的密钥对已经存在，将引发错误。
   */
  addNewKeypair(password, name, kpString) {
    const encrypted = Encrypt.encrypt(kpString, password);
    this.keys.push({ encryptedKey: encrypted, name, salt: 'salt' });
  }

  // Fetch encrypted keypair at a certain index
  // 在特定索引处获取加密的密钥对
  getKeypairAtIndex(idx) {
    if (idx >= this.keys.length) {
      throw new Error('No encrypted key at this index');
    }

    return this.keys[idx];
  }

  // Get index of encrypted keypair with a given name
  // 获取具有给定名称的加密密钥对的索引
  getIdxWithName(name) {
    for (let index = 0; index < this.keys.length; index += 1) {
      const key = this.keys[index];
      if (key.name === name) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Fetch a decrypted keypair from a KeyStore.
   * @param {string} name - Name of keypair to fetch.
   * @param {string} password - Decryption key.
   * @throws throws an en error if no keypair with the given name exists.
   * @throws throws an en error if keypair cannot be decrypted.
   */

  /**
   * 从密钥库中获取解密的密钥对。
   * @param {string} name - 要获取的密钥对的名称。
   * @param {string} password - 解密密钥。
   * @throws 如果不存在具有给定名称的密钥对，则会引发错误。
   * @throws 如果无法解密密钥对，则会引发错误。
   */
  getDecryptedKeypairWithName(password, name) {
    const key = this.getKeypairWithName(name).encryptedKey;
    return Encrypt.decrypt(key, password);
  }

  /**
   * Fetch a named keypair from a KeyStore.
   * @param {string} name - Name of keypair to fetch.
   * @throws throws an en error if no keypair with the given name exists.
   */

  /**
   * 从密钥库中获取一个命名的密钥对。
   * @param {string} name - 要获取的密钥对的名称。
   * @throws 如果不存在具有给定名称的密钥对，则会引发错误。
   */
  getKeypairWithName(name) {
    const idx = this.getIdxWithName(name);
    if (idx < 0) {
      throw new Error(`No encrypted key with name: ${name}`);
    } else {
      return this.keys[idx];
    }
  }
}

export default KeyStore;
