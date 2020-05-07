/* eslint-disable eqeqeq */
// 引入

// 创建一个实例
const server = this.$axios.create({
  // 将我们访问的地址设为baseURL
  baseURL: 'https://beta.skylarkly.com/oauth/token',
  // 设置超时时间
  timeout: 5000
})

// 设置拦截器
// 请求拦截器
server.interceptors.request.use(
  config => {
    // 每个请求都带token与服务器进行身份匹配
    config.headers.token = localStorage.getItem('token')
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)
// 响应拦截器
server.interceptors.response.use(
  response => {
    // 你也可以根据与后端约定的消息处理机制，作出提示
    // 你可以引入你使用的UI库的toast模块提示给用户
    if (response.data.code == 200) {
      console.log('操作成功')
    } else if (response.data.code == 300) {
      console.log('没有这条数据或者查询失败')
    } else {
      console.log('操作失败')
    }
    return response
  },
  error => {
    switch (
      error.response.status
    ) {
      case 500:
        // router.push({
        //   path: '/404'
        // })
        break
      case 401:
        // router.push({
        //   path: '/401'
        // })
        break
    }
  }
)

export default server
