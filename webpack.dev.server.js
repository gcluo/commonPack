var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
//insert hot loader server
var entrykeys = Object.keys(config.entry);
for (var i = 0; i < entrykeys.length; i++) {
  var key = entrykeys[i];
  config.entry[key].unshift("webpack-dev-server/client?http://localhost:3000/", "webpack/hot/dev-server");
};
var server = new webpackDevServer(webpack(config), {
  contentBase: __dirname + '/app',
  hot: true,
  colors: true,
  quiet: false,
  noInfo: false,
  stats: {
    colors: true
  },
  publicPath: '/js/'
});
server.listen(3000);
