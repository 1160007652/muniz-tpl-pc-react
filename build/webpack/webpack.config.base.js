const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-extension-manifest-plugin');

const { webpackEntry } = require('../utils/getEntry');
const { PROJECT_ROOT, SRC_ROOT, LESS_PATH_ROOT } = require('../utils/getPath');

const pkgJson = require('../../package.json');

const manifestDev = require('../../public/manifest.dev.json');
const manifestPro = require('../../public/manifest.pro.json');
const manifest = process.env.NODE_ENV === 'development' ? manifestDev : manifestPro;

const config = require('../config');

module.exports = {
  entry: webpackEntry,
  output: {
    path: path.resolve(PROJECT_ROOT, 'extensions'),
    globalObject: 'this',
    chunkFilename: 'async/js/[name].js',
    filename: 'js/[name].js',
    // 将热更新临时生成的补丁放到 hot 文件夹中
    hotUpdateChunkFilename: 'hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: 'hot/[hash].hot-update.json',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          // 'eslint-loader',
          'babel-loader',
        ],
        exclude: [/node_modules/],
      },
      {
        test: /\.worker\.js$/,
        use: [
          {
            loader: 'worker-loader',
            options: { inline: true },
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: config.theme,
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(LESS_PATH_ROOT, 'less-var.less')],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(ico|png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, //
          name: 'img/[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.less', '.jsx', '.ts'],
    modules: [SRC_ROOT, path.resolve(PROJECT_ROOT, './node_modules')],
    alias: {
      _src: SRC_ROOT,
      _components: path.resolve(SRC_ROOT, './components/'),
      _containers: path.resolve(SRC_ROOT, './containers/'),
      _constants: path.resolve(SRC_ROOT, './constants/'),
      _utils: path.resolve(SRC_ROOT, './utils'),
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
    new AntdDayjsWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public/images/', to: 'images' }] }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      filename: 'popup.html',
      title: 'Popup 页面',
      inject: true,
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      filename: 'options.html',
      title: 'Findora 配置页面',
      inject: true,
      chunks: ['options'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'async/css/[name].css',
      ignoreOrder: false,
    }),
    new ManifestPlugin({
      config: {
        base: manifest,
        extend: {
          version: pkgJson.version.split('-')[0],
        },
      },
    }),
  ],
};
