/** **   http.js   ****/
// 导入封装好的axios实例
import request from './request'

const http = {
  /**
   * methods: 请求
   * @param url 请求地址
   * @param params 请求参数
   */
  get (url, params) {
    const config = {
      methods: 'get',
      url: url,
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone } // 权限

    }
    if (params) config.params = params
    return request(config)
  },
  post (url, params) {
    const config = {
      methods: 'post',
      url: url,
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }

    }
    if (params) config.data = params
    return request(config)
  }
}
// 导出
export default http
