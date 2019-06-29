const merge = require('webpack-merge')
const common = require('./webpack.common')

const productConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map'
}
module.exports = merge(common, productConfig)
