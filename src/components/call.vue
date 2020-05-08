<template>
  <div>
    <customer-tabbar :title="title" />
    <nav class="nav">
      <van-tabs color="#00A862" v-model="active">
        <van-tab title="新建客户">
          <customer-new-table></customer-new-table>
        </van-tab>
        <van-tab title="查看客户">
          <customer-view></customer-view>
        </van-tab>
      </van-tabs>
    </nav>
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'
import CustomerNewTable from './pages/newTable'
import CustomerView from './pages/view'

export default {
  data () {
    return {
      title: '来电客户',
      active: 0
    }
  },
  components: {
    CustomerTabbar,
    CustomerNewTable,
    CustomerView
  }

}
</script>

<style scoped>
.nav >>> .van-tabs__line {
  width: 20px !important;
}
</style>
