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

        <a :href="'tel:'+ customer_phone" class="information-right">
          <i class="icon-Info-Icon-Phone"></i>
        </a>
      </div>
    </div>
    <aside class="table_aside">
      <div :key="field.identity_key" v-for="field in formData">
        <p v-if="field['type'] === 'Field::TextField'">
          <van-field
            :id="field['identity_key']"
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
        <!-- <p v-else-if="field['type'] === 'Field::DateTime'">
         <van-field
        :value="field['value']"
        @click="showPicker = true"
        clickable
        :label="field['title']"
        name="datetimePicker"
        placeholder="点击选择时间"
        readonly
        :id="field['identity_key']"
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
        </p>-->
      </div>

      <div class="footer"></div>
    </aside>
    <footer class="table_footer">
      <div @click="newTable">新建客户</div>
    </footer>
  </div>
</template>

<script>
import BuyMessageTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '来电客户',
      fields: [],
      orderFieldList: ['customer_name', 'customer_phone', 'channel', 'focus', 'motivation', 'planed_visit_time', 'demand_floor', 'travel_mode', 'call_area'],
      formData: [],
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      response_id: '',
      customer_phone: '',
      phone: '',
      id: '',
      customer_name: 'xxx',
      intention: '暂无意向'

    }
  },
  components: {
    BuyMessageTabbar
  },
  mounted () {
    this.response_id = this.$route.query.response_id
    this.customer_phone = this.$route.query.customer_phone
    // 读取cookie
    this.id = this.$cookies.get('CURRENT-USER-ID')
    this.phone = this.$cookies.get('CURRENT-USER-PHONE')
    // 新增数据
    this.$axios({
      method: 'GET',
      url: '/magnate/saler/callers/new',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      console.log(res)

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
            // case 'Field::DateTime': {
            //   this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: ''})
            // }
            default: {
              // eslint-disable-next-line standard/object-curly-even-spacing
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: '' })
            }
          }
        }
      })
    })
  },
  methods: {
    // onConfirm (currentDate) {
    //   this.dataTime = this.formatDate(currentDate)
    //   let dateField = this.formatDate.find(field => field['identity_key'] === 'planed_visit_time')
    //   dateField['value'] = this.dataTime
    //   this.showPicker = false
    //   // console.log(this.dataTime)
    // },
    // formatDate: function (d) {
    //   return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    // },
    // p (s) {
    //   return s < 10 ? '0' + s : s
    // },

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
</style>
