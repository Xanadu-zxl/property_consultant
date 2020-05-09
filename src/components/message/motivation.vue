<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="channel-content">
      <router-link class="channel-content-class" to="#">交通方便</router-link>
      <div class="channel-content-class">个人喜好</div>
      <div class="channel-content-class">为子女购房</div>
      <div class="channel-content-class">养老</div>
      <div class="channel-content-class">小孩上学</div>
      <div class="channel-content-class">投资</div>
      <div class="channel-content-class">上班方便</div>
      <div class="channel-content-class">帮亲戚</div>
    </div>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '置业动机'
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

</style>
