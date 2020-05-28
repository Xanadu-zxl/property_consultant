import http from '../unit/http'

// admin
export default {
  // 判客岗
  // 号码效验
  getAdminPhoneRepeatAPI (num) {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/query_customer/search_customer_phone?customer_phone=` + num, '', headers)
  },
  // 动态表单
  getAdminQueryCustomerAPI () {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/query_customer/new`, '', headers)
  },
  // 表单发送
  postAdminQueryCustomerAPI (params) {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.post(`/magnate/admin/query_customer`, params, headers)
  },

  // 今日详情
  getAdminOneDayAPI (params) {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/details/one_day`, params, headers)
  },
  getAdminCustomDatelineAPI (params) {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/details/custom_dateline`, params, headers)
  },

  // 排行榜
  getAdminSalerTopAPI (params) {
    let headers = { 'CURRENT-USER-ID': '73', 'CURRENT-USER-PHONE': '18980807092', 'CURRENT-USER-TAGS': 'magnate_admin' }
    return http.get(`/magnate/admin/saler_top`, params, headers)
  },

  // home
  getSalerWelcomeAPI (headers) {
    return http.get('/magnate/saler/welcome', '', headers)
  },
  getSalerArriveTodayAPI (headers) {
    return http.get('/magnate/saler/callers/arrive_today', '', headers)
  },
  getSalerOverduedReturnVisitRecordsAPI (headers) {
    return http.get('/magnate/saler/arrive_visitors/overdued_return_visit_records', '', headers)
  },
  // 到访客户
  // 动态生成表单
  getSaleraArriveVisitorsNewAPI () {
    return http.get('/magnate/saler/arrive_visitors/new')
  },
  getPhoneRepeatAPI (num, headers) {
    return http.get(`/magnate/saler/arrive_visitors/valid_phone?customer_phone=` + num, '', headers)
  },
  // 到访表单提交
  postSalerArriveVisitorsAPI (params, header) {
    return http.post(`/magnate/saler/arrive_visitors`, params, header)
  },

  // 来电客户
  getSaleraCallersNewAPI () {
    return http.get('/magnate/saler/callers/new')
  },
  // 发送来电客户数据
  postSalerCallersAPI (params, header) {
    return http.post(`/magnate/saler/callers`, params, header)
  },

  // 查看来电客户数据
  getSaleraCallersAPI () {
    return http.get('/magnate/saler/callers')
  },
  // 分页
  getSaleraCallersSearchAPI (params) {
    return http.get('/magnate/saler/search', params)
  },
  // 获取caller表单以填写数据
  getSalerCallersResponseIdAPI (responseId) {
    return http.get(`/magnate/saler/callers/` + responseId)
  },
  // 来电数据修改
  putSalerCallersResponseIdAPI (responseId, params) {
    return http.put(`/magnate/saler/callers/` + responseId, params)
  },

  // init
  // 表单修改
  // buy_message
  putSalerArriveVisitorsAPI (responseId, params) {
    return http.put(`/magnate/saler/arrive_visitors/` + responseId, params)
  },

  // message
  // 获取表单以填写数据
  getSalerArriveVisitorsResponseIdAPI (responseId, headers) {
    return http.get(`/magnate/saler/arrive_visitors/` + responseId, '', headers)
  },

  // 回访
  getSalerCurrentUserReturnRecordsAPI (customerPhone, headers) {
    return http.get(`/magnate/saler/return_visit_records/current_user_return_records?customer_phone=` + customerPhone, '', headers)
  },
  getSalerReturnVisitrRecordsNewAPI (headers) {
    return http.get(`/magnate/saler/return_visit_records/new`, headers)
  },
  // 回访修改
  getSalerReturnVisitrRecordsAPI (responseId, headers) {
    return http.get(`/magnate/saler/return_visit_records/` + responseId, headers)
  },
  // 回访提交
  postSalerReturnVisitrRecordsAPI (params) {
    return http.post(`/magnate/saler/return_visit_records`, params)
  },

  // 搜索
  getSalerSearchAPI (params, headers) {
    return http.get(`/magnate/saler/search`, params, headers)
  }
}
