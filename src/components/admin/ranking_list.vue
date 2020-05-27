<template>
  <div class="ranking_list">
    <header class="ranking_list_header">置业顾问排行</header>
    <div class="ranking_list_main">
      <van-dropdown-menu active-color="#00a862">
        <van-dropdown-item :options="types" v-model="type" />
        <van-dropdown-item disabled title="不限组织" />
        <van-dropdown-item :value="date" @open="open" title="时间段筛选" />
      </van-dropdown-menu>
      <van-calendar
        :max-date="maxDate"
        :min-date="minDate"
        :show-confirm="false"
        @confirm="onConfirm"
        color="#00a862"
        type="range"
        v-model="show"
      />
      <p class="ranking_list_title">已选：{{type}}｜{{date}}</p>

      <p class="ranking_list_content_header">
        <span>置业顾问</span>
        <span>客户数量(人)</span>
        <span>排名</span>
      </p>
      <p class="ranking_list_content_body">
        <span>xxx</span>
        <span>-</span>
        <span>-</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: '来电客户',
      date: '',
      show: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(2100, 0, 31),
      types: [
        { text: '来电客户', value: '来电客户' },
        { text: '到访客户', value: '到访客户' }
      ]
    }
  },
  created () {
    document.title = '置业顾问排行'
  },
  methods: {
    formatDate (date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm (date) {
      const [start, end] = date
      this.show = false
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`
    },
    open () {
      this.show = true
      this.overlay = false
    }
  }
}
</script>
<style lang="scss" scoped>
.ranking_list {
  margin: 0 auto;

  .ranking_list_header {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #222;
    height: 3.125rem;
    line-height: 3.125rem;
  }
  .ranking_list_title {
    color: #90d0b1;
    font-size: 11px;
    padding: 10px 15px;
    text-align: left;
  }

  .ranking_list_content_header {
    height: 35px;
    line-height: 35px;
    color: #00a862;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
    background: rgba(0, 168, 98, 0.08);
  }
  .ranking_list_content_body {
    height: 45px;
    line-height: 45px;
    color: #787878;
    font-size: 14px;
    display: flex;
    justify-content: space-around;
  }
  span {
    width: 33%;
  }
}
</style>
