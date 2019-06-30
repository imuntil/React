const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    // 引入模块式不用编写文件后缀，系统会按照名称来查找相关的js或jsx文件
    extensions: ['.js', '.jsx'],
    // 引入目录时，会自动查找目录下的index.js 或 some_test.js
    mainFiles: ['index.js', 'some_test.js'],
    // 目录别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
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
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _join: ['lodash', 'join']
    })
  ]
}
