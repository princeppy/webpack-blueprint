module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        // modules:'commonjs' //default
        modules: false
      }
    ],
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-async-to-generator', //
    '@babel/plugin-proposal-object-rest-spread', //
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
