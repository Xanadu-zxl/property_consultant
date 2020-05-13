<template>
  <div>
    <header class="table_header">
      <img alt class="img" src="@/assets/img/Avator-Man.png" />
    </header>
    <aside class="table_aside">
      <van-field
        label="客户姓名"
        placeholder="例如：张三"
        type="text"
        v-model="response.entries_attributes[0].value"
      />
      <van-field label="客户性别" name="gender">
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[1].value">
            <van-radio checked-color="#00A862" name="女">女</van-radio>
            <van-radio checked-color="#00A862" name="男">男</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        label="手机号码"
        placeholder="例如：19229298787"
        type="number"
        v-model="response.entries_attributes[2].value"
      />
      <van-field label="知晓途径" name="channel">
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[3].value">
            <van-radio checked-color="#00A862" name="媒体">媒体</van-radio>
            <van-radio checked-color="#00A862" name="朋友介绍">朋友介绍</van-radio>
            <van-radio checked-color="#00A862" name="行销">行销</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        label="询问重点"
        placeholder="例如：公摊面积"
        type="text"
        v-model="response.entries_attributes[5].value"
      />
      <van-field
        label="置业动机"
        placeholder="例如：养老"
        type="text"
        v-model="response.entries_attributes[6].value"
      ></van-field>

      <van-field
        label="需求楼层"
        name="demand_floor"
        placeholder="例如：01"
        type="number"
        v-model="response.entries_attributes[7].value"
      />
      <van-field label="出行方式" name="travel_mode">
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[8].value">
            <van-radio checked-color="#00A862" name="开车">开车</van-radio>
            <van-radio checked-color="#00A862" name="公交">公交</van-radio>
            <van-radio checked-color="#00A862" name="步行">步行</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field label="来电区域" name="call_area">
        <template #input>
          <van-radio-group direction="horizontal" v-model="response.entries_attributes[10].value">
            <van-radio checked-color="#00A862" name="武侯区">武侯区</van-radio>
            <van-radio checked-color="#00A862" name="青羊区">青羊区</van-radio>
            <van-radio checked-color="#00A862" name="高新区">高新区</van-radio>
            <van-radio checked-color="#00A862" name="郫都区">郫都区</van-radio>
            <van-radio checked-color="#00A862" name="金牛区">金牛区</van-radio>
            <van-radio checked-color="#00A862" name="青白江区">青白江区</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        label="备注"
        placeholder="请输入："
        type="text"
        v-model="response.entries_attributes[11].value"
      />
      <van-field
        :value="response.entries_attributes[12].value"
        @click="showPicker = true"
        clickable
        label="预计到访时间"
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
      active: 0,
      list: [{
        customer_name: '张先生',
        customer_phone: 'xxx'
      }],
      dataTime: '',
      response_id: '',
      customer_name: '',
      customer_gender: '1',
      customer_phone: '',
      remark: '',
      motivation: '',
      channel: '传单',
      travel_mode: '步行',
      call_area: '高新区',
      demand_floor: '',
      focus: '',
      planed_visit_time: '',
      showPicker: false,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2220, 10, 1),
      currentDate: new Date(),

      response: {
        entries_attributes: [
          {
            'field_id': 5723,
            'value': ''
          },
          {
            'field_id': 5724,
            'value': '女'
          },
          {
            'field_id': 5725,
            'value': ''
          },
          {
            'field_id': 5726,
            'value': '媒体'
          },
          {
            'field_id': 5727,
            'value': '默认'
          },
          {
            'field_id': 5728,
            'value': ''
          },
          {
            'field_id': 5729,
            'value': ''
          },
          {
            'field_id': 5730,
            'value': ''
          },
          {
            'field_id': 5731,
            'value': '开车'
          },
          {
            'field_id': 5732,
            'value': '默认'
          },
          {
            'field_id': 5733,
            'value': '青羊区'
          },
          {
            'field_id': 5734,
            'value': '默认'
          },
          {
            'field_id': 5736,
            'value': ''
          }
        ]
      },
      user_id: ''
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
      // console.log(res)
    })
  },
  methods: {
    onConfirm (currentDate) {
      this.dataTime = this.formatDate(currentDate)
      this.response.entries_attributes[12].value = this.dataTime
      this.showPicker = false
      // console.log(this.dataTime)
    },
    formatDate: function (d) {
      return d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    },
    p (s) {
      return s < 10 ? '0' + s : s
    },

    // 发送数据
    newTable () {
      this.$axios({
        method: 'POST',
        url: '/magnate/saler/callers',
        headers: { 'CURRENT-USER_ID': this.id, 'CURRENT-USER-PHONE': this.phone },
        data: { 'response': this.response, 'user_id': this.user_id }
      }).then((res) => {
        console.log(res)
        if (res.status === 201) {
          this.$toast('新建成功✨')
        }
      })
    },
    telBlur () {
      // 去重
      this.$axios({
        method: 'GET',
        url: '/magnate/saler/arrive_visitors/valid_phone?customer_phone=' + this.response.entries_attributes[2].value,
        headers: { 'CURRENT-USER-ID': this.id, 'CURRENT-USER-PHONE': this.phone }
      }).then((res) => {
        console.log(res)
        if (res.data.customer_phone) {
          this.$toast('手机号重复✨')
        } else {
          this.$toast('手机号bubububuubu✨')
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
  height: 50px;
}
</style>
