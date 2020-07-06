 <template>
  <div>
    <p class="p" v-show="show">授权成功,请等待页面跳转...</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: '',
      code: '',
      token: '',
      id: '',
      phone: '',
      name: ''
    }
  },
  mounted () {
    this.code = this.$route.query.code
    this.path = sessionStorage.getItem('return')

    this.$axios({
      method: 'get',
      url: '/magnate/oauth'
    }).then((res) => {
      this.$axios({
        method: 'POST',
        url: '/oauth/token',
        headers: { 'Content-Type': 'application/json' },
        params: {
          client_id: res.data.client_id,
          client_secret: res.data.client_secret,
          code: this.code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:8080/real_estate/saler/code'
          // redirect_uri: 'http://shandenabian.skylarkly.com/real_estate/saler/code'
        }
      }).then((res) => {
        this.token = res.data.access_token
        this.$axios({
          method: 'GET',
          url: '/api/v1/user?access_token=' + this.token
        }).then((res) => {
          this.show = true
          this.id = res.data.id
          this.name = res.data.name
          this.phone = res.data.phone
          this.$cookies.set('CURRENT-USER-ID', res.data.id)
          this.$cookies.set('CURRENT-USER-PHONE', res.data.phone)
          this.$cookies.set('CURRENT-NAME', res.data.name)

          let tag = res.data.tags
          let tags = []
          tag.forEach(element => {
            tags.push(element.name)
          })
          this.$cookies.set('CURRENT-USER-TAGS', tags)
          this.$router.push({ name: this.path })
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
