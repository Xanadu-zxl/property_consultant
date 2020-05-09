<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="channel-content">
      <div class="channel-content-class">夫妻家庭</div>
      <div class="channel-content-class">核心家庭</div>
      <div class="channel-content-class">主干家庭</div>
      <div class="channel-content-class">联合家庭</div>
      <div class="channel-content-class">单亲家庭</div>
      <div class="channel-content-class">隔代家庭</div>
    </div>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '家庭结构'
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
