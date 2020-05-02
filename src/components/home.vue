<template>
  <div>
    <home-header></home-header>
    <home-content :datas="porp"></home-content>
    <home-nav></home-nav>
  </div>
</template>

<script>
import HomeHeader from './pages/header'
import HomeNav from './pages/nav'
import HomeContent from './pages/content'

export default {
  data () {
    return {
      porp: {
        // id: '好好学习'
      }
    }
  },
  components: {
    HomeHeader,
    HomeNav,
    HomeContent
  },
  computed: {
    getMessage: (el) => {
      console.log(el.name)
    }
  }

}
</script>

<style scoped>
</style>
