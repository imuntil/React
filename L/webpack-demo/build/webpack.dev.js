const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: './dist',
    // 自动开启浏览器
    open: true,
    // hmr
    hot: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
}

module.exports = merge(common, devConfig)
