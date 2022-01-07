module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888', // target host
          pathRewrite: {
            '^/api': '/', // rewrite path
          },
        },
      },
    },
    lintOnSave:false
  }
  