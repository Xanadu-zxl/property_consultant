<template>
  <div>
    <customer-tabbar :title="title" />

    <header class="table_header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
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
        <p v-else-if="field['type'] === 'Field::DateTime'">
          <van-field
            :id="field['identity_key']"
            :label="field['title']"
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
      <div @click="newTable">保存</div>
    </footer>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '客户基础信息',
      fields: [],
      orderFieldList: ['customer_name', 'customer_phone', 'email', 'intention'],
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
      url: '/magnate/saler/arrive_visitors/new',
      headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    }).then((res) => {
      // console.log(res)

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

      this.$axios({
        method: 'PUT',
        url: '/magnate/saler/arrive_visitors/' + this.response_id,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        data: payload
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$toast('更新成功✨')
        }
      })
    }
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
