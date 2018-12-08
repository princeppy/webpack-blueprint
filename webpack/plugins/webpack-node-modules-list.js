'use strict';

/* eslint-disable prefer-const */
/* eslint-disable one-var */

const defaultOptions = { outputFile: 'npm-modules', format: 'markdown' };
const fs = require('fs');
const path = require('path');

/**
 * Extracts and returns the license/licenses abbrevations
 * from the respective fields.
 * @param  {Object} packageJson The package.json file content as object.
 * @return {String}
 */
function getLicenses(packageJson) {
  if (packageJson.licenses && packageJson.licenses instanceof Array) {
    return packageJson.licenses.map(license => license.type).join(', ');
  }
  if (packageJson.licenses) {
    // TODO: Refactor this to reduce duplicate code. Note "licenses" vs "license".
    return (packageJson.licenses && packageJson.licenses.type) || packageJson.licenses;
  }
  return (packageJson.license && packageJson.license.type) || packageJson.license;
}

// function WebpackNodeModulesList(options) {
//   this.options = Object.assign({}, defaultOptions, options);
//   console.log('...WebpackNodeModulesList', this.options);
// }
class WebpackNodeModulesList {
  constructor(options) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  // WebpackNodeModulesList.prototype.apply = compiler => {
  apply(compiler) {
    // eslint-disable-next-line no-underscore-dangle
    let _this = this;
    // compiler.hooks.emit.tap((compilation, callback) => {
    compiler.plugin('emit', (compilation, callback) => {
      let npmModulesList = '',
        npmModules = new Map(),
        npmModulesJsonList = [],
        extension;

      compilation.chunks.forEach(chunk => {
        if (_this.options.chunkName && _this.options.chunkName !== chunk.name) {
          return;
        }

        let chunkModules = chunk.getModules ? chunk.getModules() : chunk.modules;
        // exclude anything that isn't a node module
        chunkModules
          .filter(module => module.context && module.context.indexOf('node_modules') !== -1)
          .forEach(module => {
            const contextArray = module.context.split(path.sep);

            contextArray.splice(contextArray.indexOf('node_modules') + 2);

            let context = contextArray.join(path.sep),
              // npmModule = contextArray[contextArray.indexOf('node_modules') + 1],
              packageJsonFile = path.join(context, 'package.json'),
              packageJson = fs.existsSync(packageJsonFile)
                ? JSON.parse(fs.readFileSync(packageJsonFile, 'UTF-8'))
                : null;

            if (!(packageJson === null || packageJson === undefined)) {
              npmModules.set(packageJson.name, {
                name: packageJson.name,
                version: packageJson.version,
                homepage: packageJson.homepage,
                license: getLicenses(packageJson)
              });
            }
          });
      });

      Array.from(npmModules.keys())
        .sort()
        .map(key => npmModules.get(key))
        .forEach(module => {
          if (_this.options.format === 'markdown') {
            npmModulesList += `[${module.name}@${module.version}: ` + `${module.license}](${module.homepage})  \n`;
            extension = 'md';
          } else if (_this.options.format === 'json') {
            npmModulesJsonList.push({
              name: module.name,
              type: module.license,
              version: module.version,
              source: module.homepage
            });
            npmModulesList = JSON.stringify(npmModulesJsonList, null, 2);
            extension = 'json';
          } else {
            throw new Error(`Format "${_this.options.format}" is not supported by webpack-node-modules-list.`);
          }
        });

      // Insert this list into the Webpack build as a new file asset:
      // eslint-disable-next-line no-param-reassign
      compilation.assets[`${_this.options.outputFile}.${extension}`] = {
        source: () => npmModulesList,
        size: () => npmModulesList.length
      };

      callback();
    });
  }
}

module.exports = WebpackNodeModulesList;
