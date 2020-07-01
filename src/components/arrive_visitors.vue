<template>
  <div>
    <customer-tabbar :title="title" />
    <van-loading class="loading" size="27px" type="spinner" v-show="isLoading">加载中...</van-loading>
    <iframe src="http://shandenabian.skylarkly.com/namespaces/1/forms/1/responses/new" v-show="!isLoading" class="iframe" frameborder="0"></iframe>
    <div  v-show="false">
      <header class="table_header">
        <img alt class="img" src="@/assets/img/Avator-Man.png" />
      </header>
      <aside class="table_aside">
        <div :key="field.identity_key" v-for="field in formData">
          <!-- text -->
          <div class="input_text" v-if="field.type === 'Field::TextField'">
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
            <p v-else-if="field.identity_key == 'reason'" />
            <p v-else-if="field.identity_key == 'lottery_results'" />
            <p v-else>
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
          <!-- 级联 -->
          <div class="input_text cascade" v-else-if="field.type ==='Field::CascadedSelect'">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              :value="cascadeValue"
              @click="showPickerCascade = true"
              clickable
              readonly
            />
            <van-popup position="bottom" round v-model="showPickerCascade">
              <van-picker
                :columns="columns"
                @cancel="showPickerCascade = false"
                @confirm="onConfirm"
                show-toolbar
              />
            </van-popup>
          </div>

          <!-- butoon -->
          <div v-else-if="field.type === 'Field::RadioButton'">
            <div v-if="field.identity_key === 'entitlement'" />
            <div v-else-if="field.identity_key === 'lottery'" />
            <div v-else>
              <van-field :label="field.title">
                <template #input>
                  <select
                    :id="field.identity_key"
                    class="table_aside_select"
                    v-model="field.option_id"
                  >
                    <option
                      :key="option.id"
                      :value="option.id"
                      class="table_aside_option"
                      v-for="option in field.options"
                    >{{ option.value }}</option>
                  </select>
                </template>
              </van-field>
            </div>
          </div>
          <p v-else-if="field.type === 'Field::DateTime'">
            <van-field
              :id="field.identity_key"
              :label="field.title"
              :value="newTime"
              @click="showPicker = true"
              autocomplete="off"
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
                @confirm="onConfirmDate"
                title="选择年月日"
                type="date"
                v-model="currentDate"
              />
            </van-popup>
          </p>
          <!-- button + text -->
        </div>
        <div class="button_text">
          <div :key="field.identity_key" v-for="field in formData">
            <div v-if="field.identity_key === 'entitlement'">
              <van-field :label="field.title">
                <template #input>
                  <van-radio-group
                    :id="field.identity_key"
                    direction="horizontal"
                    v-model="field.option_id"
                  >
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio
                        :name="option.id"
                        @click="buy(option)"
                        checked-color="#00A862"
                      >{{ option.value }}</van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div class="input_text" v-if="field.identity_key === 'reason'" v-show="reason">
              <van-field
                :id="field.identity_key"
                autocomplete="off"
                class="reason"
                placeholder="备注："
                type="text"
                v-model="field.value"
              />
            </div>
            <div v-if="field.identity_key === 'lottery'">
              <van-field :label="field.title">
                <template #input>
                  <van-radio-group
                    :id="field.identity_key"
                    direction="horizontal"
                    v-model="field.option_id"
                  >
                    <div :key="option.id" v-for="option in field.options">
                      <van-radio
                        :name="option.id"
                        @click="lottery(option)"
                        checked-color="#00A862"
                      >{{ option.value }}</van-radio>
                    </div>
                  </van-radio-group>
                </template>
              </van-field>
            </div>
            <div
              class="input_text"
              v-if="field.identity_key === 'lottery_results'"
              v-show="lottery_results"
            >
              <van-field
                :id="field.identity_key"
                autocomplete="off"
                class="reason"
                placeholder="请输入摇号号码："
                type="text"
                v-model="field.value"
              />
            </div>
          </div>
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
    </div>

    <!-- <footer class="table_footer">
      <div @click="newTable">新建客户</div>
    </footer> -->
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'
import api from '@/api/api'
import total from '@/api/total'
export default {
  data () {
    return {
      value: '',
      title: '新建客户',
      fields: [],
      cascadeValue: '',
      showPickerCascade: false,
      showPicker: false,
      columns: [],
      orderFieldList: ['ssx', 'time', 'customer_source', 'customer_name', 'customer_phone', 'customer_gender', 'age', 'entitlement', 'reason', 'birthday', 'email', 'intention', 'channel', 'motivation', 'focus', 'preferred_apartment', 'price_range', 'remark', 'working_area', 'living_area', 'payment_method', 'lottery', 'lottery_results', 'unicon_test', 'customer_resistance'],
      formData: [],
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),
      newTime: '',
      id: '',
      phone: '',
      show: false,
      created_at: '',
      customer_name: '',
      user_name: '',
      isLoading: true,
      reason: false,
      lottery_results: false
    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    // 新增数据
    api.getSaleraArriveVisitorsNewAPI().then(res => {
      this.isLoading = false
      this.columns = total.cascade(res.data.fields[22].cascaded_select.choices)
      this.fields = res.data.fields
      // 表单数据处理
      this.formData = total.tableListData(this.fields, this.orderFieldList)
    })
  },

  methods: {
    // 下拉
    onConfirm (cascadeValue) {
      let cascadeValueStr = `${cascadeValue[0]} - ${cascadeValue[1]} - ${cascadeValue[2]}`

      this.cascadeValue = cascadeValueStr
      this.showPickerCascade = false
    },
    // 是否有购房资格触发
    buy (option) {
      option.value === '无' ? this.reason = true : this.reason = false
    },
    // 是否有购房资格触发
    lottery (option) {
      option.value ? this.lottery_results = true : this.lottery_results = false
    },
    // 时间选择器赋值
    onConfirmDate (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.newTime = this.dataTime
      this.showPicker = false
    },
    // 时间格式处理
    formatDate: function (date) {
      return date.getFullYear() + '-' + this.setDate((date.getMonth() + 1)) + '-' + this.setDate(date.getDate())
    },
    setDate (date) {
      return date < 10 ? '0' + date : date
    },
    // 构建传输值的json格式
    newTable (formData) {
      let payload = { response: { entries_attributes: [] } }
      formData.forEach(element => {
        switch (element.type) {
          case 'Field::RadioButton': {
            if (element.option_id !== '' && element) {
              payload.response.entries_attributes.push({
                field_id: element.field_id,
                option_id: element.option_id })
            }
            break
          }
          case 'Field::DateTime': {
            if (element.option_id !== '' && element) {
              if (this.newTime) {
                payload.response.entries_attributes.push({
                  field_id: element.field_id,
                  value: this.newTime })
              }
            }
            break
          }
          case 'Field::CascadedSelect': {
            if (element.option_id !== '' && element) {
              if (this.cascadeValue) {
                payload.response.entries_attributes.push({
                  field_id: element.field_id,
                  option_id: 57 })
              }
            }
            break
          }
          default: {
            if (element.value !== '' && element) {
              payload.response.entries_attributes.push({
                field_id: element.field_id,
                value: element.value })
            }
          }
        }
      })
      // 自动填充值
      payload.user_id = this.$cookies.get('CURRENT-USER-ID')
      let salerField = this.fields.find(element => element.identity_key === 'saler')
      payload.response.entries_attributes.push({
        value: this.$cookies.get('CURRENT-NAME'),
        field_id: salerField.id })
      let salerPhoneField = this.fields.find(element => element.identity_key === 'saler_phone')
      payload.response.entries_attributes.push({
        value: this.$cookies.get('CURRENT-USER-PHONE'),
        field_id: salerPhoneField.id })
      api.postSalerArriveVisitorsAPI(payload).then(res => {
        console.log(payload)

        if (res.status === 201) {
          this.$toast('新建成功 ✨')
          this.$router.push({ name: 'message', query: { response_id: res.data.id } })
        } else {
          this.$toast('新建失败 >_<')
        }
      })
    },

    // 判定手机号
    telBlur (field) {
      if (field.value.length !== 11) {
        this.$toast('手机号位数错误🙅')
        field.value = ''
      }
      api.getPhoneRepeatAPI(field.value).then(res => {
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
.iframe{
  width: 100%;
  height: 62.5rem;
}

.loading {
  margin-top: 100px;
}

.table_header {
  width: 4.0625rem;
  margin: 0.8125rem auto 1.0625rem;
}

.table_header .img {
  width: 100%;
}

.table_aside {
  width: 87%;
  margin: 0 auto;
  overflow: hidden;

  .table_aside_select {
    width: 100%;
    height: 25px;
    border: none;
    background: transparent;
    outline: medium;
    border-bottom: 1px solid #dedede;
  }
  .table_aside_option {
    background: transparent;
  }
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

.reason {
  margin-top: -45px;
  margin-left: 4.375rem;
}

.input_text {
  /deep/ .van-field__control {
    border-bottom: 1px solid #e4e4e4;
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

.van-radio-group--horizontal {
  flex-direction: column;
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
  height: 100px;
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
