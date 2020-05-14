<template>
  <div>
    <customer-tabbar :title="title" />
    <div class="message-main">
      <div class="content">
        <div class="information-left">
          <div class="information-left-head">
            <img class="information-left-img" src="@/assets/img/Avator-Man.png" />
          </div>
          <div class="information-left-matter">
            <h2>{{customer_name}}</h2>
            <p>
              意向户型：
              <span>{{preferred_apartment}}</span>
            </p>
          </div>
        </div>
        <a :href="'tel:'+ customer_phone" class="information-right">
          <i class="icon-Info-Icon-Phone"></i>
        </a>
      </div>
    </div>

    <div class="message-content">
      <router-link
        :to="{ name:'init',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-File message-style-green"></i>
        <span class="message-project-title">基础信息</span>
      </router-link>
      <router-link
        :to="{name:'channel',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-link message-style-orange"></i>
        <span class="message-project-title">知晓途径</span>
      </router-link>
      <div @click="prompt" class="message-project">
        <i class="icon-Info-Icon-Price message-style-blue"></i>
        <span class="message-project-title">户型算价</span>
      </div>
      <router-link
        :to="{name:'trait',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-User message-style-gray"></i>
        <span class="message-project-title">客户特征</span>
      </router-link>
      <router-link
        :to="{name:'motivation',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Question message-style-red"></i>
        <span class="message-project-title">置业动机</span>
      </router-link>
      <router-link
        :to="{name:'living_area',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Region message-style-green"></i>
        <span class="message-project-title">客户区域</span>
      </router-link>
      <router-link
        :to="{name:'customer_type',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Structure message-style-red"></i>
        <span class="message-project-title">家庭结构</span>
      </router-link>
      <router-link
        :to="{name:'focus',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Star message-style-blue"></i>
        <span class="message-project-title">关注重点</span>
      </router-link>
      <router-link
        :to="{name:'preferred_apartment',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Type message-style-orange"></i>
        <span class="message-project-title">意向户型</span>
      </router-link>
      <router-link
        :to="{ name:'revisit',query:{customer_phone:customer_phone,response_id:response_id}}"
        class="message-project"
      >
        <i class="icon-Info-Icon-Foot message-style-blue"></i>
        <span class="message-project-title">置业跟踪</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import CustomerTabbar from '@/components/pages/tabbar'

export default {
  data () {
    return {
      title: '客户信息',
      customer_name: 'xxx',
      preferred_apartment: 'xxx',
      planed_visit_time: '0000/00/00',
      response_id: '',
      customer_phone: '',
      id: '',
      phone: ''
    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    this.response_id = this.$route.query.response_id
    this.customer_phone = this.$route.query.customer_phone
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')

    this.$axios({
      method: 'GET',
      url: '/magnate/saler/arrive_visitors/' + this.response_id,
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      console.log(res)
      let mappedValues = res.data.mapped_values
      if (mappedValues.customer_name) {
        this.customer_name = mappedValues.customer_name.text_value[0]
      }
      if (mappedValues.preferred_apartment) {
        this.preferred_apartment = mappedValues.preferred_apartment.text_value[0]
      }
      if (mappedValues.planed_visit_time) {
        this.planed_visit_time = mappedValues.planed_visit_time.text_value[0]
      }
    })
  },
  methods: {
    prompt () {
      this.$toast('开发中 ✨')
    }
  }
}
</script>

<style lang="scss" scoped>
.message-main {
  width: 94%;
  background: url('../../assets/img/info-bg.png');
  margin: 0 auto;
  height: 112px;
  background-size: cover;
  border-radius: 4px;
  display: flex;
}
.content {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
}

.information-left {
  display: flex;
  justify-content: space-around;
  align-content: center;

  .information-left-img {
    width: 65px;
    margin: 10px auto;
  }

  .information-left-matter {
    margin-left: 10px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h2 {
      font-size: 15px;
      font-weight: 600;
      color: #222;
      margin-bottom: 5px;
    }
    p {
      font-size: 11px;
      color: #b2b2b2;
      margin-top: 5px;

      span {
        color: #fff;
        border-radius: 2px;
        background: #b2b2b2;
        padding: 2px 4px;
      }
    }
  }
}
.information-right {
  background: #b6d0c4;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  text-align: center;
  line-height: 44px;
}
.message-content {
  width: 94%;
  margin: 35px auto 0px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;

  .message-project {
    height: 90px;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      width: 42px;
      height: 42px;
      display: block;
      border-radius: 50%;
    }

    .message-project-title {
      color: #787878;
      font-size: 13px;
      margin-top: 8px;
    }
  }
  .message-style-green {
    background-image: linear-gradient(#4de5a4, #19d180);
  }
  .message-style-blue {
    background-image: linear-gradient(#0dd4e9, #0091ff);
  }
  .message-style-orange {
    background-image: linear-gradient(#fe9e20, #f97119);
  }
  .message-style-red {
    background-image: linear-gradient(#fe5d5d, #f56c32);
  }
  .message-style-gray {
    background-image: linear-gradient(#dba875, #b8864a);
  }
}
</style>
