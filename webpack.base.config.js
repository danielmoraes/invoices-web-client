'use strict'

var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var { resolve } = require('path')
var WebpackChunkHash = require('webpack-chunk-hash')
var webpack = require('webpack')

module.exports = function () {
  return {
    entry: [
      './src/index.js'
    ],
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  minimize: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2)$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?prefix=font/&limit=5000'
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.gif/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?limit=10000&mimetype=image/gif'
        },
        {
          test: /\.jpg/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?limit=10000&mimetype=image/jpg'
        },
        {
          test: /\.png/,
          include: [
            resolve(__dirname, 'src')
          ],
          loader: 'url-loader?limit=10000&mimetype=image/png'
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: function (module) {
          return module.context && module.context.indexOf('node_modules') !== -1
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest'
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        allChunks: true
      }),
      new HtmlWebpackPlugin({
        template: './src/template.html',
        favicon: './src/images/favicon.png'
      })
    ]
  }
}
