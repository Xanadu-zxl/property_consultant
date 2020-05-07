 <template>
  <div>code:{{code}}</div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      code: ''
    }
  },
  mounted () {
    console.log(this.$route.query.code)

    this.code = this.$route.query.code
    console.log(this.code)

    // if (this.code) {
    //   // window.location.href = 'http://vpxydb.natappfree.cc/real_estate/saler/home'
    //   // this.$axios({
    //   //   method: 'post',
    //   //   url: 'https://beta.skylarkly.com/oauth/token',
    //   //   heder: '',
    //   //   params: {
    //   //     client_id: 'e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c',
    //   //     client_secret: '4920df80ee57d9c160bd8c017a014cccf539625434d775fc81410c891768ef9a',
    //   //     code: this.code,
    //   //     grant_type: 'authorization_code',
    //   //     redirect_uri: 'http://vpxydb.natappfree.cc/real_estate/saler/home'
    //   //   }
    //   // }),
    this.$axios.get('https://beta.skylarkly.com/oauth/token', qs.stringify(
      {
        client_id: 'e84c788580a5bdc0353b680f6c4d6ef4b10894b220f544d3dd97f27366a02b8c',
        client_secret: '4920df80ee57d9c160bd8c017a014cccf539625434d775fc81410c891768ef9a',
        code: this.code,
        grant_type: 'authorization_code',
        redirect_uri: 'http://vpxydb.natappfree.cc/real_estate/saler/home',
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Test', 'testheadervalue')
        }
      }
    ))
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

 <style>
</style>
