<template>
  <div>
    <header class="header">
      <div class="box">
        <p class="title">新客户</p>
        <img src="@/assets/img/Index-Card-Users.png" class="img">
      </div>
      <div class="box">
        <p class="title">工具箱</p>
        <img src="@/assets/img/Index-Card-Tool.png" class="img">
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }

}
</script>

<style  scoped>
.header {
  width: 88%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.box {
  width: 47%;
  position: relative;
  border-radius: 0.3125rem;
}

.title {
  color: #fff;
  position: absolute;
  left: 16px;
  top: 16px;
  font-size: 18px;
  font-weight: 600;
}

.img{
  width:100%;
  border-radius: 0.3125rem;

}
</style>
