/**
 * @ Author: zhipanLiu
 * @ Create Time: 2020-06-02 17:20:42
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 14:54:28
 * @ Description: 加解密库
 */

import crypto from 'crypto-browserify';

const ALGO = 'aes-256-gcm';

const encrypt = function (str, password) {
  // Derive password
  const iv = Buffer.from(crypto.randomBytes(16), 'utf8');
  // 变慢
  const derivedKey = crypto.pbkdf2Sync(password, 'salt', 1, 32, 'sha256');

  // Create cipher
  const cipher = crypto.createCipheriv(ALGO, derivedKey, iv);
  let enc = cipher.update(str, 'utf8', 'base64');
  enc += cipher.final('base64');
  return { content: enc, iv, tag: cipher.getAuthTag() };
};
const decrypt = function (encrypted, password) {
  // Derive password
  // TODO salt passwords properly
  const derivedKey = crypto.pbkdf2Sync(password, 'salt', 1, 32, 'sha512');
  // const derivedKey = crypto.scryptSync(password, 'salt', 32);
  // Decrypt
  const decipher = crypto.createDecipheriv(ALGO, derivedKey, encrypted.iv);
  decipher.setAuthTag(encrypted.tag);
  let decrypted = decipher.update(encrypted.content, 'base64', 'utf8');

  try {
    decrypted += decipher.final('utf8');
  } catch (error) {
    return 'password error';
  }

  return decrypted;
};

export default { encrypt, decrypt };
