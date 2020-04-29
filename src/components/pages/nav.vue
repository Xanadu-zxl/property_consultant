<template>
  <div>
    <van-tabbar fixed route>
      <van-tabbar-item icon="like"  to="/" >首页</van-tabbar-item>
      <van-tabbar-item icon="star"  to="/buy">认购前</van-tabbar-item>
      <van-tabbar-item icon="fire"  to="/subscribe">已认购</van-tabbar-item>
      <van-tabbar-item icon="cart"  to="/sign">已签约</van-tabbar-item>
      <van-tabbar-item icon="bag"  to="/owner">准业主</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      replace: true
    }
  }

}
</script>

<style>
</style>
