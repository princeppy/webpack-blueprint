module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:prettier/recommended'],
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
    strict: [0],
    'no-console': [0],
    'no-unused-vars': [1],
    'linebreak-style': ['error', 'windows'],
    'prettier/prettier': ['error'],
    'jsx-a11y/href-no-hash': [0],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unused-prop-types': [0]
  }
};
