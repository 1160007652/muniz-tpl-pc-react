/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-03 09:59:55
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-22 17:14:31
 * @ Description: 网络钱包 WebKeyStore , 导出单列模式 模块
 */

import KeyStore from '_src/lib/keystore';
import Encrypt from '_src/lib/encrypt';
import { saveAs } from 'file-saver';

/**
 * Class representing a dot.
 * @category Services
 * @class
 * @extends KeyStore
 */
class WebKeyStore extends KeyStore {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  /**
   * JSON-encodes KeyStore and writes it to a file.
   * 下载Json编码后的 KeyStore 文件
   */
  writeToFile = ({ fileName, name }) => {
    // 过滤当前用户的keyStore
    const currentKeys = this.keys.filter((keyData) => keyData.name === name);

    const jsonKeys = currentKeys.filter((keyData) => {
      const originalKey = keyData.encryptedKey;
      if (keyData.name === name) {
        return {
          encryptedKey: {
            content: originalKey.content,
            iv: JSON.stringify(originalKey.iv),
            tag: JSON.stringify(originalKey.tag),
          },
          salt: keyData.salt,
          name: keyData.name,
        };
      }
      return false;
    });

    const blob = new Blob([JSON.stringify(jsonKeys[0])], { type: 'utf-8' });
    // chrome.downloads.download({
    //   url: URL.createObjectURL(blob),
    //    filename: `${fileName}.txt`,
    //   saveAs: false,
    // });
    saveAs(blob, `${fileName}.txt`);
  };

  /**
   * 添加命名加密密钥对添加到KeyStore
   */
  addNewKeypair = async ({ password, name }) => {
    const Wasm = await import('wasm');
    const keyPairStr = Wasm.keypair_to_str(Wasm.new_keypair());

    // 调用父类 addNewKeypair 方法, 将命名加密密钥对添加到KeyStore
    super.addNewKeypair(password, name, keyPairStr);
    const keyPairObj = await Wasm.keypair_from_str(keyPairStr);
    const address = await Wasm.get_pub_key_str(keyPairObj);

    // 下载KeyStore
    this.writeToFile({ fileName: address.replace(/^_|_$/g, ''), name });
  };

  /**
   * @description 恢复keyStore密钥对
   */
  setKeypair = async ({ keyStoreJson, password }) => {
    const Wasm = await import('wasm');

    // const keys = keyStoreJson.map((keyData) => {
    //   const originalKey = keyData.encryptedKey;
    //   return {
    //     encryptedKey: {
    //       content: originalKey.content,
    //       iv: Buffer.from(originalKey.iv.data),
    //       tag: Buffer.from(originalKey.tag.data),
    //     },
    //     salt: keyData.salt,
    //     name: keyData.name,
    //   };
    // });
    const originalKey = keyStoreJson.encryptedKey;
    const keys = {
      encryptedKey: {
        content: originalKey.content,
        iv: Buffer.from(originalKey.iv.data),
        tag: Buffer.from(originalKey.tag.data),
      },
      salt: keyStoreJson.salt,
      name: keyStoreJson.name,
    };

    const keyPairStr = Encrypt.decrypt(keys.encryptedKey, password);

    try {
      const keypair = await Wasm.keypair_from_str(keyPairStr);
      const publickey = await Wasm.get_pub_key_str(keypair);

      // If the named key pair does not exist, add the key pair to keys
      // 如果不存在该命名的密钥对时,将密钥对添加到keys中

      if (!this.hasKeypairWithName(keys.name)) {
        this.keys.push(keys);
      }

      return {
        keypair,
        publickey: publickey.replace(/"/g, ''),
      };
    } catch (error) {
      console.log(error);
      return 'passworderror';
    }
  };

  // Is there an encryption key pair with the given name
  // 是否存在给定名称的加密密钥对
  hasKeypairWithName(name) {
    return super.getIdxWithName(name) !== -1;
  }
}

export default new WebKeyStore();
