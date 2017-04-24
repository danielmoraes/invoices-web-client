'use strict'

var base = require('./webpack.base.config.js')
var merge = require('webpack-merge')
var path = require('path')
var WebpackCleanupPlugin = require('webpack-cleanup-plugin')
var webpack = require('webpack')

module.exports = function () {
  return merge.smart(base(), {
    output: {
      publicPath: './',
      path: path.join(__dirname, 'public'),
      filename: '[name].[chunkhash].js'
    },
    plugins: [
      new WebpackCleanupPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          drop_console: true,
          drop_debugger: true
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]
  })
}
