module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': 'off',// process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': 'off', //process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
