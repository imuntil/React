var path = require('path')
var webpack = require('webpack')
module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    './app/index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    port: 23333,
    contentBase: path.resolve(__dirname, 'build'),
    // historyApiFallback: true,
    hot: true,
    publicPath: '/'
  },
  devtool: 'cheap-eval-source-map'
}