 <template>
  <div>
    <!-- code:{{code}}
    token:{{token}}-->
    <p>授权成功</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      token: '',
      // id: '73',
      // phone: '18980807092',
      id: '',
      phone: '',
      name: '',
      client_id: '',
      client_secret: ''
    }
  },
  mounted () {
    this.code = this.$route.query.code
    // this.$cookies.set('CURRENT-USER-ID', this.id)
    // this.$cookies.set('CURRENT-USER-PHONE', this.phone)
    // this.$cookies.set('CURRENT-NAME', this.name)
    this.$axios({
      method: 'get',
      url: '/magnate/oauth'
    }).then((res) => {
      this.client_id = res.data.client_id
      this.client_secret = res.data.client_secret

      this.$axios({
        method: 'POST',
        url: '/oauth/token',
        headers: { 'Content-Type': 'application/json' },
        params: {
          // client_id: 'e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c',
          // client_secret: '4920df80ee57d9c160bd8c017a014cccf539625434d775fc81410c891768ef9a',
          client_id: this.client_id,
          client_secret: this.client_secret,
          code: this.code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:8080/real_estate/saler/code'
        }
      }).then((res) => {
        console.log(res)
        this.token = res.data.access_token
        this.$axios({
          method: 'GET',
          url: '/api/v1/user?access_token=' + this.token
        }).then((res) => {
          console.log(res)
          this.id = res.data.id
          this.name = res.data.name
          this.phone = res.data.phone
          this.$cookies.set('CURRENT-USER-ID', res.data.id)
          this.$cookies.set('CURRENT-USER-PHONE', res.data.phone)
          this.$cookies.set('CURRENT-NAME', res.data.name)
        })
      })
    })

    window.location.href = '/'
  }
}
</script>

 <style>
</style>
