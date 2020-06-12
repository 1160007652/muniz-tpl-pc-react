const path = require('path');
const merge = require('webpack-merge');
const { BannerPlugin } = require('webpack');
const base = require('./webpack.config.base');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = require('../config');

module.exports = merge(base, {
  mode: 'production',
  externals: {
    // react: 'React',
    // 'react-dom': 'ReactDOM',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false }), new OptimizeCSSAssetsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BannerPlugin({
      raw: true,
      banner: `/* ${config.copyrightDesc} */`,
    }),
  ],
});
