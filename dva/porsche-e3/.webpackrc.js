const { resolve } = require('path')
export default {
  disableCSSModules: true,
  disableCSSSourceMap: false,
  sass: {},
  extraBabelPlugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
  alias: {
    '@': resolve('src')
  }
}
