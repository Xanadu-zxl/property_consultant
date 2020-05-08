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
// import unit from '../unit/index'

export default {
  data () {
    return {
      porp: {
      },
      client_id: '',
      client_secret: ''
    }
  },
  components: {
    HomeHeader,
    HomeNav,
    HomeContent
  },
  mounted () {
    // const client_id = this.client_id
    // this.$axios.get('http://skylark-local.natappvip.cc/magnate/oauth')
    //   .then((response) => {
    //     let data = response.data
    //     this.client_id = data.client_id
    //     this.client_secret = data.client_secret
    //     console.log(this.client_id + '11')
    //   })
    // console.log(this.client_id + '222')

    // if (!this.client_id) {
    //   window.location.href = 'https://beta.skylarkly.com/oauth/authorize?client_id=e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c&redirect_uri=http://vpxydb.natappfree.cc/real_estate/saler/code&response_type=code'
    // }
    // .then(this.$axios.get('https://beta.skylarkly.com/oauth/authorize?client_id=e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c&redirect_uri=http://vpxydb.natappfree.cc/real_estate/saler/code&response_type=code')
    // // this.$axios.get('https://beta.skylarkly.com/oauth/authorize', { client_id: this.client_id, redirect_uri: 'urn:ietf:wg:oauth:2.0:oob', response_type: 'code' })
    //   .then((res) => {
    //     console.log()

    //     console.log(res.path)
    //     console.log(res)
    //   }))
  }

}

</script>

<style scoped>
</style>
