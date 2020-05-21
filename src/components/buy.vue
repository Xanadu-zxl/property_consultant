<template>
  <div>
    <buy-tabbar :title="title" />
    <van-search @blur="search" placeholder="输入姓名/手机号" v-model="namePhone" />
    <van-dropdown-menu active-color="#00a862">
      <van-dropdown-item :options="search_time" v-model="created_at" />
      <van-dropdown-item :options="search_intention" v-model="intention" />
      <van-dropdown-item :options="search_model" v-model="preferred_apartment" />
    </van-dropdown-menu>
    <van-loading class="loading" size="27px" type="spinner" v-show="isLoading">加载中...</van-loading>
    <van-list
      :finished="finished"
      :immediate-check="immediate_check"
      @load="onLoad"
      finished-text="没有更多了"
      offset="1"
      v-model="loading"
    >
      <div :key="item.id" class="buy-link" v-for="item in list">
        <div class="content" v-show="!isLoading">
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
    </van-list>

    <footer class="footer"></footer>
    <home-nav></home-nav>
  </div>
</template>

<script>
import HomeHeader from './pages/header'
import HomeNav from './pages/nav'
import BuyTabbar from './pages/tabbar'

export default {
  data () {
    return {
      title: '认购前客户',
      id: '',
      phone: '',
      namePhone: '',
      immediate_check: false,
      isLoading: true,
      loadNum: 1,
      created_at: '时间',
      intention: '意向',
      preferred_apartment: '喜好户型',
      search_time: [
        { text: '时间', value: '时间' },
        { text: '一周内', value: 'within_week' },
        { text: '一个月内', value: 'within_month' },
        { text: '一个月以上', value: 'away_month' }
      ],
      search_intention: [
        { text: '意向', value: '意向' },
        { text: 'A很有意向', value: 'A很有意向' },
        { text: 'B较有意向', value: 'B较有意向' },
        { text: 'C可跟踪', value: 'C可跟踪' },
        { text: 'D无意向', value: 'D无意向' }
      ],
      search_model: [
        { text: '喜好户型', value: '喜好户型' },
        { text: '平层户型', value: '平层户型' },
        { text: '跃层户型', value: '跃层户型' },
        { text: '错层户型', value: '错层户型' },
        { text: '复式户型', value: '复式户型' }
      ],
      list: [],
      loading: false,
      finished: false
    }
  },
  watch: {
    // tab 切换
    created_at: function (newQuestion, oldQuestion) {
      if (newQuestion === '时间') {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
        }).then((res) => {
          this.list = res.data
        })
      } else {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
          params: { 'search_type': 'created_at', 'search_key': newQuestion }
        }).then((res) => {
          this.list = res.data
        })
      }
    },
    intention: function (newQuestion, oldQuestion) {
      if (newQuestion === '意向') {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
        }).then((res) => {
          this.list = res.data
        })
      } else {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
          params: { 'search_type': 'intention', 'search_key': newQuestion }
        }).then((res) => {
          this.list = res.data
        })
      }
    },
    preferred_apartment: function (newQuestion, oldQuestion) {
      if (newQuestion === '喜好户型') {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
        }).then((res) => {
          this.list = res.data
        })
      } else {
        this.$axios({
          method: 'GET',
          url: '/magnate/saler/search',
          headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
          params: { 'search_type': 'preferred_apartment', 'search_key': newQuestion }
        }).then((res) => {
          this.list = res.data
        })
      }
    }
  },
  components: {
    HomeHeader,
    HomeNav,
    BuyTabbar
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')

    this.$axios({
      method: 'GET',
      url: '/magnate/saler/search',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      this.isLoading = false
      this.list = res.data
    })
  },
  methods: {
    search () {
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/search',
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        params: { 'customer_key': this.namePhone, 'customer_name': this.customer_name }
      }).then((res) => {
        this.isLoading = false
        this.list = res.data
      }).catch(() => {
        this.$toast('搜索失败')
      })
    },

    // 分页加载
    onLoad () {
      this.loading = true
      this.loadNum++
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/search',
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        params: { 'page': this.loadNum, 'per_page': '10' }
      }).then((res) => {
        this.loading = false
        let oldList = this.list
        let newList = res.data
        this.list = [...oldList, ...newList]
        // 加载状态结束
        // 数据全部加载完成
        if (!res.data.length) {
          this.loading = false
          this.finished = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  height: 50px;
}

.loading {
  margin-top: 50px;
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
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 38px;
  .icon-Info-Icon-Phone {
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
