'use strict';

// const fs = require('fs-extra');
const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const argv = require('yargs').argv;
const config = require('config');

/* */
// const paths = require('./paths');
const common = require('./webpack.config.common')(argv);
console.log('generate-stat rs=', config.get('generate-stat'));

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-eval-source-map',
  optimization: {
    minimize: false,
    minimizer: []
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../src'),
    publicPath: '/',
    inline: true,
    watchContentBase: true,
    overlay: true,
    hot: true
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    // new Webpack.NamedChunksPlugin(), // Enabled deafult on 'development' mode
    // new Webpack.NamedModulesPlugin(), // Enabled deafult on 'development' mode
    new Webpack.HotModuleReplacementPlugin()
  ]
});
