const fs = require('fs');
const path = require('path');
const url = require('url');
const SseStream = require('ssestream');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const webpackConfig = require('./webpack/webpack.config.dev.js');
const compiler = webpack(webpackConfig);

const config = require('./config.js');

/** content 热更新插件 */
const extensionAutoReload = (_compiler, opts) => {
  const middleware = (req, res, next) => {
    // 路由匹配失败， 不执行
    if (url.parse(req.url).pathname === opts.path) {
      const se = new SseStream(req);
      se.pipe(res);

      let closed = false;
      const contentScriptsModules = fs.readdirSync(path.resolve(__dirname, '../src/pages/Contents'));

      _compiler.hooks.done.tap('extension-auto-reload-plugin', (stats) => {
        if (closed) return;
        const { modules } = stats.toJson({ all: false, modules: true });

        let shouldReload = false;

        if (modules.length > 0) {
          modules.forEach((item) => {
            let moduleChunkName = item.chunks[0];
            moduleChunkName = moduleChunkName.replace(moduleChunkName[0], moduleChunkName[0].toLocaleUpperCase());

            if (contentScriptsModules.includes(moduleChunkName)) {
              shouldReload = true;
            }
          });
        }

        if (shouldReload) {
          se.write(
            {
              event: 'compiled successfully',
              data: {
                action: 'reload extension and refresh current page',
              },
            },
            'utf-8',
            (err) => {
              if (err) {
                console.error(err);
              }
            },
          );
        }
      });

      res.on('close', () => {
        closed = true;
        se.unpipe(res);
      });
    }
    next();
  };

  return middleware;
};

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

// 正常 热更新
app.use(webpackHotMiddleware(compiler, { path: '/__webpack_HMR__' }));

// content 模块 - 自动重启
app.use(extensionAutoReload(compiler, { path: '/__webpack_ext_reload__' }));

app.listen(config.dev.port, function () {
  console.log(`App listening on port ${config.dev.port} !\n`);
});
