<template>
  <div>
    <customer-tabbar :title="title" />

    <header class="table_header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
    <aside class="table_aside">
      <div :key="field.identity_key" v-for="field in formData">
        <div v-if="field.type === 'Field::TextField'">
          <p v-if="field.identity_key == 'customer_name'">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              autocomplete="off"
              placeholder="请输入"
              required
              type="text"
              v-model="field.value"
            />
          </p>
          <p v-else-if="field.identity_key == 'customer_phone'">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              @blur="telBlur(field)"
              autocomplete="off"
              placeholder="请输入"
              required
              type="digit"
              v-model="field.value"
            />
          </p>

          <p v-else-if="field.identity_key">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              autocomplete="off"
              placeholder="请输入"
              type="text"
              v-model="field.value"
            />
          </p>
        </div>
        <div v-else-if="field['type'] === 'Field::RadioButton'">
          <div v-if="field.identity_key === 'intention'">
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
          </div>
          <div v-else-if="field.identity_key !== ''">
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
          </div>
        </div>
        <p v-else-if="field['type'] === 'Field::DateTime'">
          <van-field
            :id="field['identity_key']"
            :label="field['title']"
            :value="newTime"
            @click="showPicker = true"
            autocomplete="off"
            checked-color="#00A862"
            clickable
            readonly
            name="datetimePicker"
            placeholder="点击选择时间"
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
      <!-- 手机号遮罩层 -->
      <div @click="show = false" class="show" v-show="show">
        <div class="show_main">
          <h1>提示</h1>
          <h2>客户已存在，请重新输入手机号</h2>
          <div class="show_footer">
            <p>置业顾问：{{user_name}}</p>
            <p>客户姓名：{{customer_name}}</p>
            <p>首次到访时间：{{created_at}}</p>
          </div>
        </div>
      </div>

      <div class="footer"></div>
    </aside>
    <footer class="table_footer">
      <div @click="newTable">新建客户</div>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'

export default {
  data () {
    return {
      title: '到访客户',
      fields: [],
      orderFieldList: ['customer_source', 'customer_name', 'customer_phone', 'customer_gender', 'birthday', 'email', 'intention'],
      formData: [],
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      newTime: '',
      id: '',
      phone: '',
      show: false,
      created_at: '',
      customer_name: '',
      user_name: ''
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
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.newTime = this.dataTime
      this.showPicker = false
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },

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
              if (this.newTime) {
                payload.response.entries_attributes.push({ field_id: element.field_id, value: this.newTime })
              }
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
        url: '/magnate/saler/arrive_visitors',
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        data: payload
      }).then((res) => {
        this.$toast('新建成功 ✨')
        this.$router.push({ name: 'message', query: { response_id: res.data.id } })
      }).catch((err) => {
        console.log(err)
        this.$toast('新建失败 >_<')
      })
    },

    // 判定手机号
    telBlur (field) {
      if (field.value.length !== 11) {
        this.$toast('手机号位数错误🙅')
        field.value = ''
      }
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/arrive_visitors/valid_phone?customer_phone=' + field.value,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
      }).then((res) => {
        console.log(res)

        if (res.data.customer_phone) {
          field.value = ''
          this.created_at = res.data.created_at.slice(0, 10)
          this.customer_name = res.data.customer_name
          this.user_name = res.data.user_name
          this.show = true
        }
      })
    }
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
  height: 3.125rem;
}
// 遮罩层
.show {
  padding-top: 60%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: rgba(000, 000, 000, 0.2);
  .show_main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    background: #fff;
    margin: 0 auto;
    border-radius: 6px;
    height: 12.5rem;

    h1 {
      font-size: 18px;
      color: #222222;
      margin: 25px auto 15px;
    }
    h2 {
      width: 90%;
      font-size: 14px;
      color: #c15959;
      margin-bottom: 15px;
    }
    .show_footer {
      padding-top: 10px;
      width: 80%;
      border-top: 1px solid #d4d4d4;
      p {
        text-align: left;
        color: #787878;
        font-size: 12px;
        line-height: 20px;
      }
    }
  }
}
</style>
