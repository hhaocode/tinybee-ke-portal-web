<template>
  <div class="tabs__active-bar" :style="barStyle"></div>
</template>

<script>
export default {
  name: 'TabBar',
  props: {
    tabs: Array
  },

  inject: ['rootTabs'],

  computed: {
    barStyle: {
      get () {
        let style = {}
        let offset = 0
        let tabSize = 0
        const sizeName = 'width'
        const sizeDir = 'x'
        const direstUpperCase = str => {
          return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
        }
        this.tabs.every((tab, index) => {
          // 找到dom
        })
        return style
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
