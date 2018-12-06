'use strict';

const webpackDevConfig = require('./webpack/config/webpack.config.dev');
const webpackProdConfig = require('./webpack/config/webpack.config.prod');

module.exports = (env, argv) => {
    const aMode = env || argv.mode || argv.env || 'development';
    const isDevelopment = aMode === 'development';
    console.log(
        `This is a ${isDevelopment ? 'development' : 'production'} build`,
        ' ',
        isDevelopment
    );

    const _config = isDevelopment ? webpackDevConfig : webpackProdConfig;

    console.log('*config*', typeof _config, _config);
    return _config;
};
