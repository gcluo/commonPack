var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var config = {
  entry: {
    test: [path.resolve(__dirname, 'app/js/test.js')]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://192.168.0.216:9000/',
    filename: 'js/modules/[name].[hash:8].js' //多重入口定义
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
    }
  },
  module: {
    noParse: [],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }, { //import for css
        test: /\.css$/, // Only .css files
        // loader: "style!css" // Run both loaders
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }, {
        test: /\.ttf$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/[name].[hash:8].css", { allChunks: true }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/lib/vendors.[hash:8].js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({'API_URL': '"http://121.40.196.20:10000/h5/v1"'})
  ]
};
var htmlfiles = [
  {
    template: 'templates/test.html',
    inject: 'body',
    filename: 'htmls/test.html',
    chunks: ['vendors', 'test']
  }
];
for (var i = 0; i < htmlfiles.length; i++) {
  config.plugins.push(new HtmlWebpackPlugin(htmlfiles[i]));
}
module.exports = config;
