module.exports = {
  globals: {
    _: false,
    __dirname: false,
    document: false,
    console: false,
    module: false
  },
  parser: 'babel-eslint',
  extends: [
    'airbnb', 
    'eslint:recommended',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
    //
  ],
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  settings: {
    'files.eol': '\r\n',
    'eslint.packageManager': 'yarn'
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    strict: [0],
    'global-require': 0,
    'no-console': 0,
    'no-unused-vars': 1,
    'linebreak-style': [1, 'windows'],
    'prettier/prettier': 'error',
    'jsx-a11y/href-no-hash': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unused-prop-types': 0,
    'prefer-const': [1]
  }
};
