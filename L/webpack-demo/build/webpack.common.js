const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

function addFile() {
  const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
  return files.map(v => {
    const filepath = path.resolve(__dirname, '../dll', v)
    return /dll\.js$/.test(v)
      ? new AddAssetHtmlWebpackPlugin({ filepath })
      : new webpack.DllReferencePlugin({ manifest: filepath })
  })
}

module.exports = {
  entry: {
    main: './src/index.js',
    list: './src/List.js'
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
      title: '首页',
      filename: 'index.html',
      chunks: ['runtime', 'vendors', 'main']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: '列表页',
      filename: 'list.html',
      chunks: ['runtime', 'vendors', 'list']
    }),
    new CleanWebpackPlugin(),
    // 简单的写法
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../dll/reacts.dll.js')
    // }),
    // new AddAssetHtmlWebpackPlugin({
    //   filepath: path.resolve(__dirname, '../dll/vendors.dll.js')
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dll/reacts.manifest.json')
    // }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
    // })
    // 优化写法
    ...addFile()
  ]
}
