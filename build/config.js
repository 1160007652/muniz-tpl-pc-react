/**
 * 配置文件
 */

const { getThemeVariables } = require('antd/dist/theme');
// const aliyunTheme = require('@ant-design/aliyun-theme');

module.exports = {
  name: 'findora-wallet-ext',
  copyrightDesc: '版权描述-声明-预留-塞入打包的文件头部',
  dev: {
    port: 9090,
    ip: '127.0.0.1',
    // 连接后端API的URL
    apiUrl: 'http://yourserver.com/',
  },
  publish: {
    publicPath: '/',
  },
  theme: {
    '@primary-color': '#661aff',
    // ...aliyunTheme,
    // ...getThemeVariables({
    //   dark: true, // 开启暗黑模式
    //   compact: true, // 开启紧凑模式
    // }),
  },
};
