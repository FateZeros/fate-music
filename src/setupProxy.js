const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/CORS',
    createProxyMiddleware({
      target: 'http://localhost:4000',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/CORS': ''
      }
    })
  )
}
