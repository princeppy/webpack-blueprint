/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import 'core-js/es6/promise';

export default function loadPolyfills() {
  const fillFetch = () =>
    new Promise(resolve => {
      if ('fetch' in window) return resolve();

      require.ensure(
        [],
        () => {
          require('whatwg-fetch');

          resolve();
        },
        'fetch'
      );
    });

  const fillIntl = () =>
    new Promise(resolve => {
      if ('Intl' in window) return resolve();

      require.ensure(
        [],
        () => {
          require('intl');
          require('intl/locale-data/jsonp/en.js');

          resolve();
        },
        'Intl'
      );
    });

  const fillCoreJs = () =>
    new Promise(resolve => {
      if (
        'startsWith' in String.prototype &&
        'endsWith' in String.prototype &&
        'includes' in Array.prototype &&
        'assign' in Object &&
        'keys' in Object
      )
        return resolve();

      require.ensure(
        [],
        () => {
          require('core-js');

          resolve();
        },
        'core-js'
      );
    });

  return Promise.all([fillFetch(), fillIntl(), fillCoreJs()]);
}
