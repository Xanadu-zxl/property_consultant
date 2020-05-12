<template>
  <div>
    <buy-message-tabbar :title="title" />
    <div class="message-main">
      <div class="content">
        <div class="information-left">
          <div class="information-left-head">
            <img class="information-left-img" src="@/assets/img/Avator-Woman.png" />
          </div>
          <div class="information-left-matter">
            <h2>{{customer_name}}</h2>
            <p>
              <span>{{intention}}</span>
            </p>
          </div>
        </div>
        <router-link
          :to="{ name:'message',query:{customer_phone:customer_phone,response_id:response_id}}"
          class="information-right information-right-modify"
        >
          <i class="icon-Info-Icon-Edit"></i>
        </router-link>
        <a :href="'tel:'+ customer_phone" class="information-right">
          <i class="icon-Info-Icon-Phone"></i>
        </a>
      </div>
    </div>
    <div class="buy_message_content">
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>关注重点</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{focus}}</span>
        </div>
      </div>
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>客户特征</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{feature}}</span>
        </div>
      </div>
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>到访记录</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{planed_visit_time}}</span>
        </div>
      </div>
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>知晓途径</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{channel}}</span>
        </div>
      </div>
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>置业动机</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{motivation}}</span>
        </div>
      </div>

      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>家庭结构</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{family_structure}}</span>
        </div>
      </div>
      <div class="buy_message_content_body">
        <div class="buy_message_content_body_left">
          <span>喜好户型</span>
        </div>
        <div class="buy_message_content_body_right">
          <span>{{preferred_apartment}}</span>
        </div>
      </div>
    </div>
    <div class="buy_message_bottom"></div>
    <footer class="footer">
      <div class="buy_message_footer">
        <div @click="prompt" to="/#">认购</div>
      </div>
    </footer>
  </div>
</template>

<script>
import BuyMessageTabbar from '../pages/tabbar'
export default {
  data () {
    return {
      title: '客户信息',
      intention: '暂无意向',
      customer_name: ' ',
      customer_phone: '',
      preferred_apartment: ' ',
      id: ' ',
      phone: ' ',
      response_id: '',
      channel: ' ',
      motivation: ' ',
      focus: ' ',
      family_structure: ' ',
      feature: ' ',
      planed_visit_time: ' '
    }
  },
  components: {
    BuyMessageTabbar
  },

  mounted () {
    this.response_id = this.$route.query.response_id
    this.customer_phone = this.$route.query.customer_phone
    // 读取cookie
    this.id = this.$cookies.get('CURRENT_USER_ID')
    this.phone = this.$cookies.get('CURRENT_USER_PHONE')

    // 来访
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/arrive_visitors/' + this.response_id,
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone },
      qurey: { 'id': '70961' }
    }).then((res) => {
      console.log(res)
      let mappedValues = res.data.mapped_values
      if (mappedValues.customer_name) {
        this.customer_name = mappedValues.customer_name.text_value[0]
      }
      if (mappedValues.intention) {
        this.intention = mappedValues.intention.text_value[0]
      }
      if (mappedValues.preferred_apartment) {
        this.preferred_apartment = mappedValues.preferred_apartment.text_value[0]
      }
      if (mappedValues.focus) {
        this.focus = mappedValues.focus.text_value[0]
      }
      if (mappedValues.family_structure) {
        this.family_structure = mappedValues.family_structure.text_value[0]
      }
      if (mappedValues.motivation) {
        this.motivation = mappedValues.motivation.text_value[0]
      }
      if (mappedValues.feature) {
        this.feature = mappedValues.feature.text_value[0]
      }
      if (mappedValues.planed_visit_time) {
        this.planed_visit_time = mappedValues.planed_visit_time.text_value[0]
      }
    })
  },
  methods: {
    prompt () {
      this.$toast('开发中 ✨')
    } }
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

.buy_message_content_body {
  display: flex;
  justify-content: start;
  height: 51px;
  line-height: 51px;
  border-bottom: 1px solid #f0f2f4;

  .buy_message_content_body_left {
    width: 96px;
    text-align: center;
    color: #929292;
    font-size: 14px;
  }

  .buy_message_content_body_right {
    color: #222;
    font-size: 14px;
  }
}

.information-left {
  display: flex;
  justify-content: space-around;
  align-content: center;

  .information-left-img {
    width: 65px;
    margin: 10px auto;
    padding: 10px;
  }

  .information-left-matter {
    margin-left: -20px;
    text-align: left;
    padding: 32px;

    h2 {
      font-size: 15px;
      font-weight: 600;
      color: #222;
      width: 80px;
      margin-bottom: 5px;
    }
    p {
      font-size: 11px;
      color: #b2b2b2;
      margin-top: 5px;
      min-width: 100px;

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

// card

/deep/ .buy_message_content {
  width: 95%;
  margin: 0 auto;
  margin-top: 35px;

  .van-cell {
    line-height: 31px;
  }
  .van-field__label {
    text-align: left;
    color: #929292;
  }
  .van-field__body .van-field__control {
    color: #222;
  }
}

//底部
.buy_message_bottom {
  height: 50px;
}
.buy_message_footer {
  margin-top: 30px;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  font-weight: 600;
  background: #00a862;
  color: #fff;
  div {
    width: 100%;
    display: block;
  }
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0px;
}
</style>
