module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // useBuiltIns: 'entry',
        useBuiltIns: 'usage',
        modules: 'commonjs', // default
        // modules: false, // custom
        debug: true
      }
    ],
    ['@babel/preset-react']
  ],
  plugins: [
    '@babel/plugin-transform-async-to-generator', //
    '@babel/plugin-proposal-object-rest-spread', //
    '@babel/plugin-syntax-dynamic-import', //
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false
      }
    ]
  ]
};
