'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = argv => {
  const baseConfig = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minSize: 0
          }
          //     default: {
          //         minChunks: 2,
          //         priority: -20,
          //         reuseExistingChunk: true
          //     }
        },
        minSize: 0
      }
    },
    module: {
      rules: [
        {
          test: /\.(mjs|js|jsx)$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        },
        {
          test: /\.s?css$/,
          // use: ["style-loader", "css-loader"]
          use: [
            // { loader: "style-loader" },
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]_[local]_[hash:base64]',
                sourceMap: true,
                minimize: true
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: { minimize: false }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist/*.*', 'statsgraph/*.*'], {
        root: path.resolve(__dirname, '../')
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      })
    ]
  };

  // if (argv.stat) {
  //   console.log(chalk.underline(chalk.yellow('****** => Enabled StatsGraphPlugin')));
  //   baseConfig.plugins = baseConfig.plugins || [];
  //   baseConfig.plugins.push(new StatsGraphPlugin());
  // }

  // if (argv.info) {
  //   console.log(chalk.underline(chalk.yellow('****** => Enabled WebpackInfoPlugin')));
  //   baseConfig.plugins = baseConfig.plugins || [];
  //   baseConfig.plugins.push(new WebpackInfoPlugin());
  // }

  // if (argv.analyze) {
  //   console.log(chalk.underline(chalk.yellow('****** => Enabled BundleAnalyzerPlugin')));
  //   baseConfig.plugins = baseConfig.plugins || [];
  //   baseConfig.plugins.push(new BundleAnalyzerPlugin());
  // }

  // if (argv.dashboard) {
  //   console.log(chalk.underline(chalk.yellow('****** => Enabled WebpackDashboard')));
  //   baseConfig.plugins = baseConfig.plugins || [];
  //   baseConfig.plugins.push(new WebpackDashboard());
  // }

  return baseConfig;
};
