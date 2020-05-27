<template>
  <div class="guest">
    <header class="guest_header">判客岗</header>
    <article class="guest_search">
      <van-search
        @blur="onSearch"
        @search="onSearch"
        autofocus
        maxlength="11"
        placeholder="请输入11位手机号"
        show-action
        type="number"
        v-model="number"
      >
        <template #action>
          <div @click="onSearch" class="guest_search_title">搜索</div>
        </template>
      </van-search>
    </article>
    <footer class="guest_footer">
      <section class="guesst_footer_hint" v-show="showResult">
        <div class="guesst_footer_hint_fail" v-show="show">
          <h1>
            <van-icon class="guesst_footer_hint_fail_icon" name="fail" />
          </h1>
          <h2>客户已存在</h2>
          <div class="guesst_footer_hint_fail_message">
            <p>客户姓名：{{customer_name}}</p>
            <p>置业顾问：{{user_name}}</p>
            <p>首次到访时间：{{created_at}}</p>
          </div>
        </div>
        <div class="guesst_footer_hint_success" v-show="!show">
          <h1>
            <van-icon class="guesst_footer_hint_success_icon" name="success" />
          </h1>
          <h2>该客户为新客户</h2>
        </div>
      </section>
      <section v-show="!showResult">
        <img alt class="guest_footer_img" src="@/assets/img/Judgement-Img.png" />
      </section>
    </footer>
  </div>
</template>

<script>
import api from '@/api/api'
export default {
  data () {
    return {
      number: '',
      created_at: '',
      customer_name: '',
      user_name: '',
      showResult: false,
      show: true
    }
  },
  methods: {
    onSearch () {
      if (this.number) {
        api.getPhoneRepeatAPI(this.number).then(res => {
          this.showResult = true
          if (res.data.customer_phone) {
            this.created_at = res.data.created_at.slice(0, 10)
            this.customer_name = res.data.customer_name
            this.user_name = res.data.user_name
            this.show = true
          } else {
            this.show = false
          }
        })
      } else {
        this.showResult = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.guest {
  width: 90%;
  margin: 0 auto;

  .guest_header {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    height: 3.125rem;
    line-height: 3.125rem;
  }

  .van-search .van-cell {
    height: 50px;
    line-height: 40px;
    border: 1px solid #cbcbcb;
    border-radius: 6px;
    box-shadow: 0px 1px 7px 1px rgba(206, 206, 206, 1);
  }

  /deep/ .van-field__left-icon {
    margin: 0px 0.5rem;
    .van-icon-search::before {
      font-size: 20px;
    }
  }

  .van-search__content {
    padding: 0rem;
  }

  .van-field__control {
    color: #222;
    font-size: 16px;
    font-weight: 500;
  }

  .guest_search_title {
    color: #00a862;
    font-size: 16px;
    font-weight: 500;
  }

  .guest_footer {
    height: 100%;
    .guest_footer_img {
      width: 11.5625rem;
      height: 10.28125rem;
      margin: 0 auto;
      margin-top: 50%;
      transform: translateY(-50%);
    }
  }
  .guesst_footer_hint {
    margin: 15px auto;

    .guesst_footer_hint_fail {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      margin: 0 auto;
      height: 11.375rem;
      border-radius: 6px;
      background: #f9f1f1;

      .guesst_footer_hint_fail_icon {
        background: #f74a53;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        margin: 25px auto 11px;

        /deep/ .van-icon-fail::before {
          font-size: 20px;
          padding: 5px;
        }
      }

      h2 {
        width: 90%;
        font-size: 14px;
        color: #f74a53;
        margin-bottom: 15px;
      }

      .guesst_footer_hint_fail_message {
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
    .guesst_footer_hint_success {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 90%;
      height: 6rem;
      margin: 0px auto;
      padding-bottom: 10px;
      border-radius: 6px;
      background: #e9f5ef;

      .guesst_footer_hint_success_icon {
        background: #00a862;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-size: 18px;
        margin: 25px auto 11px;
      }

      h2 {
        width: 90%;
        font-size: 14px;
        color: #00a862;
      }
    }
  }
}
</style>
