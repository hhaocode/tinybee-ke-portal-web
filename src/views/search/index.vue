<template>
  <div class="search-wrapper">
    <div class="search-header-wrapper">
      <div class="w search-header">
        <!-- <a href="/" class="f-l block">搜索</a> -->
        <div class="search-form">
          <input type="text">
          <button class="search-btn">搜索</button>
        </div>
      </div>
    </div>
    <div class="w search-container clearfix">
      <div class="f-l search-result-wrapper">
          <div class="search-result-header">
            <div class="search-result-info">
              <a href="">全站课程</a>
              <a href="">课程内容</a>
            </div>
            <div class="search-result-category">
              <span>全部</span>
              <span>课程</span>
            </div>
          </div>
          <div class="search-result">
            <div class="search-result-content">搜索结果</div>
          </div>
          <div class="search-result-pagination">
          </div>
      </div>
      <div class="f-r search-recommend">
          <div>热搜关键词</div>
          <div>热门推荐</div>
          <div>活动推荐</div>
          <div>LIVE</div>
          <div>关注我们</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      q: ''
    }
  },
  watch: {
    $route: (newVal, oldVal) => {
      this.kw = (newVal.query.q || '').trim()
    }
  },
  mounted () {
    this.kw = (this.$route.query.q || '').trim()
  },
  methods: {
    search (q) {
      if (q) {
        this.$message.error('q存在  搜索')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$searchHeaderHeight: 80px;
// $searchWrapperBg: #f3f5f6;
$searchWrapperBg: #fff;
.search-wrapper {
  // background-color: $searchWrapperBg;
  .search-header-wrapper {
    height: $searchHeaderHeight;
    // background: url("~@/assets/images/search/search-header-bk.png");
    // background-size: cover;
    background-color: $searchWrapperBg;
    box-shadow: 0 2px 4px 0 rgba(28,31,33,.06);
    .search-header {
      // a {
      //   color: #333;
      // }
      color: #333;
      padding-top: 20px;
      .search-form {
        height: 48px;
        width: 840px;
        margin: 0 auto;
        position: relative;
        input {
          font-size: 16px;
          color: #93999f;
          width: 736px;
          line-height: 48px;
          height: 48px;
          padding: 12px;
          background: #f1f1f1;
          box-sizing: border-box;
          // border-top-left-radius: 4px;
          // border-bottom-left-radius: 4px;
          // border-top-right-radius: 4px;
          // border-bottom-right-radius: 4px;
          border-radius: 4px 0 0 4px;
        }
        .search-btn {
          background: $mainColor;
          // #f01414
          width: 104px;
          height: 48px;
          line-height: 48px;
          font-size: 16px;
          color: #fff;
          cursor: pointer;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          transition: all .3s;
          &:hover {
            background-color: $mainColor-dark;
          }
        }
      }
    }
  }
  .search-container {
    padding-top: 20px;
    .search-result-wrapper {
      width: 800px;
      background-color: #fff;
      .search-result {
        .search-result-pagination {
          margin-top: 40px;
        }
      }
    }
    .search-recommend{
      width: 340px;
    }
  }
}
</style>
