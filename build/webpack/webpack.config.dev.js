const merge = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const ChromeExtensionLauncher = require('webpack-chrome-extension-launcher');

const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    // 设置cleanStaleWebpackAssets 是为了保证后续热更新时, 不在清空所有数据, 只在第一次运行时清空数据
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 支持热更新
    new HotModuleReplacementPlugin(),
    // 运行时,自动打开浏览器扩展
    new ChromeExtensionLauncher(),
  ],
});