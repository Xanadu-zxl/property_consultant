<template>
  <div>
    <p>登陆中...</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      client_id: 'e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c',
      client_secret: '4920df80ee57d9c160bd8c017a014cccf539625434d775fc81410c891768ef9a',
      // client_id: '',
      // client_secret: '',
      code: 'http://localhost:8080/real_estate/saler/code'

    }
  },
  mounted () {
    if (this.client_id) {
      window.location.href = 'https://beta.skylarkly.com/oauth/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.code + '&response_type=code'
    }
    this.$axios.get('/magnate/oauth')
      .then((response) => {
        let data = response.data
        this.client_id = data.client_id
        this.client_secret = data.client_secret
        console.log(this.client_id)
        console.log(this.client_secret)
        // if (this.client_id) {
        //   window.location.href = 'https://beta.skylarkly.com/oauth/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.code + '&response_type=code'
        // }
      })
  }
}
</script>
<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
