import http from '../unit/http'

// get请求
export default {
  getListAPI (num, params) {
    return http.get(`/magnate/saler/arrive_visitors/valid_phone?customer_phone=` + num, params)
  },
  postFormAPI (params) {
    return http.post(``, params)
  }
}
