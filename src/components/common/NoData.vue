<template>
  <div class="no-data-wrapper" v-if="noData">
    <img :src="require('@/assets/images/common/no-data.png')" alt="">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    noData: {
      type: Boolean,
      default: false
    },
    message: {
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.no-data-wrapper {
  padding: 20px 0;
  text-align: center;
}
.message {
  font-size: 12px;
  color: #9b9494;
}
</style>
