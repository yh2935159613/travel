module.exports = {
  devServer: {
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:8888", //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //代理的路径
        },
      },
    },
  },
  lintOnSave: false
};
