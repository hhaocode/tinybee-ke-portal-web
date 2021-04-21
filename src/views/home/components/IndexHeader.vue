<template>
  <header class="min-w index-header-wrapper">
    <div class="header-wrapper ">
      <!-- w -->
      <div class="logo-wrapper">
        <a href="/" class="index-logo" :style="{'background-image': 'url('+ logo +')'}">
        </a>
      </div>
      <div class="center-search-wrapper">
        <arcus-search />
      </div>
      <div class="right-login-area-wrapper">
        <arcus-header-login-area></arcus-header-login-area>
      </div>
    </div>
    <nav class="w">
      <div class="nav-wrapper">
        <ul class="index-nav">
          <li class="item active"><span href="/">首页</span></li>
          <li class="category"><arcus-category></arcus-category></li>
          <li class="item">
            <a class="theme" href="">
              <span>训练营</span>
            </a>
          </li>
          <li class="item">
            <a class="theme" href="">
              <span>每日一课</span>
            </a>
          </li>
          <li class="item">
            <a class="theme" href="">
              <span>公开课</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import ArcusSearch from '@/components/common/ArcusSearch'
import ArcusHeaderLoginArea from '@/components/common/ArcusHeaderLoginArea'
import ArcusCategory from '@/components/common/ArcusCategory'
import cate from '@/mock/cate.json'
export default {
  name: 'IndexHeader',
  components: { ArcusSearch, ArcusHeaderLoginArea, ArcusCategory },
  data () {
    return {
      logo: require('@/assets/index-logo.png'),
      categorys: cate
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #1DD39A;
$cateNavRootWidth: 198px;
$navHeight: 42px;
$navMinHeight: 300px;
$navChildrenMinHeight: 340px;
.index-header-wrapper {
  // background: linear-gradient(#B3BBFF, #FFFFFF);
  max-width: 1440px;
  min-width: 1200px;
  margin: auto;
}
.header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 90px;
  .logo-wrapper {
    width: 208px;
    height: 136px;
    padding-top: 40px;
    .index-logo {
      display: inline-block;
      height: 51px;
      width: 131px;
      background: center center no-repeat;
    }
  }
  .center-search-wrapper {
    position: relative;
    width: 340px;
    height: 40px;
    ::v-deep .el-input-group__append, .el-input-group__prepend {
      border-right: none;
    }
  }
  .right-login-area-wrapper {
  }
}
.nav-wrapper {
  display: flex;
  justify-content: space-between;
  .index-nav {
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 42px;
    >li {
      height: 100%;
    }
    > li.item {
      margin-right: 18px;
      display: flex;
      align-items: center;
      // line-height: 42px;
      > a {
        display: flex;
        height: 100%;
        align-items: center;
        flex-direction: row;
      }
      &.active {
        font-weight: 600;
      }
      &.active, &:hover {
        color: $mainColor;
        position: relative;
        &::after {
          content: '';
          height: 3px;
          background: $mainColor;
          position: absolute;
          width: 20px;
          bottom: 0;
          left: 50%;
          margin-left: -10px;
        }
      }
    }
  }
}
</style>
