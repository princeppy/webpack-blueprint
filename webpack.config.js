'use strict';

module.exports = (env, argv) => {
  const aMode = env || argv.mode || argv.env || 'development';
  const isDevelopment = aMode === 'development';
  console.log(`This is a ${isDevelopment ? 'development' : 'production'} build`, ' ', isDevelopment);

  const config = isDevelopment
    ? require('./webpack/config/webpack.config.dev')
    : require('./webpack/config/webpack.config.prod');

  if (!isDevelopment && argv.stats) config.stats = true;
  // console.log('*config*', typeof _config, config);

  return config;
};
