const merge = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const productConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:9].css',
      chunkFilename: '[name].chunk.css'
    })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
}
module.exports = merge(common, productConfig)
