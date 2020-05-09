<template>
  <div class="trait">
    <customer-tabbar :title="title" />

    <van-field label="客户特征描述" placeholder="请输入描述" type="text" v-model="customer_name" />
    <footer class="footer">
      <router-link to="/real_estate/saler/message">保存</router-link>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '客户特征',
      customer_name: ''
    }
  },
  components: {
    CustomerTabbar
  }
}
</script>

<style lang="sass" scoped>
.trait

/deep/
  .van-field
    flex-direction: column
    margin: 40px auto
    border-bottom: 1px solid #e6e6e6

  .van-field__label
    text-align: left
    padding: 0px
    color: #222222
    font-size: 17px
    width: 190px

  .van-field__body
    margin-top: 15px
    font-size: 15px

.footer
  position: absolute
  bottom: 0px
  width: 100%
  height: 50px
  line-height: 50px
  font-size: 15px
  font-weight: 600
  background: #00A862

  a
    color: #fff
</style>
