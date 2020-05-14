<template>
  <div>
    <customer-tabbar :title="title" />
    <nav class="call_new_nav">
      <div class="call_new_nav_body">
        <router-link class="call_new_nav_body_left" to="/real_estate/saler/caller/new">新建客户</router-link>
        <router-link class="call_new_nav_body_right" to="/real_estate/saler/caller/view">查看客户</router-link>
      </div>
    </nav>

    <!-- <div :key="field.identity_key" v-for="field in formData">
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
    </p>-->
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
    <!-- </div> -->

    <!-- <footer class="table_footer">
      <div @click="newTable">新建客户</div>
    </footer>-->
    <router-view></router-view>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
// import channelVue from '../message/channel.vue'

export default {
  data () {
    return {
      title: '来电客户'
      // textList: [],
      // radioList: [],
      // dataList: [],
      // orderFieldList: ['customer_name', 'customer_phone', 'channel', 'focus', 'motivation', 'planed_visit_time', 'demand_floor', 'travel_mode', 'call_area'],
      // formData: [],
      // showPicker: false,
      // minDate: new Date(1900, 0, 1),
      // maxDate: new Date(2220, 10, 1),
      // currentDate: new Date()
    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    // 新增数据
    // this.$axios({
    //   method: 'GET',
    //   url: '/magnate/saler/callers/new',
    //   headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
    // }).then((res) => {
    //   console.log(res)

    //   const fields = res.data.fields

    //   this.orderFieldList.forEach(element => {
    //     let field = fields.find(field => field.identity_key === element)

    //     if (field) {
    //       switch (field.type) {
    //         case 'Field::RadioButton': {
    //           // eslint-disable-next-line standard/object-curly-even-spacing
    //           this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, option_id: '', options: field.options })
    //           break
    //         }
    //         // case 'Field::DateTime': {
    //         //   this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: ''})
    //         // }
    //         default: {
    //           // eslint-disable-next-line standard/object-curly-even-spacing
    //           this.formData.push({ field_id: field.id, identity_key: field.identity_key, type: field.type, title: field.title, value: '' })
    //         }
    //       }
    //     }
    //   })

    //   console.log(this.formData)
    // })
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
      // let payload = { response: { entries_attributes: [] } }

      // this.formData.forEach(element => {
      //   console.log(element)
      //   switch (element.type) {
      //     case 'Field::RadioButton': {
      //       if (element.option_id !== '' && element) {
      //         payload.response.entries_attributes.push({ field_id: element.field_id, option_id: element.option_id })
      //       }
      //       break
      //     }
      //     default: {
      //       if (element.value !== '' && element) {
      //         payload.response.entries_attributes.push({ field_id: element.field_id, value: element.value })
      //       }
      //     }
      //   }
      // })

      // payload.user_id = this.$cookies.get('CURRENT-USER-ID')

      // this.$axios({
      //   method: 'POST',
      //   url: '/magnate/saler/callers',
      //   headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone },
      //   data: payload
      // }).then((res) => {
      //   console.log(res)
      //   if (res.status === 201) {
      //     this.$toast('新建成功✨')
      //   }
      // })
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
.call_new_nav {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.call_new_nav_body {
  display: flex;
  justify-content: space-around;
  line-height: 47px;
}

.call_new_nav_body_left,
.call_new_nav_body_right {
  font-size: 14px;
  color: #aaa;
  font-weight: 600;
}

.router-link-active {
  border-bottom: 3px solid #00a862;
  color: #00a862;
}
</style>
