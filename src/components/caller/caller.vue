<template>
  <div>
    <customer-tabbar :title="title" />
    <nav class="call_new_nav">
      <div class="call_new_nav_body">
        <router-link class="call_new_nav_body_left" to="/real_estate/saler/caller/new">新建客户</router-link>
        <router-link class="call_new_nav_body_right" to="/real_estate/saler/caller/view">查看客户</router-link>
      </div>
    </nav>111
    <div v-for="item in textList">
      <van-field :label="this.title" placeholder="例如：张三" type="text" />
    </div>
    <van-field label="客户性别" name="gender">
      <template #input>
        <van-radio-group direction="horizontal">
          <van-radio checked-color="#00A862" name="女">女</van-radio>
          <van-radio checked-color="#00A862" name="男">男</van-radio>
        </van-radio-group>
      </template>
    </van-field>

    <router-view></router-view>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'

export default {
  data () {
    return {
      title: '来电客户',
      user_id: '',
      textList: [],
      radioList: [],
      dataList: []
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
      this.user_id = res.data.id
      console.log(res)
      console.log(res.data.fields[0].type)
      let fields = res.data.fields
      for (let i = 0; i < fields.length; i++) {
        // 表单数据分组
        if (fields[i].type === 'Field::Member') {
          this.textList.push(fields[i])
        }
        if (fields[i].type === 'Field::TextField') {
          this.textList.push(fields[i])
        }
        if (fields[i].type === 'Field::RadioButton') {
          this.radioList.push(fields[i])
        }
        if (fields[i].type === 'Field::Detail') {
          this.radioList.push(fields[i])
        }
        if (fields[i].type === 'Field::DateTime') {
          this.dataList.push(fields[i])
        }
      }
      console.log(this.textList)
      console.log(this.radioList)
      console.log(this.dataList)
    })
  },
  methods: {
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
