 <template>
  <div>
    code:{{code}}
    token:{{token}}
  </div>
</template>

<script>
// import qs from 'qs'
export default {
  data () {
    return {
      code: '',
      token: '',
      id: '',
      phone: '18615769209'
    }
  },
  mounted () {
    console.log(this.$route.query.code)
    this.code = this.$route.query.code
    console.log(this.code)

    this.$axios({
      method: 'POST',
      url: '/oauth/token',
      headers: { 'Content-Type': 'application/json' },
      params: {
        client_id: 'e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c',
        client_secret: '4920df80ee57d9c160bd8c017a014cccf539625434d775fc81410c891768ef9a',
        code: this.code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:8080/real_estate/saler/code'
      }
    }).then((res) => {
      console.log(res)
      this.token = res.data.access_token
      console.log(res.data.access_token)
      this.$axios({
        method: 'GET',
        url: 'https://beta.skylarkly.com/api/v1/user?access_token=' + this.token
      }).then((data) => {
        console.log(data)
        this.id = data.data.id
        // this.phone = data.data.phone
        this.$cookies.set('CURRENT_USER_ID', this.id)
        this.$cookies.set('CURRENT_USER_PHONE', this.phone)

        this.$axios({
          method: 'GET',
          url: '/magnate/saler/welcome',
          headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone }
        })
      })
    })
  }
}
</script>

 <style>
</style>
