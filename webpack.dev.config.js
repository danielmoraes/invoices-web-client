'use strict'

var base = require('./webpack.base.config.js')
var DashboardPlugin = require('webpack-dashboard/plugin')
var merge = require('webpack-merge')
var path = require('path')
var webpack = require('webpack')

const HOST = process.env.HOST || '127.0.0.1'
const PORT = process.env.PORT || '8888'

module.exports = function () {
  return merge.smartStrategy({ entry: 'prepend' })(base(), {
    entry: [
      'react-hot-loader/patch'
    ],
    output: {
      // necessary for HMR to know where to load the hot update chunks
      publicPath: '/',

      path: path.join(__dirname, 'public'),

      filename: '[name].js'
    },
    devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),

      // do not print bundle build stats
      noInfo: true,

      // enable HMR
      hot: true,

      // embed the webpack-dev-server runtime into the bundle
      inline: true,

      // serve index.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,

      publicPath: '/',
      port: PORT,
      host: HOST
    },
    plugins: [
      // enable HMR globally
      new webpack.HotModuleReplacementPlugin(),

      // more readable module names in the browser console on HMR updates
      new webpack.NamedModulesPlugin(),

      new webpack.NoEmitOnErrorsPlugin(),
      new DashboardPlugin()
    ]
  })
}
