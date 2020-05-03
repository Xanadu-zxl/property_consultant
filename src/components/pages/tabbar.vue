<template>
  <div>
    <header class="tabnar-header">
      <i class="icon-Index-Icon-Down"></i>
      {{title}}
    </header>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {

    }
  }

}
</script>

<style scoped>
.tabnar-header {
  text-align: center;
  position: relative;
  font-size: 16px;
  font-weight: 600;
  color: #222;
  height: 50px;
  line-height: 50px;
}
.icon-Index-Icon-Down {
  position: absolute;
  left: 10px;
}
</style>
