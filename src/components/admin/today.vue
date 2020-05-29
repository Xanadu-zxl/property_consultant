
<template>
  <div>
    <header>
      <p class="today_header">
        <span @click="getTime(0,nowDate)">
          <i class="before"></i>
          <em>前一天</em>
        </span>
        <span class="today_time">{{nowDate}}</span>
        <span @click="getTime(1,nowDate)">
          <em>后一天</em>
          <i class="after"></i>
        </span>
      </p>
    </header>
    <div class="today_main">
      <p class="today_content_header">
        <span>类型</span>
        <span>新增</span>
        <span>总数</span>
      </p>
      <p class="today_content_body">
        <span>到访客户</span>
        <span>{{search_date_arrive_visitor_count}}</span>
        <span>{{arrive_visitor_count}}</span>
      </p>
      <p class="today_content_body">
        <span>来电客户</span>
        <span>{{search_date_caller_count}}</span>
        <span>{{caller_count}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      nowDate: '2020-02-20',
      arrive_visitor_count: '-',
      search_date_arrive_visitor_count: '-',
      caller_count: '-',
      search_date_caller_count: '-'
    }
  },
  mounted () {
    // 是否有权限
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')
    if (!this.phone) {
      sessionStorage.setItem('return', this.$route.name)
      this.$router.push({ name: 'login' })
    }

    // 获取今天时间
    let date = new Date()
    this.dateFormat(date)
    // 请求结果
    let params = { 'search_day': this.nowDate }
    api.getAdminOneDayAPI(params).then(res => {
      let data = res.data
      this.arrive_visitor_count = data.arrive_visitor_count
      this.caller_count = data.caller_count
      this.search_date_arrive_visitor_count = data.search_date_arrive_visitor_count
      this.search_date_caller_count = data.search_date_caller_count
    })
  },
  methods: {
    getTime (type, date) {
      let time = new Date(date) // new Date() 识别 2019/01/02
      if (type === 0) {
        time = +time - 1000 * 60 * 60 * 24
      } else if (type === 1) {
        time = +time + 1000 * 60 * 60 * 24 //  +time转换毫秒格式
      }
      time = new Date(time)
      return this.dateFormat(time) // 将日期格式
    },
    dateFormat (date) {
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m <= 9) {
        m = '0' + m
      }
      if (d <= 9) {
        d = '0' + d
      }
      this.nowDate = y + '-' + m + '-' + d
      let params = { 'search_day': this.nowDate }
      api.getAdminOneDayAPI(params).then(res => {
        let data = res.data
        this.arrive_visitor_count = data.arrive_visitor_count
        this.caller_count = data.caller_count
        this.search_date_arrive_visitor_count = data.search_date_arrive_visitor_count
        this.search_date_caller_count = data.search_date_caller_count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.today_header {
  height: 40px;
  line-height: 40px;
  color: #787878;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
}
.today_content_header {
  height: 35px;
  line-height: 35px;
  color: #00a862;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  background: rgba(0, 168, 98, 0.08);
}
.today_content_body {
  height: 45px;
  line-height: 45px;
  color: #787878;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
}
span {
  width: 33%;
}
//  三角
.before {
  transform: rotate(30deg);
}
.before:after {
  border-top: 5px solid #555555;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  content: '';
  position: relative;
  display: inline-block;
  transform: rotate(90deg);
  width: 0;
}

.after:after {
  border-top: 5px solid #555555;
  border-bottom: 5px solid transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  content: '';
  display: inline-block;
  transform: rotate(-90deg);
  position: relative;
  width: 0;
}
.today_time {
  color: #00a862;
  font-size: 14px;
  font-weight: 500;
}
</style>
