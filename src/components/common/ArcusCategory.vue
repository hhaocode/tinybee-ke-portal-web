<template>
  <div class="nav-cate-wrapper">
    <a class="nav-title" :style="{color: navTitleColor}" href="/course/list"><span class="text">分类</span><i class="fa fa-angle-down arrow-icon"></i></a>
    <div class="nav-cate" v-if="classifyTree && classifyTree.length">
      <div class="nav-cate-item" v-for="(classify, index) in classifyTree" :key="index">
        <a :href="`/course/list?directionId=${classify.value}`">{{classify.label}}</a>
        <div class="nav-cate-children">
          <div class="nav-cate-children-container">
            <a class="nav-cate-children-title" :href="`/course/list?directionId=${classify.value}`">{{classify.label}}</a>
            <ul class="nav-cate-children-content">
              <li v-for="(item, idx) in classify.children" :key="idx">
                <a class="second-cate" :href="`/course/list?classifyId=${item.value}`">{{item.label}}</a>
                <!-- <p>
                  <router-link v-for="(it, ix) in item.children" :to="`/course/list?cateId=${it.id}`" :key="ix">{{it.name}}</router-link>
                </p> -->
              </li>
            </ul>
          </div>
          <div class="recommend-wrapper">
            <div>广告</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ArcusCategory',
  computed: {
    ...mapState({
      categorys: state => state.base.categoryTree,
      classifyTree: state => state.base.classifyTree
    })
  },
  mounted () {
    // if (!this.dropdown) {
    //   return
    // }
    // this.$store.dispatch('base/getCategoryTree').then(res => {
    // })
    this.$store.dispatch('base/classifyTree')
    // this.$get('/api/open/base/classifyTree').then(res => {
    //   this.classifies = res.data || []
    // })
  },
  props: {
    navTitleColor: {
      default: '#000000'
    },
    dropdown: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      classifies: []
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #1DD39A;
$cateNavRootWidth: 140px;
$navHeight: 42px;
$navMinHeight: 300px;
$navChildrenMinHeight: 340px;
.nav-cate-wrapper {
  font-size: 14px;
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    &:hover {
      .nav-title {
        color: $mainColor !important;
        .arrow-icon {
          transform: rotate(180deg);
          transition: 0.3s;
        }
      }
    }
    .nav-title {
      display: flex;
      // height: $navHeight;
      // line-height: $navHeight;
      height: 100%;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: $cateNavRootWidth;
      font-size: 16px;
      // background-color: #e5e5e5;
      // background: linear-gradient($mainColor, #FFFFFF);
      .text {
        margin-right: 5px;
        // display: inline-block;
        // height: 100%;
        // align-items: center;
        // display: flex;
      }
      &:hover {
        color: $mainColor;
        .arrow-icon {
          transform: rotate(180deg);
          transition: 0.3s;
        }
      }
      .arrow-icon, .text {
        font-size: 16px;
        // display: flex;
      }
    }
    &:hover > .nav-cate{
      display: block;
    }
    .nav-cate {
      display: none;
      // display: block;
      // min-height: $navMinHeight;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 99;
      width: $cateNavRootWidth;
      background-color: #ffffff;
      // box-shadow: 0 2px 20px 0 rgba(0,0,0,.08);
      box-shadow: 0 0 5px 0 rgba(0,0,0,.12);
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      border-radius: 0 0 6px 6px;
      &:hover {
        border-radius: 0 0 0 6px;
      }
      .nav-cate-item {
        background-color: #f1f1f1;
        &:last-child {
              border-radius: 0 0 6px 6px;
          }
        > a {
          display: block;
          line-height: 58px;
          padding-left: 23px;
          // color: #fff;
          font-size: 14px;
          height: 58px;
          // border-bottom: 1px solid #e5e5e5;
        }
        &:hover {
          > .nav-cate-children{
            display: flex;
          }
          > a {
            color: $mainColor;
            position: relative;
            font-weight: 600;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              height: 20px;
              width: 4px;
              background-color: $mainColor;
              top: 50%;
              margin-top: -10px;
              border-radius: 4px;
            }
          }
          // &+.nav-cate-item > a {
          //   border-top-right-radius: 6px;
          // }
          &:last-child {
              border-radius: 0 0 0 6px;
            }
          background: #ffffff;
        }

        .nav-cate-children {
          display: none;
          // display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: absolute;
          top: -1px;
          left: 100%;
          background-color: #ffffff;
          width: 680px;
          // min-height: $navChildrenMinHeight;
          min-height: calc(100% + 2px);
          // box-shadow: 4px 4px 4px 0 rgba(0,0,0,0.12);
          border: 1px solid #e5e5e5;
          border-left: none;
            // background: #fff;
          // width: 622px;
          // border-radius: 0 0 4px 0;
          // box-shadow: 0 2px 8px 0 rgba(0,0,0,.1);
          // padding: 25px;
          padding: 25px 0 0 0;
          // box-sizing: border-box;
          // position: relative;
          .nav-cate-children-title {
            font-size: 16px;
            padding: 0 0 30px 0;
            display: block;
            a:hover {
              color: $mainColor;
            }
          }
          .nav-cate-children-container {
            padding: 0 25px 20px;
          }
          .nav-cate-children-content {
            li {
              position: relative;
              margin-bottom: 16px;
              min-height: 22px;
              line-height: 19px;
              display: inline-flex;
              .second-cate {
                font-size: 14px;
                color: #263139;
                min-width: 80px;
                margin-right: 20px;
                display: block;
              }
              a:hover {
                color: $mainColor;
              }
              p {
                display: flex;
                flex-wrap: wrap;
                a {
                  margin-right: 26px;
                  font-size: 14px;
                  color: #77797a;
                  margin-bottom: 6px;
                }
              }
            }
          }
        }
      }
    }
  }
  .recommend-wrapper {
    color: #000000;
    background: #F8FAFC;
    padding: 20px 15px;
  }
</style>
