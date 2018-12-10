module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 1 chrome versions'
            // '>0.2%',
            // 'not dead',
            // 'not ie <= 11',
            // 'not op_mini all' //
          ]
          //   esmodules: true
        },
        useBuiltIns: 'usage',
        // modules: 'commonjs', // default
        debug: true
      }
    ],
    ['@babel/preset-react']
  ],
  plugins: [
    '@babel/plugin-transform-async-to-generator', //
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-syntax-dynamic-import', //
    '@babel/plugin-transform-runtime',
    // [ '@babel/plugin-transform-runtime', { corejs: true, helpers: true, regenerator: true, useESModules: true, helpers: false } ],
    'babel-plugin-macros',
    '@babel/plugin-transform-destructuring',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
  ]
};
