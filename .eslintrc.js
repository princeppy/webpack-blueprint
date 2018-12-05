module.exports = {
  parser: 'babel-eslint',
  extends: [
    'airbnb',
    'prettier',
    'prettie/react',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    browser: true,
    node: true,
    jquery: true
  },
  plugins: ['react', 'jsx-a11y', 'import', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'jsx-a11y/href-no-hash': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }]
  }
};
