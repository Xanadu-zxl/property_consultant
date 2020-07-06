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
    api.getMagnateOauthAPI().then(res => {
      let data = res.data
      let clientId = data.client_id
      // let clientSecret = data.client_secret
      if (clientId) {
        window.location.href = `http://shandenabian.skylarkly.com/oauth/authorize?client_id=${clientId}&redirect_uri=${this.code}&response_type=code`
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
