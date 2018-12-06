'use strict';

module.exports = (env, argv) => {
  const aMode = env || argv.mode || argv.env || 'development';
  const isDevelopment = aMode === 'development';
  console.log(`This is a ${isDevelopment ? 'development' : 'production'} build`, ' ', isDevelopment);

  const _config = isDevelopment
    ? require('./webpack/config/webpack.config.dev')
    : require('./webpack/config/webpack.config.prod');

  console.log(argv.stats);

  if (!isDevelopment && argv.stats) _config.stats = true;
  // console.log('*config*', typeof _config, _config);

  return _config;
};
