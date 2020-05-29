 <template>
  <div>
    <p class="p">授权成功</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      token: '',
      id: '',
      phone: '',
      name: '',
      client_id: '',
      client_secret: ''
    }
  },
  mounted () {
    this.code = this.$route.query.code
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
          client_id: this.client_id,
          client_secret: this.client_secret,
          code: this.code,
          grant_type: 'authorization_code',
          // redirect_uri: 'http://shandenabian.skylarkly.com/real_estate/saler/code'
          redirect_uri: 'http://localhost:8080/real_estate/saler/code'
        }
      }).then((res) => {
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
          // window.location.href = 'http://shandenabian.skylarkly.com/real_estate/saler/home'
          window.location.href = 'http://localhost:8080/real_estate/saler/home'
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.p {
  margin: 20px;
}
</style>
