const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
require("@babel/register");

const config = {
  // entry: ['@babel/polyfill','./src/index.js'],
  entry: {
    index: ['@babel/polyfill/noConflict','./src/index.js'],
  },
  output: {
    // path: path.resolve(__dirname, 'public/scripts'),
    path: path.resolve(__dirname, 'public'),
    filename: '[name]bundle.js'
  },
  module: {
    rules : [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: '/public/index.html',
        hash: true,
        title: 'My Vinmonopolet'
    })
  ],
  resolve: {
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    // contentBase: path.resolve(__dirname, 'public'),
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    //   "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    // },
    compress: true,
    port: 9000,
    open: true,
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false,
    }
  },
  watch: false,
  devtool: 'source-map',
};

module.exports = config;