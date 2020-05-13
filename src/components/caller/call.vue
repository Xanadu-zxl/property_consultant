<template>
  <div>
    <customer-tabbar :title="title" />
    <nav class="nav">
      <van-tabs color="#00A862" v-model="active">
        <van-tab title="新建客户">
          <customer-new-table></customer-new-table>
        </van-tab>
        <van-tab title="查看客户">
          <div :key="item.customer_phone" class="content" v-for="item in list">
            <div class="information-left">
              <div class="information-left-head">
                <img class="information-left-img" src="@/assets/img/Avator-Man.png" />
              </div>
              <router-link
                :to="{ name:'buy_message', query: {customer_phone:item.customer_phone,response_id:item.response_id }}"
                class="information-left-matter"
              >
                <h2>{{item.customer_name}}</h2>
                <p>电话：{{item.customer_phone}}</p>
                <p>来访时间：{{item.dataTime}}</p>
              </router-link>
            </div>
            <a :href="'tel:'+ item.customer_phone" class="information-right">
              <i class="icon-Info-Icon-Phone"></i>
            </a>
          </div>
        </van-tab>
      </van-tabs>
    </nav>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
import CustomerNewTable from '../pages/newTable'

export default {
  data () {
    return {
      title: '来电客户',
      active: 0,
      list: [{
        customer_name: '张先生',
        customer_phone: 'xxx'
      }],
      dataTime: '',
      response_id: '70930'

    }
  },
  components: {
    CustomerTabbar,
    CustomerNewTable
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT_USER_ID')
    this.phone = this.$cookies.get('CURRENT_USER_PHONE')
    // 来电列表
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/callers/arrive_today',
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone }
    }).then((res) => {
      this.list = res.data
      for (let i = 0; i < res.data.length; i++) {
        let dataTime = res.data[i].planed_visit_time
        dataTime = dataTime.substr(0, 10)
        this.list[i].dataTime = dataTime
      }
    })

    // 来电
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/callers/' + this.response_id,
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone },
      qurey: { 'id': '70955' }
    }).then((res) => {
      console.log(res)
    })
  }

}
</script>

<style lang="scss" scoped>
/deep/ .van-tabs__line {
  width: 20px !important;
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
