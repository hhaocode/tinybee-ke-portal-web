<template>
  <div>
    <tabs :activeName="activeName">
      <tab-pane name="test">
        测试
      </tab-pane>
      <tab-pane name="test1">
        测试1
      </tab-pane>
    </tabs>
    <t-dialog></t-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'test'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
