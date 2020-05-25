<template>
  <div>
    <home-header ref="child"></home-header>
    <div class="content">
      <van-collapse accordion v-model="activeName">
        <van-collapse-item :value="remind" icon=" icon-Index-Icon-Foot" name="1" title="到访提醒">
          <p class="content-header">
            <span>姓名</span>
            <span>性别</span>
            <span>首次来访时间</span>
          </p>
          <van-loading class="loading" size="27px" type="spinner" v-show="isLoading">加载中...</van-loading>
          <p
            :key="item.id"
            class="content-header-content"
            v-for="item in visit"
            v-show="!isLoading"
          >
            <span>{{item.customer_name}}</span>
            <span>{{item.customer_gender}}</span>
            <span>{{item.dataTime}}</span>
          </p>
        </van-collapse-item>
        <van-collapse-item :value="overdue" icon=" icon-Index-Icon-Warning" name="2" title="回访逾期">
          <p class="content-header">
            <span>姓名</span>
            <span>意向等级</span>
            <span>逾期天数</span>
            <span>回访时间</span>
          </p>
          <p :key="item.id" class="content-header-content" v-for="item in overdues">
            <span>{{item.customer_name}}</span>
            <span>{{item.intention}}</span>
            <span>{{item.overdued_days}}</span>
            <span>{{item.lastDataTime}}</span>
          </p>
        </van-collapse-item>
        <van-collapse-item :value="collection" icon=" icon-Index-Icon-File" name="3" title="资料催收"></van-collapse-item>
        <van-collapse-item :value="messages" icon=" icon-Index-Icon-info" name="4" title="未读信息">
          <p :key="item.id" class="content-message" v-for="item in message">{{item.message}}</p>
        </van-collapse-item>
        <van-collapse-item icon=" icon-Index-Icon-Statistics" name="5" title="本月业绩" value>
          <div class="content-Statistics">
            <!--   <div class="content-Statistics-content">
              <p>
                <em>7</em> 套
              </p>
              <p>共售房</p>
            </div>
            <div class="content-Statistics-content">
              <p>
                <em>777,777</em>元
              </p>
              <p>已售金额</p>
            </div>
            <div class="content-Statistics-content">
              <p>
                <em>1,777</em>
                <i>m</i>
                <sup>2</sup>
              </p>
              <p>已售面积</p>
            </div>-->
          </div>
        </van-collapse-item>
      </van-collapse>
      <div class="footer"></div>
    </div>
    <home-nav></home-nav>
  </div>
</template>

<script>
import HomeHeader from './pages/header'
import HomeNav from './pages/nav'
// import unit from '../unit/index'
export default {
  data () {
    return {
      activeName: '',
      remind: '0 条新提醒',
      isLoading: true,
      overdue: '0 个',
      collection: '0 位',
      messages: '',
      id: '73',
      phone: '18980807092',
      name: '苏凯',
      message: [{
        id: '1',
        message: ' '
      }
      ],
      visit: [],
      overdues: []
    }
  },
  components: {
    HomeHeader,
    HomeNav
  },
  mounted () {
    // 设置cookie
    this.$cookies.set('CURRENT-USER-ID', this.id)
    this.$cookies.set('CURRENT-USER-PHONE', this.phone)
    this.$cookies.set('CURRENT-NAME', this.name)
    // 读取cookie
    // this.id = this.$cookies.get('CURRENT-USER-ID')
    // this.phone = this.$cookies.get('CURRENT-USER-PHONE')
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/welcome',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((data) => {
      // console.log(data.data.caller_planed_visit_today_count)
      this.remind = data.data.caller_planed_visit_today_count + ' 条新提醒'
      this.overdue = data.data.overdued_return_visit_record_count + ' 个'
    })
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/callers/arrive_today',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      this.visit = res.data
      this.isLoading = false
      // 格式化时间
      for (let i = 0; i < res.data.length; i++) {
        let dataTime = res.data[i].created_at
        dataTime = dataTime.substr(0, 10)
        this.visit[i].dataTime = dataTime
      }
    })
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/arrive_visitors/overdued_return_visit_records',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      this.overdues = res.data
      // 格式化时间
      for (let i = 0; i < res.data.length; i++) {
        let lastDataTime = res.data[i].last_revisit_date
        lastDataTime = lastDataTime.slice(0, 10)
        this.overdues[i].lastDataTime = lastDataTime
      }
      // console.log(this.overdues)
    })
  }
}
</script>

<style lang="scss" scoped>
.loading {
  margin-top: 10px;
}
.content {
  margin-top: 35px;
}
.van-hairline--top:last-child {
  margin-bottom: 40px;
}
.van-cell__title {
  text-align: left;
  padding-left: 11px;
  font-weight: 600;
  font-size: 0.75rem;
}
.van-cell__value {
  padding-right: 10px;
  font-size: 0.75rem;
  color: #b2b2b2;
}
.van-cell {
  padding: 13.5px 16px;
}
.van-cell__right-icon {
  font-size: 12px;
  height: 12px;
  width: 12px;
}
.van-collapse-item__content {
  padding: 0;
}
.content-header {
  height: 25px;
  line-height: 25px;
  color: #00a862;
  font-size: 0.625rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 168, 98, 0.08);
}
.content-header-content {
  height: 30px;
  line-height: 30px;
  display: flex;
  color: #787878;
  justify-content: space-between;
}
.content-header span,
.content-header-content span {
  width: 25%;
}
.content-message {
  color: #00a862;
  font-size: 13px;
  font-weight: 600;
  height: 45px;
  line-height: 45px;
  background: rgba(212, 212, 212, 0.2);
}
//销售记录
.content-Statistics {
  height: 80px;
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  color: #787878;
  font-size: 11px;
  line-height: 80px;
  background: rgba(212, 212, 212, 0.2);
}

.content-Statistics-content {
  width: 33%;
  display: flex;
  flex-direction: column;
}

.content-Statistics-content p {
  height: 20px;
  line-height: 60px;
}

.content-Statistics-content p em {
  color: #00a862;
  font-size: 20px;
  font-weight: 600;
  margin: 5px;
}
.content-Statistics-content p i {
  font-size: 20px;
}

.footer {
  height: 50px;
}
</style>
