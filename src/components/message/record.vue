<template>
  <div>
    <customer-tabbar :title="title" />
    <aside class="aside">
      <van-field label="客户" name="gender">
        <template #input>
          <van-radio-group direction="horizontal">
            <van-radio checked-color="#00A862" name="电话回访">电话回访</van-radio>
            <van-radio checked-color="#00A862" name="现场回访">现场回访</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        :value="dataTime"
        @click="showPicker = true"
        clickable
        label="回访时间"
        name="datetimePicker"
        placeholder="请选择"
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
      <van-field label="回访内容" placeholder="请输入描述" type="text" />
    </aside>
    <footer class="footer">
      <div @click="sendTable">确认新增</div>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '新增回访记录',
      id: '',
      phone: '',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      response_id: '',
      customer_phone: '',
      dataTime: '',
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
    this.response_id = this.$route.query.response_id
    this.customer_phone = this.$route.query.customer_phone
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')
  },
  methods: {
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.showPicker = false
      console.log(this.dataTime) // 打印出了时间
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },
    sendTable () {
      // 回访
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/return_visit_records/current_user_return_records?customer_phone=' + this.customer_phone,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
      }).then((res) => {
        this.revisit = res.data
        // console.log(res)
        // 格式化时间
        for (let i = 0; i < res.data.length; i++) {
          let lastDataTime = res.data[i].revisit_date
          lastDataTime = lastDataTime.slice(0, 10)
          this.revisit[i].lastDataTime = lastDataTime
        }
      })
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
  width: 92%
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

  .van-radio--horizontal
    margin: 5px

.footer
  position: fixed
  bottom: 0px
  margin-top: 30px
  height: 50px
  width: 100%
  line-height: 50px
  font-size: 15px
  font-weight: 600
  color: #fff
  background: #00A862

  a
    color: #fff
    width: 100%
    display: block
</style>
