const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const webpackConfig = require('./webpack/webpack.config.dev.js');
const compiler = webpack(webpackConfig);

const config = require('./config');

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: {
      // 配置 cors 跨域
      'Access-Control-Allow-Origin': '*',
    },
    lazy: false,
    stats: 'minimal',
    // 将 bundle 写到磁盘而不是内存
    writeToDisk: true,
  }),
);
app.use(webpackHotMiddleware(compiler, { path: '/__webpack_HMR__' }));

app.listen(config.dev.port, function () {
  console.log(`App listening on port ${config.dev.port} !\n`);
});
