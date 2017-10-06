// @flow
const https = require('https');
const path = require('path');
const express = require('express');
const devcert = require('devcert-with-localhost').default;
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

const DIST_DIR = path.join(__dirname, 'dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
const DEFAULT_PORT = 4000;

const compiler = webpack(config);
const app = express();

app.set('port', process.env.PORT || DEFAULT_PORT);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
);
app.use(webpackHotMiddleware(compiler));

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
    if (err) {
      return next(err);
    }
    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

devcert('my-app', { installCertutil: true }).then(ssl => {
  https.createServer(ssl, app).listen(app.get('port'));
  console.log(`app listen ${app.get('port')}`); // eslint-disable-line
});
