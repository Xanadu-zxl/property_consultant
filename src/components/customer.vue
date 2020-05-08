<template>
  <div>
    <customer-tabbar :title="title" />
    <router-link to="/real_estate/saler/visit" class="customer-phone">
      <img alt src="@/assets/img/Card-Visit.png" />
      <span>到访客户</span>
    </router-link>
    <router-link to="/real_estate/saler/call" class="customer-visit">
      <img alt src="@/assets/img/Card-phone.png" />
      <span>来电客户</span>
    </router-link>
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'
import axios from 'axios'

export default {
  data () {
    return {
      title: '新客户'

    }
  },
  components: {
    CustomerTabbar
  },
  methods: {
    doRequst () {
      console.log('111')
      //   axios.get('http://192.168.2.115:3000/magnate/oauth')
      axios.get('http://skylark-local.natappvip.cc/magnate/oauth')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    mounted () {
      this.doRequst()
    }
  }

}
</script>

<style  scoped>
.customer-phone,
.customer-visit {
  width: 80%;
  margin: 0px auto;
  height: 100px;
  display: block;
  position: relative;
}

.customer-phone {
  margin-top: 72px;
}
.customer-visit {
  margin-top: 20px;
}

.customer-phone img,
.customer-visit img {
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
.customer-phone span,
.customer-visit span {
  position: absolute;
  left: 23px;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: 1;
  top: 50%;
  transform: translate(0%, -50%);
}
</style>
