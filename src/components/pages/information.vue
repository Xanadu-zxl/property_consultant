<template>
  <div>
    <div :key="item.customer_phone" class="content" v-for="item in list">
      <div class="information-left">
        <div class="information-left-head">
          <img class="information-left-img" src="@/assets/img/Avator-Woman.png" />
        </div>
        <div class="information-left-matter">
          <h2>{{item.customer_name}}</h2>
          <p>电话：{{item.customer_phone}}</p>
          <p>意向：{{item.intention}}</p>
        </div>
      </div>
      <div class="information-right">
        <i class="icon-Info-Icon-Phone"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        customer_name: '张先生',
        customer_phone: '1212123',
        intention: '公寓',
        customer_gender: '1'
      }, {
        customer_name: '张先生',
        customer_phone: '1123',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张先生',
        customer_phone: '12232312123',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张先生',
        customer_phone: '1212135323',
        intention: '公寓',
        customer_gender: '男'
      }, {
        customer_name: '张女士',
        customer_phone: '12676812123',
        intention: '公寓',
        customer_gender: '女'
      }
      ]

    }
  }

}
</script>

<style lang="scss" scoped>
.content {
  width: 88%;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.information-left {
  display: flex;
  justify-content: space-around;
  align-content: center;

  .information-left-img {
    width: 46px;
    margin: 10px auto;
  }

  .information-left-matter {
    margin-left: 10px;
    text-align: left;

    h2 {
      font-size: 15px;
      font-weight: 600;
      color: #222;
      margin-bottom: 5px;
    }
    p {
      font-size: 11px;
      color: #b2b2b2;
      margin-top: 5px;
    }
  }
}
.information-right {
  background: #e4f3ec;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 38px;
}
</style>
