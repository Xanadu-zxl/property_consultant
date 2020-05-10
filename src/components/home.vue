<template>
  <div>
    <home-header ref="child"></home-header>
    <div class="content">
      <van-collapse accordion v-model="activeName">
        <van-collapse-item
          :value="remind"
          icon=" icon-Index-Icon-Foot"
          name="1"
          title="到访提醒"
        >
          <p class="content-header">
            <span>姓名</span>
            <span>意向等级</span>
            <span>来访客户</span>
            <span>首次来访时间</span>
          </p>
          <p :key="item.id" class="content-header-content" v-for="item in list">
            <span>{{item.name}}</span>
            <span>{{item.class}}</span>
            <span>{{item.client}}</span>
            <span>{{item.time}}</span>
          </p>
        </van-collapse-item>
        <van-collapse-item
          :value="overdue"
          icon=" icon-Index-Icon-Warning"
          name="2"
          title="回访逾期"
        >
          <p class="content-header">
            <span>姓名</span>
            <span>意向等级</span>
            <span>逾期天数</span>
            <span>回访时间</span>
          </p>
          <p :key="item.id" class="content-header-content" v-for="item in overdues">
            <span>{{item.name}}</span>
            <span>{{item.class}}</span>
            <span>{{item.client}}</span>
            <span>{{item.time}}</span>
          </p>
        </van-collapse-item>
        <van-collapse-item :value="collection" icon=" icon-Index-Icon-File" name="3" title="资料催收"></van-collapse-item>
        <van-collapse-item :value="messages" icon=" icon-Index-Icon-info" name="4" title="未读信息">
          <p :key="item.id" class="content-message" v-for="item in message">{{item.message}}</p>
        </van-collapse-item>
        <van-collapse-item icon=" icon-Index-Icon-Statistics" name="5" title="本月业绩" value>
          <div class="content-Statistics">
            <div class="content-Statistics-content">
              <p>
                <em>9</em> 套
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
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
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
      activeName: '1',
      remind: '2条新提醒',
      overdue: '2个',
      collection: '0位',
      messages: '',
      id: '',
      phone: '',

      message: [{
        id: '1',
        message: '测试'
      },
      {
        id: '2',
        message: '测试数据'
      }],
      list: [{
        id: 1,
        name: '李四',
        class: 'SS级',
        client: '到访客户',
        time: '2020/02/21'
      },
      {
        id: 2,
        name: 'zhangsan',
        class: 'S级',
        client: '来电客户',
        time: '2020/02/20'
      }
      ],
      overdues: [{
        id: 1,
        name: '李四',
        class: 'SS级',
        client: '到访客户',
        time: '2020/02/21'
      },
      {
        id: 2,
        name: '张三',
        class: 'S级',
        client: '来电客户',
        time: '2020/02/20'
      }
      ]

    }
  },
  components: {
    HomeHeader,
    HomeNav
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT_USER_ID')
    this.phone = this.$cookies.get('CURRENT_USER_PHONE')
    console.log(this.id)

    this.$axios({
      method: 'GET',
      url: '/magnate/saler/welcome',
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone }
    }).then((data) => {
      console.log(data)
    })
  },
  methods: {

  }
}

</script>

<style lang="scss" scoped>
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
  justify-content: space-around;
  background: rgba(0, 168, 98, 0.08);
}

.content-header-content {
  height: 30px;
  line-height: 30px;
  display: flex;
  color: #787878;
  justify-content: space-around;
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
</style>
