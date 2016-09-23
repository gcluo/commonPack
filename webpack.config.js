var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var config = {
  entry: {
    test: [path.resolve(__dirname, 'app/js/test.js')]
  },
  output: {
    path: path.resolve(__dirname, 'app/js'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {

    }
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    // 'react': 'React'
  },
  module: {
    noParse: [],
    loaders: [{
        test: /\.vue$/,
        loader: 'vue'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },

      { //import for css
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
      }, {
        test: /\.ttf$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'API_URL': '"http://192.168.0.86:8080/v1"'
    }),
  ]
};

module.exports = config;
