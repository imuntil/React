module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              //modifyVars: antdTheme,    // 如果要自定义主题样式
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  }
}
