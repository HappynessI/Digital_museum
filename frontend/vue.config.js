module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug'
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}