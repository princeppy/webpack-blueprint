'use strict';

// const fs = require('fs-extra');
// const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('yargs').argv;
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');

/* */
// const paths = require('./paths');
const common = require('./webpack.config.common')(argv);

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
    // minimizer: [new UglifyJsPlugin({ sourceMap: true })]
  }
  // plugins: [new uglifyJsPlugin({ sourceMap: true })]
});
