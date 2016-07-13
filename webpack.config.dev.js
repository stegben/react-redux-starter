const webpack = require('webpack');
const config = require('./webpack.config.base');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


config.devtool = 'cheap-module-eval-source-map';
config.output.publicPath = '';
config.plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __DEV__: false,
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
];
config.entry.push('webpack-hot-middleware/client');
config.module.loaders.push({
  test: /\.css$/,  // 針對 css 檔
  loaders: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader' // eslint-disable-line
  ),
});

module.exports = config;
