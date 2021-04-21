<template>
  <div class="min-w main-container">
    <IndexHeader v-if="$route.name == 'Index'"/>
    <ArcusHeader v-else/>
    <div class="clearfix" :style="{'min-height': 'calc(100vh - 180px)', 'position': 'relative'}">
      <router-view />
    </div>
    <ArcusFooter />
  </div>
</template>

<script>
import IndexHeader from '../home/components/IndexHeader'
import ArcusHeader from '@/components/common/ArcusHeader'
import ArcusFooter from '@/components/common/ArcusFooter'
export default {
  name: 'Layout',
  components: { IndexHeader, ArcusHeader, ArcusFooter },
  mounted () {
    // console.log(this.$route)
    // window.addEventListener('scroll', (e) => {
    //   console.log(window.pageYOffset)
    //   if (window.pageYOffset)
    // })
  },
  beforeDestroy () {
    // window.removeEventListener('scroll')
  }
}
</script>

<style lang="scss" scoped>

</style>
