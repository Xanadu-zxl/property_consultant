<template>
  <div>
    <customer-tabbar :title="title" />
    <aside class="revisit_aside">
      <van-field class="revist_aside_visit_header" label="意向等级" name="intention">
        <template #input>
          <van-radio-group direction="horizontal" v-model="intention">
            <van-radio checked-color="#00A862" name="A">A很有意向</van-radio>
            <van-radio checked-color="#00A862" name="B">B较有意向</van-radio>
            <van-radio checked-color="#00A862" name="C">C可跟踪</van-radio>
            <van-radio checked-color="#00A862" name="D">D无意向</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- <van-field label="算价清单" name="intention">
        <template #input>
          <van-radio-group direction="horizontal" v-model="intention">
            <van-radio checked-color="#00A862" name="公寓">公寓</van-radio>
            <van-radio checked-color="#00A862" name="住宅">住宅</van-radio>
          </van-radio-group>
        </template>
      </van-field>-->
      <div class="revist_aside_visit">
        <div class="revist_aside_visit_left">
          <h2 class="revist_aside_visit_h2">回访记录</h2>
        </div>
        <div class="revist_aside_visit_right">
          <router-link
            class="revist_aside_visit_right_h3"
            to="/real_estate/saler/message/revisit/record"
          >新增</router-link>
        </div>
      </div>
      <div class="revist_aside_visit_body">
        <div class="revist_aside_visit-content">
          <p>
            <em>7</em> 次
          </p>
          <p>现场回访</p>
        </div>
        <div class="revist_aside_visit-content">
          <p>
            <em>7</em>次
          </p>
          <p>电话回访</p>
        </div>
      </div>
      <h3 class="revist_aside_visit_h3">详情记录</h3>
      <p class="revist_aside_content-header">
        <span>回访方式</span>
        <span>时间</span>
        <span>回访内容</span>
      </p>
      <div :key="item.id" class="revist_aside_content-header-content" v-for="item in revisit">
        <span>{{item.return_type}}</span>
        <span>{{item.revisit_date}}</span>
        <span>{{item.return_remark}}</span>
      </div>
    </aside>
  </div>
</template>

<script>
import CustomerTabbar from '../pages/tabbar'
export default {

  data () {
    return {
      title: '置业跟踪',
      intention: 'A',
      revisit: [],
      id: '',
      phone: '',
      customer_phone: '',
      response_id: ''

    }
  },
  components: {
    CustomerTabbar
  },
  mounted () {
    // 读取cookie
    this.id = this.$cookies.get('CURRENT_USER_ID')
    this.phone = this.$cookies.get('CURRENT_USER_PHONE')

    this.$axios({
      method: 'GET',
      url: '/magnate/saler/return_visit_records?customer_phone=' + 15928664925,
      headers: { 'CURRENT_USER_ID': this.id, 'CURRENT_USER_PHONE': this.phone }
    }).then((data) => {
      console.log(data)
    })
  }
}
</script>

<style lang="scss" scoped>
/deep/ .revisit_aside {
  width: 82%;
  margin: 0 auto;

  .van-radio-group--horizontal {
    margin-top: 10px;
  }

  .van-field__label {
    text-align: left;
  }
  .van-cell {
    flex-direction: column;
    padding: 10px 0px;
  }
  .van-radio__label {
    margin: 4px;
  }
  .revist_aside_visit_header .van-field__label {
    font-size: 16px;
    font-weight: 500;
  }
}

.revist_aside_visit_right_h3 {
  color: #00a862;
  font-size: 14px;
}
//销售记录
.revist_aside_visit {
  display: flex;
  justify-content: space-between;
  padding: 30px 0px 10px;
}

.revist_aside_visit_body {
  height: 80px;
  display: flex;
  justify-content: space-around;
  border-radius: 4px;
  color: #787878;
  font-size: 11px;
  line-height: 80px;
  background: rgba(212, 212, 212, 0.2);
}

.revist_aside_visit-content {
  width: 33%;
  display: flex;
  flex-direction: column;
}

.revist_aside_visit-content p {
  height: 20px;
  line-height: 60px;
}

.revist_aside_visit-content p em {
  color: #00a862;
  font-size: 20px;
  font-weight: 600;
  margin: 5px;
}
.revist_aside_visit-content p i {
  font-size: 20px;
}
.revist_aside_visit_h3 {
  text-align: left;
  margin-top: 20px;
  color: #a4a4a4;
}

//详情记录
.revist_aside_content-header {
  line-height: 30px;
  color: #00a862;
  font-size: 0.625rem;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  background: rgba(0, 168, 98, 0.08);
  margin-top: 10px;
}

.revist_aside_content-header-content {
  line-height: 30px;
  display: flex;
  color: #787878;
  justify-content: space-between;
}
.revist_aside_content-header span,
.revist_aside_content-header-content span {
  width: 33%;
}

.revist_aside_visit_h2 {
  font-size: 16px;
}
</style>
