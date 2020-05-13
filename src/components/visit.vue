<template>
  <div>
    <customer-tabbar :title="title" />
    <header class="header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
    <aside class="aside">
      <van-field
        label="客户姓名"
        placeholder="例如：张三"
        required
        v-model="response.entries_attributes[0].value"
      />
      <van-field
        @blur="telBlur"
        label="手机号码"
        placeholder="例如：16767456534"
        required
        type="number"
        v-model="response.entries_attributes[1].value"
      />
      <van-field label="客户性别" name="gender">
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[2].value">
            <van-radio checked-color="#00A862" name="女">女</van-radio>
            <van-radio checked-color="#00A862" name="男">男</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="E-mail" placeholder="例如：10086@gmail.com" type="email" v-model="email" />
      <van-field label="知晓途径" name="intention" required>
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[3].value">
            <van-radio checked-color="#00A862" name="媒体">媒体</van-radio>
            <van-radio checked-color="#00A862" name="微博">微博</van-radio>
            <van-radio checked-color="#00A862" name="行销">行销</van-radio>
            <van-radio checked-color="#00A862" name="小蜜蜂">小蜜蜂</van-radio>
            <van-radio checked-color="#00A862" name="线下活动">线下活动</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        :value="response.entries_attributes[4].value"
        @click="showPicker = true"
        clickable
        label="生日"
        name="datetimePicker"
        placeholder="点击选择时间"
        readonly
      />
      <van-popup position="bottom" round v-model="showPicker">
        <van-datetime-picker
          :max-date="maxDate"
          :min-date="minDate"
          @cancel="showPicker = false"
          @confirm="onConfirm"
          title="选择年月日"
          type="date"
          v-model="currentDate"
        />
      </van-popup>
      <div class="footer"></div>
    </aside>
    <footer class="vitit_footer">
      <div @click="newTable">新建客户</div>
      <!-- to="/real_estate/saler/message" -->
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'

export default {
  data () {
    return {
      title: '客户基础信息',
      id: '',
      phone: '',
      customer_name: '',
      customer_phone: '13880430888',
      email: '',
      birthday: '',
      customer_gender: '0',
      intention: 'A',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      response: {
        entries_attributes: [
          {
            'field_id': 5678,
            'value': ''
          },
          {
            'field_id': 5679,
            'value': ''
          },
          {
            'field_id': 5680,
            'value': '女'
          },

          {
            'field_id': 5681,
            'value': '行销'
          },
          {
            'field_id': 5706,
            'value': ''
          }
        ]
      },
      user_id: ''
    }
  },

  components: {
    CustomerTabbar
  },

  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')

    // 新增数据
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/arrive_visitors/new',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      this.user_id = res.data.id
      console.log(res)
    })
  },
  methods: {
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.response.entries_attributes[4].value = this.dataTime
      this.showPicker = false
      // console.log(this.dataTime)
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },

    // 发送数据
    newTable () {
      this.$axios({
        method: 'POST',
        url: '/magnate/saler/arrive_visitors',
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        data: { 'response': this.response, 'user_id': this.user_id }
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          this.$toast('新建成功✨')
        }
      })
    },
    telBlur () {
      // 去重
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/arrive_visitors/valid_phone?customer_phone=' + this.response.entries_attributes[2].value,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
      }).then((res) => {
        console.log(res)
        if (res.data.customer_phone) {
          this.$toast('手机号重复✨')
        } else {
          this.$toast('手机号bubububuubu✨')
        }
      })
      console.log('shoujihao')
    }
  }
}
</script>

<style  scoped lang="sass">
.header
  width: 65px
  margin: 0 auto 1.0625rem

.header .img
  width: 100%

.aside
  width: 84%
  margin: 0 auto

/deep/
  .van-field
    flex-direction: column

  .van-field__label
    text-align: left
    padding: 0px
    color: #222222
    font-size: 17px
    width: 150px

  .van-field__body
    margin-top: 15px
    font-size: 15px

  .van-field__control
    font-size: 15px

  .van-picker__cancel
    color: #787878
    font-size: 15px
    font-weight: 600

  .van-picker__confirm
    color: #00a862
    font-size: 15px
    font-weight: 600

  .van-icon-play
    display: block
    transform: rotate(90deg)

  .van-radio--horizontal
    margin: 5px 2px

  .footer
    height: 50px

.vitit_footer
  margin-top: 30px
  height: 50px
  position: fixed
  bottom: 0px
  width: 100%
  line-height: 50px
  font-size: 15px
  font-weight: 600
  background: #00A862
  color: #fff

  a
    color: #fff
    width: 100%
    display: block
</style>
