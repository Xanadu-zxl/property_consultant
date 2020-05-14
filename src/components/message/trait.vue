<template>
  <div>
    <customer-tabbar :title="title" />

    <aside class="table_aside">
      <div :key="field.identity_key" v-for="field in formData">
        <div v-if="field.type === 'Field::TextField'">
          <van-field
            :id="field.identity_key"
            :label="field.title"
            placeholder="请输入"
            required
            type="text"
            v-model="field.value"
          />
        </div>
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
      title: '客户特征',
      fields: [],
      orderFieldList: ['feature'],
      formData: [],
      response_id: '',
      customer_phone: '',
      phone: '',
      id: '',
      newTime: '',
      ebtries: []
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
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: this.newTime })
              break
            }
            default: {
              // eslint-disable-next-line standard/object-curly-even-spacing
              this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: '' })
            }
          }
        }
      })
    }).then(() => {
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/arrive_visitors/' + this.response_id,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
      }).then((res) => {
        this.entries = res.data.entries

        Object.keys(res.data.mapped_values).forEach(element => {
          if (res.data.mapped_values[element]['text_value']) {
            let field = this.formData.find(field => field.identity_key === element)
            if (field) {
              switch (field.type) {
                case 'Field::RadioButton': {
                  let optionValue = res.data.mapped_values[element]['text_value'][0]
                  let options = this.fields.find(field => field.identity_key === element).options
                  field.option_id = options.find(option => option.value === optionValue).id
                  break
                }
                case 'Field::DateTime': {
                  field.value = res.data.mapped_values[element]['text_value'][0]
                  break
                }
                default: {
                  field.value = res.data.mapped_values[element]['text_value'][0]
                }
              }
            }
          }
        })
      })
    })
  },
  methods: {

    // 发送数据
    newTable () {
      let payload = { response: { entries_attributes: [] } }
      this.formData.forEach(field => {
        let entry = this.entries.find(entry => entry.field_id === field.field_id)

        switch (field.type) {
          case 'Field::RadioButton': {
            if (field.option_id) {
              if (entry && entry.option_id !== field.option_id) {
                payload.response.entries_attributes.push({ id: entry.id, option_id: field.option_id })
              } else if (entry) {

              } else {
                payload.response.entries_attributes.push({ field_id: field.field_id, option_id: field.option_id })
              }
            }
            break
          }
          default: {
            if (field.value) {
              if (entry && entry.value !== field.value) {
                payload.response.entries_attributes.push({ id: entry.id, value: field.value })
              } else if (entry) {

              } else {
                payload.response.entries_attributes.push({ field_id: field.field_id, value: field.value })
              }
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
  }

}
</script>

<style lang="scss" scoped>
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
