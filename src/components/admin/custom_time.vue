
<template>
  <div>
    <header class="custom_time_header">
      <div class="custom_time_time">
        <div @click="show = true" class="custom_time_input">{{date}}</div>
        <van-calendar
          :max-date="maxDate"
          :min-date="minDate"
          :show-confirm="false"
          @confirm="onConfirm"
          color="#00A862"
          type="range"
          v-model="show"
        />
      </div>
    </header>
    <div class="custom_time_main">
      <p class="custom_time_content_header">
        <span>类型</span>
        <span>新增</span>
        <span>总占比数</span>
      </p>
      <p class="custom_time_content_body">
        <span>到访客户</span>
        <span>{{search_day_arrive_visitor_count}}</span>
        <span>{{arrive_visitor_count}}</span>
      </p>
      <p class="custom_time_content_body">
        <span>来电客户</span>
        <span>{{search_day_caller_count}}</span>
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
      date: '选择时间段',
      startDate: '',
      endDate: '',
      show: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2100, 0, 31),
      arrive_visitor_count: '-',
      search_day_arrive_visitor_count: '-',
      caller_count: '-',
      search_day_caller_count: '-'
    }
  },

  methods: {
    formatDate (date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    onConfirm (date) {
      const [start, end] = date
      this.show = false
      this.startDate = this.formatDate(start)
      this.endDate = this.formatDate(end)
      let params = { 'start_date': this.startDate, 'end_date': this.endDate }
      api.getAdminCustomDatelineAPI(params).then(res => {
        let data = res.data
        this.arrive_visitor_count = data.arrive_visitor_count
        this.caller_count = data.caller_count
        this.search_day_arrive_visitor_count = data.search_day_arrive_visitor_count
        this.search_day_caller_count = data.search_day_caller_count
      })

      this.date = `${this.formatDate(start)} ~ ${this.formatDate(end)}`
    }
  }
}
</script>

<style lang="scss" scoped>
.custom_time_header {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  display: flex;
  justify-content: center;
}

.custom_time_time {
  overflow: hidden;
  .custom_time_input {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    width: 100%;
    color: #787878;
  }
}
.custom_time_content_header {
  height: 35px;
  line-height: 35px;
  color: #00a862;
  font-size: 14px;
  display: flex;
  justify-content: space-around;
  background: rgba(0, 168, 98, 0.08);
}
.custom_time_content_body {
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
</style>
