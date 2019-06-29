const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: '[name]-[hash:8].[ext]',
            outputPath: 'assets/'
          }
        }
      },
      {
        test: /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
            name: '[name].[ext]'
          }
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      // async 表示只对异步代码生效， all 同异步， initial： 同步
      chunks: 'all'
    },
    // 针对旧版本每次打包即使没做变更，生成的文件名称依然发生变化的处理
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: '=.-'
    }),
    new CleanWebpackPlugin()
  ]
}
