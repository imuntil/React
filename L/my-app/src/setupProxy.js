const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/shizuku', { target: 'http://localhost:21001' }))
  app.use(
    proxy('/ani', {
      target: 'https://api.bgm.tv',
      changeOrigin: true,
      pathRewrite: {
        '^/ani': ''
      }
    })
  )
}
