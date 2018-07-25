const {resolve} = require('path')
export default {
  disableCSSModules : true,
  disableCSSSourceMap : false,
  sass : {},
  extraBabelPlugins : [
    [
      'import', {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ],
  alias : {
    '@': resolve('src')
  },
  proxy : {
    "/shizuku": {
      "target": "https://imuntil.com",
      "changeOrigin": true
    }
  }
}
