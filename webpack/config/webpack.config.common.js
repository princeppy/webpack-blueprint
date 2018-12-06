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

module.exports = argv => {
  console.log(chalk.yellow.bgRed.bold.underline(`dist ='${path.resolve(__dirname, '../../dist')}'`));

  const baseConfig = {
    entry: [
      '@babel/polyfill', //
      'whatwg-fetch',
      'jQuery', //
      path.join(process.cwd(), 'src/index.js')
    ],
    output: {
      path: path.resolve(__dirname, '../../dist'),
      publicPath: '/',
      filename: '[name].[hash].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          vendors: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'vendor',
            chunks: 'all',
            filename: '[name].bundle.js',
            priority: -10,
            minSize: 0
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        },
        // minSize: 30000, //default
        minSize: 0
      }
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
        {
          // Exposes whatwg-fetch for use outside Webpack build
          test: require.resolve('whatwg-fetch'),
          use: [
            { loader: 'expose-loader', options: 'f' } // expose whatwg-fetch it as window.fetch
          ]
        },
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
      new CleanWebpackPlugin(['dist/*.*', 'statsgraph/*.*'], {
        root: path.resolve(__dirname, '../')
      }),
      // Webpack.ProvidePlugin : Provides jQuery for other JS bundled with Webpack
      new Webpack.ProvidePlugin({
        'window.jQuery': 'jQuery',
        'window.$': 'jQuery',
        jQuery: 'jQuery',
        $: 'jQuery',
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        // Promise: 'es6-promise' // Thanks Aaron (https://gist.github.com/Couto/b29676dd1ab8714a818f#gistcomment-1584602)
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      }),
      new Webpack.LoaderOptionsPlugin({ options: { postcss: [autoprefixer()] } }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
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
