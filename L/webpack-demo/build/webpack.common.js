const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: '[name]-[hash:9].js',
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
      chunks: 'all',
      // 大于30kb，才会进行代码分割。
      minSize: 30000,
      // 大于maxSize，会尝试进行再次分割。 例： maxSize=50000(50kb),
      // 项目引入了一个100kb的库jquery，那么code spliting会尝试将jquery分割成两个50kb的包
      maxSize: 0,
      // 当一个模块被使用了至少几次，才会被代码分割
      minChunks: 1,
      // 同时加载的模块库，超过这个值则不会在进行代码分割
      maxAsyncRequests: 5,
      // 入口文件引入的库，超过这个值则不会在进行代码分割
      maxInitialRequests: 3,
      // 组和文件之间的连接符
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      name: false,
      // 缓存分组，打包同步代码时会生效
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // true | function (module, chunks, cacheGroupKey):string | string
          // true: 将自动生成基于块和缓存组密钥的名称
          // string 或者 一个始终返回一个同样的字符串的function: 合并为一个快
          // function 返回不同的 string: 如下
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight(item => item)
            const allChunksNames = chunks.map(item => item.name).join('~')
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
          }
        },
        default: {
          minChunks: 2,
          priority: -20,
          // 复用已存在模块。如果一个模块已经被打包过，再次遇到不会重新打包，而是复用
          reuseExistingChunk: true
        }
      }
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
