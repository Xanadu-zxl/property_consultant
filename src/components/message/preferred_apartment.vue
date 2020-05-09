<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="channel-content">
      <div class="channel-content-class">平层户型</div>
      <div class="channel-content-class">跃层户型</div>
      <div class="channel-content-class">错层户型</div>
      <div class="channel-content-class">复式户型</div>
      <div class="channel-content-class">高层</div>
      <div class="channel-content-class">多层</div>
      <div class="channel-content-class">中高层</div>
      <div class="channel-content-class">超高层</div>
    </div>

  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '喜好户型'
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
