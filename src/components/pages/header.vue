<template>
  <div>
    <header class="header">
      <router-link class="box" to="/real_estate/saler/arrive_visitors">
        <p class="title">新建客户</p>
        <img class="img" src="@/assets/img/Card-Visit.png" />
      </router-link>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  },
  methods: {
    prompt () {
      this.$toast('开发中 ✨')
    }
  }

}
</script>

<style  scoped>
.header {
  width: 90%;
  margin: 60px auto 0px;
  display: flex;
  justify-content: space-around;
}
.box {
  width: 100%;
  position: relative;
  border-radius: 4;
}

.title {
  color: #fff;
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 18px;
  font-weight: 600;
}

.img {
  width: 100%;
  border-radius: 0.3125rem;
}
</style>
