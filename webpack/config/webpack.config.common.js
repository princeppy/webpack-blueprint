'use strict';

const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackStrip = require('strip-loader');
const autoprefixer = require('autoprefixer');
const BundleAnalyzer = require('webpack-bundle-analyzer');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');

const StatsGraphPlugin = require('../plugins/stats-graph-plugin');
const WebpackInfoPlugin = require('../plugins/webpack-info-plugin');
const WebpackNodeModulesList = require('../plugins/webpack-node-modules-list');

// eslint-disable-next-line import/order
const WebpackDashboard = require('webpack-dashboard/plugin');

module.exports = argv => {
  // console.log(chalk.yellow.bgRed.bold.underline(`dist ='${path.resolve(__dirname, '../../dist')}'`));

  const baseConfig = {
    entry: [
      // '@babel/polyfill',
      // 'core-js/modules/es6.promise',
      // 'core-js/modules/es6.array.iterator',
      // 'whatwg-fetch',
      // 'jQuery', //
      path.join(process.cwd(), 'src/index.js')
    ],
    output: {
      path: path.resolve(__dirname, '../../dist'),
      publicPath: '/',
      filename: 'main.js',
      chunkFilename: '[name].js'
      // filename: '[name].[hash:4].bundle.js',
      // chunkFilename: '[name].[hash:4].chunk.js'
    },
    optimization: {
      splitChunks: {
        // chunks: 'all',
        cacheGroups: {
          automaticNameDelimiter: '.',
          default: false,
          vendors: false,
          // vendor chunk
          vendor: {
            // name of the chunk
            name: 'vendor',

            // sync + async chunks
            chunks: 'all',

            // import file path containing node_modules
            test: /node_modules/,

            // priority
            priority: 20
          },
          // common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true
          }
          //     common: {
          //       test: /[\\/](jQuery|underscore)[\\/]/gi,
          //       name: 'common',
          //       chunks: 'all',
          //       filename: '[name].[hash:4].chunk.js',
          //       priority: 10
          //     },
          //     vendor: {
          //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          //       name: 'vendor',
          //       chunks: 'all',
          //       filename: '[name].[hash:4].chunk.js',
          //       priority: -10,
          //       reuseExistingChunk: true
          //     }
        }
        // minSize: 30000, //default
        // minSize: 0
      }
      // runtimeChunk: 'single'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: 'eslint-loader'
        },
        {
          // Exposes jQuery for use outside Webpack build
          test: require.resolve('jQuery'),
          use: [
            { loader: 'expose-loader', options: 'jQuery' }, // expose jQuery it as window.jQuery
            { loader: 'expose-loader', options: '$' } // expose jQuery it as window.$
          ]
        },
        // {
        //   // Exposes whatwg-fetch for use outside Webpack build
        //   test: require.resolve('whatwg-fetch'),
        //   // expose whatwg-fetch it as window.fetch
        //   use: [{ loader: 'expose-loader', options: 'f' }]
        // },
        {
          test: /\.(mjs|js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            { loader: 'babel-loader' } //
          ]
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
          test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/gi,
          use: {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]' }
          }
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
      // Webpack.ProvidePlugin : Provides jQuery for other JS bundled with Webpack
      new Webpack.ProvidePlugin({
        // fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
        // // Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
        // Promise: 'es6-promise' // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
        'window.jQuery': 'jQuery',
        'window.$': 'jQuery',
        jQuery: 'jQuery',
        $: 'jQuery'
      }),
      new CleanWebpackPlugin(['dist/*.*', 'statsgraph/*.*'], {
        root: path.resolve(__dirname, '../../')
      }),
      new AsyncChunkNames(),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new Webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:4].css',
        chunkFilename: '[id].[contenthash:4].css'
      })
    ],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      // extensions: paths.moduleFileExtensions
      //   .map(ext => `.${ext}`)
      //   .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
        // Support React Native Web
        // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
        'react-native': 'react-native-web',
        jquery: 'jQuery',
        '~': path.resolve(__dirname, '../../src')
      }
    }
  };
  let duplicateChecker = false;

  // --node-list
  if (argv.nodeList) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled Node Modules List Webpack Plugin'));
    console.log(chalk.red.bgYellow.bold.underline(`             => output is on '/dist/npm-modules.md`));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(new WebpackNodeModulesList({}));
    duplicateChecker = true;
  }

  /*
  // --stats
  if (argv.stats) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled Node Modules List StatsGraphPlugin'));
    console.log(chalk.red.bgYellow.bold.underline(`         => output is on '/statsgraph/npm-modules.md`));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(new StatsGraphPlugin());
    duplicateChecker = true;
  }
  */

  // --webpack-info
  if (argv.webpackInfo) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled WebpackInfoPlugin'));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(new WebpackInfoPlugin());
    duplicateChecker = true;
  }

  // --analyzer
  if (argv.analyzer) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled BundleAnalyzerPlugin'));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(
      new BundleAnalyzer.BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true
        //
      })
    );
    duplicateChecker = true;
  }

  // --dashboard
  if (argv.dashboard) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled Node WebpackDashboard'));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(new WebpackDashboard());
    duplicateChecker = true;
  }

  // --duplicate-checker
  if (argv.duplicateChecker) {
    // duplicate-checker
    // eslint-disable-next-line no-eval
    duplicateChecker = eval(argv.duplicateChecker);
  }

  if (duplicateChecker) {
    console.log(chalk.red.bgYellow.bold.underline('****** => Enabled Node DuplicatePackageCheckerPlugin'));
    baseConfig.plugins = baseConfig.plugins || [];
    baseConfig.plugins.push(new DuplicatePackageCheckerPlugin());
  }

  return baseConfig;
};
