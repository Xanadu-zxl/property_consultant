<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="channel-content">
      <router-link class="channel-content-class" to="/real_estate/saler/message/media">媒体渠道</router-link>
      <div class="channel-content-class">微博</div>
      <div class="channel-content-class">朋友介绍</div>
      <div class="channel-content-class">行销</div>
      <div class="channel-content-class">小蜜蜂</div>
      <div class="channel-content-class">线下活动</div>
      <div class="channel-content-class">电视宣传</div>
      <div class="channel-content-class">人民日报</div>
    </div>
    <footer class="channel-footer">
      <p>* 长按可查看详情</p>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '知晓途径'
    }
  },
  components: {
    CustomerTabbar
  }
}
</script>

<style lang="scss" scoped>
.channel-content {
  width: 90%;
  margin: 50px auto 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.channel-content-class {
  color: #000;
  width: 48%;
  font-size: 15px;
  height: 80px;
  line-height: 80px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid #cbcbcb;
  margin: 0 auto 12px;
}

.channel-content-class:hover {
  color: #00a862;
  border: 2px solid #00a862;
}
.channel-footer {
  font-size: 12px;
  color: #787878;
  margin-top: 18px;
}
</style>
