import axios from 'axios'
//创建实例
const instance = axios.create({
    timeout: 1000,
})
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        if (config.url != '/api/user/login' && config.url != '/api/user/register') {
            const accessToken = localStorage.getItem('accessToken')
            config.headers.Authorization = 'Bearer ' + accessToken//----*********必须加++++'Bearer '
        }
        // console.log('config', config)
        return config
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

export default instance