<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="media-content">
      <div :key="item.dataTime" class="media-content-list" v-for="item in array">
        <van-icon name="fire" color="#00a862"  class="media-content-list-icon"/>
        <div class="media-content-list-body">
          <span>{{item.title}}</span>
          <span>{{item.dataTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '媒体渠道',
      array: [{
        title: '圣诞嘉年华',
        dataTime: '2019/12/25'
      },
      {
        title: '国庆活动',
        dataTime: '2019/10/01'

      },
      {
        title: '促销活动',
        dataTime: '2019/07/12'
      }]
    }
  },
  components: {
    CustomerTabbar
  }
}
</script>
<style lang="scss" scoped>
.media-content{
  margin-top: 20px;
  width: 90%;
  margin: 0 auto;

  .media-content-list{
    height: 51px;
    line-height: 51px;
    display: flex;
    justify-content: start;
  }
  .media-content-list-icon{
    width: 11%;
    line-height: 3;
    font-size: 17px;
  }
  .media-content-list-body{
    border-bottom: 1px solid #f9f9f9;
    display: flex;
    width: 89%;
    justify-content: space-between;
  }
}

</style>
