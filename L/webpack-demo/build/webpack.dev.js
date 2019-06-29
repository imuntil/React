const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  devServer: {
    contentBase: './dist',
    // 自动开启浏览器
    open: true,
    // hmr
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
    ]
  }
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(common, devConfig)
