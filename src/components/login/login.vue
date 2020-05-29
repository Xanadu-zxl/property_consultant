<template>
  <div>
    <p>登录中...</p>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      client_id: '',
      client_secret: '',
      code: 'http://localhost:8080/real_estate/saler/code'
      // code: 'http://shandenabian.skylarkly.com/real_estate/saler/code'
    }
  },
  mounted () {
    // if (this.client_id) {
    //   window.location.href = 'https://beta.skylarkly.com/oauth/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.code + '&response_type=code'
    // }
    api.getMagnateOauthAPI().then(res => {
      console.log(res)
      let data = res.data
      this.client_id = data.client_id
      this.client_secret = data.client_secret
      if (this.client_id) {
        window.location.href = 'http://shandenabian.skylarkly.com/oauth/authorize?client_id=' + this.client_id + '&redirect_uri=' + this.code + '&response_type=code'
      }
    })
  }
}
</script>
<style lang="scss" scoped>
p {
  margin: 20px;
}
</style>
