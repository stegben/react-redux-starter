const webpack = require('webpack');
const config = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.devtool = 'source-map';
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
    },
  }),
  new ExtractTextPlugin('style.css', { allChunks: true }),
];

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' // eslint-disable-line
  ),
});

module.exports = config;
