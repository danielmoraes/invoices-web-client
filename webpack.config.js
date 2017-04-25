'use strict'

var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin')
var DashboardPlugin = require('webpack-dashboard/plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var merge = require('webpack-merge')
var path = require('path')
var WebpackChunkHash = require('webpack-chunk-hash')
var WebpackCleanupPlugin = require('webpack-cleanup-plugin')
var webpack = require('webpack')

const DEV_HOST = process.env.HOST || '127.0.0.1'
const DEV_PORT = process.env.PORT || '8888'

const baseConfig = () => ({
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
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src')
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
          path.resolve(__dirname, 'src')
        ],
        loader: 'file-loader'
      },
      {
        test: /\.(woff|woff2)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url-loader?prefix=font/&limit=5000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.gif/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.jpg/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'url-loader?limit=10000&mimetype=image/jpg'
      },
      {
        test: /\.png/,
        include: [
          path.resolve(__dirname, 'src')
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
})

const configProd = (base) => merge.smart(base(), {
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

const configDev = (base) => merge.smartStrategy({ entry: 'prepend' })(base(), {
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
    port: DEV_PORT,
    host: DEV_HOST
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

const config = (env) =>
  (env === 'production') ? configProd(baseConfig) : configDev(baseConfig)

module.exports = config
