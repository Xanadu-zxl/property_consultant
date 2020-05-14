<template>
  <div>
    <header class="table_header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
    <aside class="table_aside">
      <div :key="field.identity_key" v-for="field in formData">
        <p v-if="field['type'] === 'Field::TextField'">
          <van-field
            :id="field.identity_key"
            :label="field['title']"
            type="text"
            v-model="field['value']"
          />
        </p>
        <p v-else-if="field['type'] === 'Field::RadioButton'">
          <van-field :label="field['title']">
            <template #input>
              <van-radio-group
                :id="field['identity_key']"
                direction="horizontal"
                v-model="field['option_id']"
              >
                <div :key="option.id" v-for="option in field.options">
                  <van-radio :name="option.id" checked-color="#00A862">{{ option.value }}</van-radio>
                </div>
              </van-radio-group>
            </template>
          </van-field>
        </p>
        <p v-else-if="field.type === 'Field::DateTime'">
          <van-field
            :id="field.identity_key"
            :label="field.title"
            :value="newTime"
            @click="showPicker = true"
            clickable
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
        </p>
      </div>

      <div class="footer"></div>
    </aside>
    <footer class="table_footer">
      <div @click="newTable">新建客户</div>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '来电客户',
      fields: [],
      orderFieldList: ['customer_name', 'customer_phone', 'customer_gender', 'channel', 'focus', 'motivation', 'planed_visit_time', 'demand_floor', 'travel_mode', 'call_area'],
      formData: [],
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      newTime: ''
    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    // 新增数据
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/callers/new',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      this.fields = res.data.fields

      this.orderFieldList.forEach(element => {
        let field = this.fields.find(field => field.identity_key === element)

        if (field) {
          switch (field.type) {
            case 'Field::RadioButton': {
              // eslint-disable-next-line standard/object-curly-even-spacing
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, option_id: '', options: field.options })
              break
            }
            case 'Field::DateTime': {
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: '' })
              break
            }
            // eslint-disable-next-line no-fallthrough
            default: {
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: '' })
            }
          }
        }
      })
    })
  },
  methods: {
    // 时间选择器
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      // let dateField = this.formatDate.find(field => field['identity_key'] === 'planed_visit_time')
      // dateField['value'] = this.dataTime
      this.newTime = this.dataTime
      this.showPicker = false
      console.log(this.newTime)
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },

    // 发送数据
    newTable () {
      let payload = { response: { entries_attributes: [] } }

      this.formData.forEach(element => {
        switch (element.type) {
          case 'Field::RadioButton': {
            if (element.option_id !== '' && element) {
              payload.response.entries_attributes.push({ field_id: element.field_id, option_id: element.option_id })
            }
            break
          }
          case 'Field::DateTime': {
            if (element.option_id !== '' && element) {
              payload.response.entries_attributes.push({ field_id: element.field_id, value: this.newTime })
            }
            break
          }
          default: {
            if (element.value !== '' && element) {
              payload.response.entries_attributes.push({ field_id: element.field_id, value: element.value })
            }
          }
        }
      })

      payload.user_id = this.$cookies.get('CURRENT-USER-ID')
      let salerField = this.fields.find(element => element.identity_key === 'saler')
      payload.response.entries_attributes.push({ value: this.$cookies.get('CURRENT-NAME'), field_id: salerField.id })
      let salerPhoneField = this.fields.find(element => element.identity_key === 'saler_phone')
      payload.response.entries_attributes.push({ value: this.$cookies.get('CURRENT-USER-PHONE'), field_id: salerPhoneField.id })

      this.$axios({
        method: 'POST',
        url: '/magnate/saler/callers',
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        data: payload
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          this.$toast('新建成功✨')
          // this.$router.push({path: '/customer'})
        }
      })
    }
    // onConfirm (currentDate) {
    //   this.dataTime = this.formatDate(currentDate)
    //   this.response.entries_attributes[12].value = this.dataTime
    //   this.showPicker = false
    //   // console.log(this.dataTime)
    // },
    // formatDate: function (d) {
    //   return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    // },
    // p (s) {
    //   return s < 10 ? '0' + s : s
    // },

    // // 发送数据
    // newTable () {
    //   this.$axios({
    //     method: 'POST',
    //     url: '/magnate/saler/callers',
    //     headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
    //     data: { 'response': this.response, 'user_id': this.user_id }
    //   }).then((res) => {
    //     console.log(res)
    //     if (res.status === 201) {
    //       this.$toast('新建成功✨')
    //     }
    //   })
    // },
    // telBlur () {
    //   // 去重
    //   this.$axios({
    //     method: 'GET',
    //     url: '/magnate/saler/arrive_visitors/valid_phone?customer_phone=' + this.response.entries_attributes[2].value,
    //     headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    //   }).then((res) => {
    //     console.log(res)
    //     if (res.data.customer_phone) {
    //       this.$toast('手机号重复✨')
    //     } else {
    //       this.$toast('手机号bubububuubu✨')
    //     }
    //   })
    // }
  }

}
</script>

<style lang="scss" scoped>
.table_header {
  width: 4.0625rem;
  margin: 0.8125rem auto 1.0625rem;
}

.table_header .img {
  width: 100%;
}

.table_aside {
  width: 84%;
  margin: 0 auto;
}

/deep/ .van-field {
  flex-direction: column;

  .van-field__label {
    text-align: left;
    padding: 0px;
    color: #222222;
    font-size: 17px;
    width: 190px;
  }
}

.van-field__body {
  margin-top: 15px;
  font-size: 15px;
}

.van-field__control {
  font-size: 15px;
}
.van-picker__cancel {
  color: #787878;
  font-size: 15px;
  font-weight: 600;
}
.van-radio--horizontal {
  margin: 4px;
}

.van-picker__confirm {
  color: #00a862;
  font-size: 15px;
  font-weight: 600;
}

.table_footer {
  margin-top: 30px;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  font-weight: 600;
  background: #00a862;
  color: #fff;
}

a {
  color: #fff;
}

.footer {
  height: 50px;
}
</style>
