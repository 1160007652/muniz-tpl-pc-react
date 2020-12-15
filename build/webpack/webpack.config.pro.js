const { merge } = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = require('./webpack.config.base');

base.output.publicPath = '/';

module.exports = merge(base, {
  mode: 'production',
  externals: {},
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 6,
          warnings: false,
          extractComments: false, // 去除 js 中的注释
          output: {
            comments: false,
          },
          compress: {
            drop_console: true, // 去除 console 打印
          },
          ie8: false,
        },
      }),
      ,
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
});
