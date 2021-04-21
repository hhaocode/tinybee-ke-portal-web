<template>
  <div>
    <transition name="fade-in-linear">
      <div class="dropdown"
        ref="dropdown"
        v-show="!disabled && show"
      >
        <slot></slot>
      </div>
    </transition>
    <slot name="reference"></slot>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    disabled: Boolean
  },
  data () {
    return {
      show: false
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
