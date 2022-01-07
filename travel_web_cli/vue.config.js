module.exports = {
    lintOnSave: false, //关闭语法检查
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
}