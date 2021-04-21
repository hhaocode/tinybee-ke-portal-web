<template>
  <div class="el-tab-pane" v-show="active" :aria-hidden="!active" :id="`pane-${paneName}`" :aria-labelledby="`tab-${paneName}`">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabPane',
  props: {
    label: {
    },
    name: {}
  },
  data () {
    return {
      index: null
    }
  },
  computed: {
    active () {
      const active = this.$parent.currentName === this.name // this.index
      console.log(active)
      return active
    },
    paneName () {
      return this.name
    }
  },
  updated () {
    this.$parent.$emit('tab-nav-update')
  }
}
</script>

<style lang="scss" scoped>

</style>
