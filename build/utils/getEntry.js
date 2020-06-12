/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 11:46:25
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 12:59:14
 * @ Description: webpack 打包入口配置文件
 */

const path = require('path');
const { SRC_ROOT, HMR_CLIENT_SCRIPT } = require('./getPath');

const devEntry = {
  background: [HMR_CLIENT_SCRIPT, path.resolve(SRC_ROOT, 'pages/Background/index.js')],
  content: path.resolve(SRC_ROOT, 'pages/Contents/index.js'),
  options: [HMR_CLIENT_SCRIPT, 'react-hot-loader/patch', path.resolve(SRC_ROOT, 'pages/Options/index.js')],
  popup: [HMR_CLIENT_SCRIPT, 'react-hot-loader/patch', path.resolve(SRC_ROOT, 'pages/Popup/index.js')],
};
const proEntry = {
  background: path.resolve(SRC_ROOT, 'pages/Background/index.js'),
  content: path.resolve(SRC_ROOT, 'pages/Contents/index.js'),
  options: path.resolve(SRC_ROOT, 'pages/Options/index.js'),
  popup: path.resolve(SRC_ROOT, 'pages/Popup/index.js'),
};

module.exports = {
  webpackEntry: process.env.NODE_ENV === 'development' ? devEntry : proEntry,
};
