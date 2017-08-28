const pxtorem = require('postcss-pxtorem')
const path = require('path')
const svgSpriteDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')
]

export default {
  "entry": "src/index.js",
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime"
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime"
      ]
    }
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile',
        style: 'css'
      }
    ]
  ],
  extraPostCSSPlugin: [
    pxtorem({
      rootValue: 100,
      propWhitelist: []
    })
  ],
  svgSpriteLoaderDirs: svgSpriteDirs
}
