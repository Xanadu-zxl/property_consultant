<template>
  <div>
    <customer-tabbar :title="title" />
    <header class="header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
    <aside class="aside">
      <van-field label="客户姓名" placeholder="例如：张三" required v-model="customer_name" />
      <van-field label="客户性别" name="gender">
        <template #input>
          <van-radio-group direction="horizontal" v-model="customer_gender">
            <van-radio checked-color="#00A862" name="0">女</van-radio>
            <van-radio checked-color="#00A862" name="1">男</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        label="手机号码"
        placeholder="例如：10086"
        readonly
        type="number"
        v-model="customer_phone"
      />
      <van-field label="E-mail" placeholder="例如：10086@gmail.com" type="email" v-model="email" />

      <van-field
        :value="dataTime"
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

      <van-field label="意向等级" name="intention" required>
        <template #input>
          <van-radio-group direction="horizontal" v-model="intention">
            <van-radio checked-color="#00A862" name="A">A</van-radio>
            <van-radio checked-color="#00A862" name="B">B</van-radio>
            <van-radio checked-color="#00A862" name="C">C</van-radio>
            <van-radio checked-color="#00A862" name="D">D</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </aside>
    <footer class="footer">
      <router-link to="/real_estate/saler/message">保存</router-link>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '@/components/pages/tabbar'

export default {
  data () {
    return {
      title: '客户基础信息',
      id: '',
      phone: '',
      customer_name: '',
      customer_phone: '',
      email: '',
      birthday: '',
      customer_gender: '0',
      intention: 'A',
      dataTime: '',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      'response': {
        'entries_attributes': [
          {
            'field_id': 5723,
            'value': '张三'
          }
        ]
      },
      'user_id': 73
    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')

    // this.$axios({
    //   method: 'GET',
    //   url: '/magnate/saler/callers/new',
    //   headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    // }).then((data) => {
    //   console.log(data)
    // })
    this.$axios({
      method: 'POST',
      url: ' /magnate/saler/callers',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
      data: { 'response': this.response, 'user_id': this.user_id }
    }).then((data) => {
      console.log(data)
    })
  },
  methods: {
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.dataTime = this.dataTime
      this.showPicker = false
      console.log(this.dataTime) // 打印出了时间
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
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

.footer
  margin-top: 30px
  height: 50px
  line-height: 50px
  font-size: 15px
  font-weight: 600
  background: #00A862

  a
    color: #fff
    width: 100%
    display: block
</style>
