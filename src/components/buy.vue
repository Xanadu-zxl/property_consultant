<template>
  <div>
    <buy-tabbar :title="title" />
    <van-search placeholder="输入姓名/手机号" v-model="value" />
    <van-dropdown-menu>
      <van-dropdown-item :options="option1" v-model="value1" />
      <van-dropdown-item :options="option2" v-model="value2" />
      <van-dropdown-item :options="option3" v-model="value3" />
    </van-dropdown-menu>
    <!-- <buy-information></buy-information> -->
    <div :key="item.customer_phone" v-for="item in list">
      <router-link
        :to="{ name:'message', query: {customer_phone:item.customer_phone }}"
        class="content"
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
        <div class="information-right">
          <i class="icon-Info-Icon-Phone"></i>
        </div>
      </router-link>
    </div>
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
        customer_name: '张先生',
        customer_phone: '1212123',
        intention: '公寓',
        customer_gender: '1'
      }, {
        customer_name: '张先生',
        customer_phone: '1123',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张先生',
        customer_phone: '12232312123',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张先生',
        customer_phone: '1212135323',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张女士',
        customer_phone: '12676812123',
        intention: '公寓',
        customer_gender: '女'
      }
      ]

    }
  },
  components: {
    HomeHeader,
    HomeNav,
    BuyTabbar,
    Buyinformation
  }

}
</script>

<style lang="scss" scoped>
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
