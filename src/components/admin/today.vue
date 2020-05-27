
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
        <span>总占比数</span>
      </p>
      <p class="today_content_body">
        <span>到访客户</span>
        <span>-</span>
        <span>-</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowDate: '2020-02-20'
    }
  },
  mounted () {
    // 获取今天时间
    let date = new Date()
    this.dateFormat(date)
    // 请求结果
    // this.$axios({
    //   method: 'GET',
    //   url: '/magnate/saler/search',
    //   headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    // }).then((res) => {
    //   this.list = res.data
    // })
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
