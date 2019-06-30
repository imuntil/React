const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: {
    reacts: ['react', 'react-dom'],
    vendors: ['lodash']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    // 打包成库，并将其作为一个全局变量挂载到window上暴露出来
    library: '[name]'
  },
  plugins: [
    // 对上面的库进行分析，生成映射文件
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
