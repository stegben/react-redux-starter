const path = require('path');

module.exports = {
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'server/public'),
    filename: 'bundle.js',
    publicPath: '/',
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
    }, {
      test: /\.json$/,
      loaders: ['json-loader'],
    }],
  },
};
