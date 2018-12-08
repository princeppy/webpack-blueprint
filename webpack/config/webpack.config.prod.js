'use strict';

// const fs = require('fs-extra');
// const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
// eslint-disable-next-line prefer-destructuring
const argv = require('yargs').argv;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackStrip = require('strip-loader');

/* */
// const paths = require('./paths');
const common = require('./webpack.config.common')(argv);

module.exports = merge(common, {
  mode: 'production',
  devtool: 'none', // 'nosources-source-map',
  stats: 'errors-only',
  bail: true,
  // optimization: {
  //   // minimize: true, // optimization.minimize is 'true' by default in production mode.
  //   // minimizer: [new TerserPlugin({})],  // optimization.minimizer is 'TerserPlugin' by default in production mode.
  //   // usedExports: true, // optimization.usedExports is enabled in production
  //   // sideEffects: true, // optimization.sideEffects is enabled in production mode
  // },
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { loader: 'babel-loader' }, //
          { loader: WebpackStrip.loader('debug', 'console.log') } // Remove debug and console.log
        ]
      }
    ]
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new Webpack.optimize.ModuleConcatenationPlugin() // Enabled deafult on 'development' mode
    // new uglifyJsPlugin({ sourceMap: true })
  ]
});
