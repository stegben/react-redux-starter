const path = require('path');
const express = require('express');
const webpack = require('webpack');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const config = require('../webpack.config.dev');

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.json({ type: '*/*' }));
app.use(morgan('combined'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

module.exports = app;
