<template>
  <div>
    <buy-tabbar :title="title" />
    <van-search placeholder="输入姓名/手机号" v-model="value" />
    <van-dropdown-menu active-color="#00a862">
      <van-dropdown-item :options="option1" v-model="value1" />
      <van-dropdown-item :options="option2" v-model="value2" />
      <van-dropdown-item :options="option3" v-model="value3" />
    </van-dropdown-menu>
    <!-- <buy-information></buy-information> -->
    <div :key="item.customer_phone" class="buy-link" v-for="item in list">
      <div class="content">
        <router-link
          :to="{ name:'buy_message', query: {customer_phone:item.customer_phone,response_id:item.response_id }}"
        >
          <div class="information-left">
            <div class="information-left-head">
              <img class="information-left-img" src="@/assets/img/Avator-Man.png" />
            </div>
            <div class="information-left-matter">
              <h2>{{item.customer_name}}</h2>
              <p>电话：{{item.customer_phone}}</p>
              <p>意向：{{item.intention}}</p>
            </div>
          </div>
        </router-link>
        <a :href="'tel:'+ item.customer_phone" class="information-right">
          <i class="icon-Info-Icon-Phone"></i>
        </a>
      </div>
    </div>
    <footer class="footer"></footer>
    <home-nav></home-nav>
  </div>
</template>

<script>
import HomeHeader from './pages/header'
import HomeNav from './pages/nav'
import BuyTabbar from './pages/tabbar'
import Buyinformation from './pages/information'

export default {
  data () {
    return {
      title: '认购前客户',
      id: '',
      phone: '',
      value: '',
      value1: 0,
      value2: 'a',
      value3: '11',
      option1: [
        { text: '时间', value: 0 },
        { text: '一周内', value: 1 },
        { text: '一个月内', value: 2 },
        { text: '一个月以上', value: 3 }
      ],
      option2: [
        { text: '意向', value: 'a' },
        { text: 'A级', value: 'b' },
        { text: 'B级', value: 'c' },
        { text: 'C级', value: 'd' },
        { text: 'D级', value: 'e' }
      ],
      option3: [
        { text: '类型', value: '11' },
        { text: '别墅', value: '22' },
        { text: '公寓', value: '33' },
        { text: '住宅', value: '44' },
        { text: '小区', value: '55' }
      ],
      list: [{
        customer_name: 'xxx',
        customer_phone: 'xxx',
        intention: 'xxx',
        customer_gender: 'xxx'
      }
      ]

    }
  },
  components: {
    HomeHeader,
    HomeNav,
    BuyTabbar,
    Buyinformation
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT_USER_ID')
    this.phone = this.$cookies.get('CURRENT_USER_PHONE')

    this.$axios({
      method: 'GET',
      url: '/magnate/saler/search',
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone },
      query: { 'customer_key': this.phone }
    }).then((data) => {
      console.log(data)
      this.list = data.data
    })
    // this.$axios({
    //   method: 'GET',
    //   url: '/magnate/saler/search',
    //   headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone },
    //   query: { 'search_type': 'created_at' }
    // }).then((data) => {
    //   console.log(data)
    // })
    // this.$axios({
    //   method: 'GET',
    //   url: '/magnate/saler/search',
    //   headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone },
    //   query: { 'created_at': 'away_month' }
    // }).then((data) => {
    //   console.log(data)
    // })
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 50px;
}
.content {
  width: 88%;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.information-left {
  display: flex;
  justify-content: space-around;
  align-content: center;

  .information-left-img {
    width: 46px;
    margin: 10px auto;
  }

  .information-left-matter {
    margin-left: 10px;
    text-align: left;

    h2 {
      font-size: 15px;
      font-weight: 600;
      color: #222;
      margin-bottom: 5px;
    }
    p {
      font-size: 11px;
      color: #b2b2b2;
      margin-top: 5px;
    }
  }
}
.information-right {
  background: #e4f3ec;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 38px;
}
</style>
