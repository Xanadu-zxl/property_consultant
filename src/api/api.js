import http from '../unit/http'
import cookie from 'js-cookie'

// admin
export default {
  // 登录
  // 判客岗
  getMagnateOauthAPI () {
    return http.get('/magnate/oauth')
  },
  // 号码效验
  getAdminPhoneRepeatAPI (num) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/query_customer/search_customer_phone?customer_phone=` + num, '', headers)
  },
  // 动态表单
  getAdminQueryCustomerNewAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/query_customer/new`, '', headers)
  },
  // 表单发送
  postAdminQueryCustomerAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.post(`/magnate/admin/query_customer`, params, headers)
  },

  // 今日详情
  getAdminOneDayAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/details/one_day`, params, headers)
  },
  getAdminCustomDatelineAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/details/custom_dateline`, params, headers)
  },

  // 排行榜
  getAdminSalerTopAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/saler_top`, params, headers)
  },

  // home
  getSalerWelcomeAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/welcome', '', headers)
  },
  getSalerArriveTodayAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/callers/arrive_today', '', headers)
  },
  // 回访逾期
  getSalerOverduedReturnVisitRecordsAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/arrive_visitors/overdued_return_visit_records', '', headers)
  },
  // 到访客户
  // 动态生成表单
  getSaleraArriveVisitorsNewAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/arrive_visitors/new', '', headers)
  },
  getPhoneRepeatAPI (num) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/arrive_visitors/valid_phone?customer_phone=` + num, '', headers)
  },
  // 到访表单提交
  postSalerArriveVisitorsAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.post(`/magnate/saler/arrive_visitors`, params, headers)
  },

  // 来电客户
  getSaleraCallersNewAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/callers/new', '', headers)
  },
  // 发送来电客户数据
  postSalerCallersAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.post(`/magnate/saler/callers`, params, headers)
  },

  // 查看来电客户数据
  getSaleraCallersAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/callers', '', headers)
  },
  // 分页
  getSaleraCallersSearchAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get('/magnate/saler/search', params, headers)
  },
  // 获取caller表单以填写数据
  getSalerCallersResponseIdAPI (responseId) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/callers/` + responseId, '', headers)
  },
  // 来电数据修改
  putSalerCallersResponseIdAPI (responseId, params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.put(`/magnate/saler/callers/` + responseId, params, headers)
  },

  // init
  // 表单修改
  // buy_message
  putSalerArriveVisitorsAPI (responseId, params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.put(`/magnate/saler/arrive_visitors/` + responseId, params, headers)
  },

  // message
  // 获取表单以填写数据
  getSalerArriveVisitorsResponseIdAPI (responseId) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/arrive_visitors/` + responseId, '', headers)
  },

  // 回访
  getSalerCurrentUserReturnRecordsAPI (customerPhone) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/return_visit_records/current_user_return_records?customer_phone=` + customerPhone, '', headers)
  },
  getSalerReturnVisitrRecordsNewAPI () {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/return_visit_records/new`, '', headers)
  },
  // 回访修改
  getSalerReturnVisitrRecordsAPI (responseId) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/return_visit_records/` + responseId, '', headers)
  },
  // 回访提交
  postSalerReturnVisitrRecordsAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.post(`/magnate/saler/return_visit_records`, params, headers)
  },

  // 搜索
  getSalerSearchAPI (params) {
    let id = cookie.get('CURRENT-USER-ID')
    let phone = cookie.get('CURRENT-USER-PHONE')
    let headers = { 'CURRENT-USER-ID': id, 'CURRENT-USER-PHONE': phone, 'CURRENT-USER-TAGS': 'magnate_saler' }
    return http.get(`/magnate/saler/search`, params, headers)
  }
}
