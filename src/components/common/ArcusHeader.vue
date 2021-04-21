<template>
  <header class="arcus-header">
    <div class="header-wrapper">
      <div class="header-nav">
        <a href="/" class="arcus-header-logo"></a>
        <arcus-category nav-title-color="#ffffff" :dropdown="false"></arcus-category>
        <!-- <a :class="{active: $route.name === 'Column'}" class="item" href="/column">专栏</a> -->
        <a class="item" href="/camp" target="_blank">训练营</a>
        <a class="item" :class="{active: $route.name === 'PubicLesson'}" href="/pubicLesson">公开课</a>
        <a class="item" :class="{active: $route.name === 'DailyLesson'}" href="/dailyLesson">每日一课</a>
        <a class="item" href="">社区</a>
      </div>
      <div class="right-login-area-wrapper">
        <div class="center-search-wrapper" v-if="$route.name !== 'CourseList'">
          <arcus-search v-if="$route.name !== 'Search'"></arcus-search>
        </div>
        <arcus-header-login-area theme-color="white"></arcus-header-login-area>
      </div>
    </div>
  </header>
</template>

<script>
import ArcusHeaderLoginArea from './ArcusHeaderLoginArea'
import ArcusSearch from './ArcusSearch'
import ArcusCategory from './ArcusCategory'
export default {
  name: 'ArcusHeader',
  components: { ArcusHeaderLoginArea, ArcusCategory, ArcusSearch },
  computed: {
  },
  methods: {
    handlePath (path) {
      const resPath = this.navs.some(v => v.path === this.$router.path) ? path : '/content'
      return resPath
    }
  },
  data () {
    return {
      navs: [
        { path: '/', title: '首页' },
        { path: '/content', title: '知识' },
        { path: '/mall', title: '商城' },
        { path: '/win-camp', title: '赢营' },
        { path: '/news', title: '资讯' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.arcus-header {
  // background-color: #07111B;
  background: #2E333F;
  // .header-wrapper-v {
  //   height: 60px;
  // }
  .header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // border-bottom: 1px solid #ebebee;
    align-items: center;
    color: #ffffff;
    height: 60px;
    min-width: 1200px;
    max-width: 1480px;
    margin: auto;
    a {
      color: #ffffff;
    }
    .arcus-header-logo {
      display: inline-block;
      height: 36px;
      width: 86px;
      background-image: url("~@/assets/com-logo.png");
    }
    .header-nav {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 16px;
      > .item {
        display: flex;
        height: 100%;
        align-items: center;
        margin-right: 30px;
        margin-left: 10px;
        position: relative;
        &:hover,&.active {
          color: $mainColor;
          &::after {
          content: '';
            height: 3px;
            background: $mainColor;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -10px;
            width: 20px;
          }
        }
      }
      // height: 50px;
      // line-height: 50px;
      // > a {
      //   margin-right: 20px;
      //   vertical-align: middle;
      //   &:hover {
      //     cursor: pointer;
      //   }
      //   &.active {
      //     color: $mainColor;
      //   }
      // }
    }
    .center-search-wrapper {
      width: 300px;
      height: 100%;
      // display: flex;
      // align-items: center;
      margin-right: 40px;
    }
  }
  .right-login-area-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

</style>
