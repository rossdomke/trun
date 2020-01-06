const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './server/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server'),
  },
  node: {
    fs: 'empty',
    __dirname: true,
  },
  externals: [nodeExternals()],
};
