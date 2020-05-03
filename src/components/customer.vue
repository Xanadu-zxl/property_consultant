<template>
  <div>
    <customer-tabbar :title="title" />
  </div>
</template>

<script>
import CustomerTabbar from './pages/tabbar'
export default {
  data () {
    return {
      title: '新客户'

    }
  },
  components: {
    CustomerTabbar
  }

}
</script>

<style  scoped>

</style>
