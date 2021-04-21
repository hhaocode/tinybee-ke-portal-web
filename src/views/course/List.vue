<template>
  <div class="content-wrapper">
    <div class="content-header-wrapper">
      <div class="w content-header-inner">
        <div>
          <div>
            <h3>雾往</h3>
          </div>
          <div>
            心之所向，素履以往
          </div>
        </div>
        <div class="right-info">
          <arcus-search />
        </div>
      </div>
    </div>
    <div class="content-nav-wrapper">
      <div class="cate-nav-breadcrumb-wrapper">
        <div class="w">
          <category-nav style="font-size: 16px;" @click="cateHandleClick" :breadcrumb="cateNav.breadcrumb" :categorys="cateNav.top" :selected="selectedCateId"/>
        </div>
      </div>
      <div class="w" style="padding: 20px 0;">
        <category-nav @click="cateHandleClick" :categorys="cateNav.sub" :selected="selectedCateId"/>
      </div>
    </div>
    <div class="filtrate-nav-wrapper">
      <div class="">
        <div class="w flex">
          <div class="label-wrapper">
            <span class="label">形式：</span>
          </div>
          <div>
            <a @click="handleTypeClick('')" class="item" href="javascript:void(0);" :class="{active: !params.type}">全部</a>
            <a @click="handleTypeClick(type)" class="item" href="javascript:void(0);" v-for="type in types" :key="type.value" :class="{active: params.type == type.value}">{{type.label}}</a>
          </div>
        </div>
      </div>
      <div class="">
        <div class="w flex">
          <div class="label-wrapper">
            <span class="label">方向：</span>
          </div>
          <div>
            <a @click="handleDirectionClick('')" class="item" href="javascript:void(0);" :class="{active: !params.directionId}">全部</a>
            <a @click="handleDirectionClick(direction.value)" class="item" href="javascript:void(0);" v-for="direction in classifyTree" :key="direction.value" :class="{active: params.directionId == direction.value}">{{direction.label}}</a>
          </div>
        </div>
      </div>
      <div class="">
        <div class="w flex">
          <div class="label-wrapper">
            <span class="label">分类：</span>
          </div>
          <div>
            <a @click="handleClassifyClick('')" class="item" href="javascript:void(0);" :class="{active: !params.classifyId}">全部</a>
            <a @click="handleClassifyClick(classify.value)" class="item" href="javascript:void(0);" v-for="classify in classifies" :key="classify.value" :class="{active: params.classifyId == classify.value}">{{classify.label}}</a>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="w condition-wrapper">
        <!-- 查询条件 -->
        <!-- <span>视频</span><span>专栏</span><span>直播</span> -->
        <div class="condition-inner">
          <div class="free-wrapper">
            <span :class="{checked: params.free === ''}"  @click="handleChangeFree('')">全部</span>
            <span :class="{checked: params.free === 'true' || params.free === true}" @click="handleChangeFree(true)">免费</span>
            <span :class="{checked: params.free === 'false' || params.free === false}" @click="handleChangeFree(false)">付费</span>
          </div>
          <div class="div-v"></div>
          <div>
            <!-- <span>视频</span>
            <span>专栏</span>
            <span>直播</span>
            <span>公开课</span> -->
          </div>
        </div>
        <div class="condition-sort">
          <div>综合排序</div>
          <div>好评率</div>
          <div>好评率</div>
          <div>价格</div>
          <div class="div-v"></div>
          <div>价格区间</div>
        </div>
      </div>
      <span></span>
    </div>
    <div class="w">
      <div class="content-result-conditions-wrapper">
        <!-- 查询条件，排序 -->
      </div>
      <div class="content-result-wrapper">
        <div class="content-result card-wrapper" v-if="contentPage.total">
            <div class="card-item content-result-item hover-up " v-for="(item, index) in contentPage.records"
              :key="index">
                <a class="item-container" :href="`/course/intro/${item.id}`" target="_blank">
                  <div class="cover">
                    <img :src="item.coverUrl" :alt="item.title">
                  </div>
                  <div class="info">
                    <div class="title ellipsis">
                      {{item.title}}
                    </div>
                    <div class="flex space-between purchase-info">
                      <div>
                        <span v-if="item.free" class="theme-color">免费</span>
                        <span v-else class="price">{{item.originalPrice}}元</span>
                      </div>
                      <div>
                        <span>学习人数</span>
                        <span>{{item.applyNum || 0}}人</span>
                      </div>
                    </div>
                  </div>
                </a>
            </div>
        </div>
        <div class="content-no-result-wrapper" v-else>
          <div>
            <img :src="require('@/assets/images/common/no-data.png')" alt="" srcset="">
            <div>暂无课程</div>
          </div>
        </div>
        <div>
          <!-- <i class="fa fa-spinner fa-spin" style="font-size: 40px;"></i> -->
        </div>
        <div class="content-result-pagination text-center" v-if="contentPage.total">
          <pagination :current-page="params.page"
            :total="contentPage.total"
            :page-size="params.size"
            @current-change="handleCurrentPageChange"
            layout="total, prev, pager, next, jumper"
          ></pagination>
          <!-- <el-pagination :current-page="contentPage.current"
            :total="contentPage.total"
            :page-size="contentPage.size"
            layout="total, prev, pager, next, jumper"
          ></el-pagination> -->
          <!-- :pager-count="contentPage.pages" -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import cates from '@/mock/cate.json'
import CategoryNav from '@/components/common/CategoryNav'
import ArcusSearch from '@/components/common/ArcusSearch'
// import GridWrapper from '@/components/common/GridWrapper'
// import Waterfall from 'vue-waterfall/lib/waterfall'
// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
// import CategoryBreadcrumb from '@/components/common/CategoryBreadcrumb'
// import { computeCateNavTopAndSub } from '@/utils/handler'
import { mapState } from 'vuex'
const initPageContent = {
  records: [],
  total: 0,
  size: 25,
  current: 1,
  orders: [],
  hitCount: false,
  searchCount: true,
  pages: 1
}
// const cateMap = listToMapHandler(cates, 'id')
export default {
  name: 'Content',
  components: { CategoryNav, ArcusSearch },
  computed: {
    ...mapState({
      classifyTree: state => state.base.classifyTree,
      classifyMap: state => state.base.classifyMap
    })
  },
  data () {
    return {
      free: false,
      noFree: false,
      parentCates: [],
      categorys: [],
      selectedCateId: '1',
      contentPage: Object.assign({}, initPageContent),
      cateNav: {
        top: [],
        sub: [],
        type: 'Nav'
      },
      params: {
        size: 10,
        page: 1,
        directionId: '',
        classifyId: '',
        kw: '',
        free: '',
        type: '',
        sort: ''
      },
      // directions: []
      classifies: [],
      types: [
        { value: 1, label: '视频' },
        { value: 2, label: '专栏' },
        { value: 3, label: '每日一课', target: '/dailyLesson' },
        { value: 4, label: '公开课', target: '/pubicLesson' }
      ]
    }
  },
  created () {
    // this.initData()
  },
  mounted () {
    //
    // Promise.all([this.handleInitNav()])
    this.init()
    //
  },
  watch: {
    $route: {
      // immediate: true,
      deep: true,
      handler: function () {
        this.handleDoQuery()
      }
    },
    'params.directionId': {
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal && this.classifyMap[newVal]) {
          this.classifies = this.classifyMap[newVal].children
          return
        }
        let classifies = []
        this.classifyTree.forEach(v => {
          if (v.children) {
            classifies = classifies.concat(v.children)
          }
        })
        this.classifies = classifies
      }
    },
    classifyMap: function (val) {
      if (this.params.directionId && val[this.params.directionId]) {
        this.classifies = val[this.params.directionId].children
        return
      }
      let classifies = []
      this.classifyTree.forEach(v => {
        if (v.children) {
          classifies = classifies.concat(v.children)
        }
      })
      this.classifies = classifies
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   console.log(to)
  //   console.log(from)
  //   // next()
  // },
  methods: {
    handleChangeFree (free) {
      this.params.free = free
      this.params.page = 1
      this.handleQuery()
    },
    async initData () {
      await this.$get('/api/open/base/classifyTree').then(res => {
        this.directions = res.data || []
        let classifies = []
        this.directions.forEach(v => {
          if (v.children) {
            classifies = classifies.concat(v.children)
          }
        })
        this.classifies = classifies
      })
    },
    cateHandleClick (row) {
    },
    handleTypeClick (val) {
      // this.params.type = v/
      if (!val) {
        this.params.type = ''
        this.params.page = 1
        this.handleQuery()
        return
      }
      if (val.target) {
        window.open(val.target, '_blank')
        return
      }
      this.params.type = val.value
      this.params.page = 1
      this.handleQuery()
    },
    handleDirectionClick (val) {
      this.params.directionId = val
      this.params.classifyId = ''
      this.params.page = 1
      this.handleQuery()
    },
    handleClassifyClick (val) {
      // this.params.directionId = val
      this.params.classifyId = val
      this.params.page = 1
      if (val) {
        // console.log(val)
        // console.log(this.classifyMap)
        this.params.directionId = this.classifyMap[val].parent.value
      }
      this.handleQuery()
    },
    init () {
      let param = this.$route.query
      for (const key in param) {
        if (key === 'free') {
          continue
        }
        if (!param[key]) {
          delete param[key]
        }
      }
      console.log(param)
      param = Object.assign({}, this.params, param)
      param.size = Number(param.size)
      param.page = Number(param.page)
      if (!param.directionId && param.classifyId && this.classifyMap[param.classifyId]) {
        param.directionId = this.classifyMap[param.classifyId].value
      }
      // 处理
      console.log(param)
      this.params = param
      // this.$store.dispatch('course/page', this.params).then(res => {
      //   if (res.code === 0) {
      //     this.contentPage = res.data
      //   } else {
      //     this.contentPage = Object.assign({}, initPageContent)
      //   }
      // }).catch(() => {
      //   this.contentPage = Object.assign({}, initPageContent)
      // })
      this.handleDoQuery()
    },
    handleDoQuery () {
      this.$get('/api/open/web/cms/course/page', { params: this.params }).then(res => {
        if (res.code === 0) {
          this.contentPage = res.data
        } else {
          this.contentPage = Object.assign({}, initPageContent)
        }
      }).catch(() => {
        this.contentPage = Object.assign({}, initPageContent)
      })
    },
    handleCurrentPageChange (currentPage) {
      this.params.page = currentPage
      this.handleQuery()
    },
    handleQuery () {
    //  const resQuery = Object.assign({}, this.params, this.$route.query)
      const resQuery = Object.assign({}, this.params)
      for (const key in resQuery) {
        if (key === 'free') {
          continue
        }
        if (!Object.hasOwnProperty.call(resQuery, key) || !resQuery[key]) {
          delete resQuery[key]
        }
      }
      this.$router.replace({
        // path: '/content', , v: Math.random()np
        query: resQuery
      }).then(() => {}).catch(() => {})
    }
  }

}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.card-wrapper {
  .card-item {
    width: 228px;
    margin-bottom: 20px;
    // padding: 7px 7px 10px;
    // border: 1px solid transparent;
    &:hover {
      // border-color: #ddd;
      // box-shadow: 1px 1px 2px 1px #ececec;
      box-shadow: 0 0 6px 0 rgba(0,0,0,0.1);
      border-radius: 2px;
    }
  }
}
.content-wrapper {
  // background-color: #f9f9f9;
  .content-header-wrapper {
    height: 120px;
    background-image: url("~@/assets/images/course/course-search-header-bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    .content-header-inner {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .right-info {

    }
  }
  .content-nav-wrapper {

  }
  .content-no-result-wrapper {
    // width: 100%;
    // height: 260px;
    padding: 40px 0;
    background: #fff;
    text-align: center;
    // border: 1px solid #e1e1e1;
    margin: 40px 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 22px;
  }
  .content-result-wrapper {
    .content-result {
      .content-result-item {
        width: 225px;
        margin: 18px 18px 18px 0;
        &:nth-child(5n) {
          margin: 18px 0;
        }
        .item-container {
          display: block;
          .cover {
            width: 100%;
            height: 137px;
            display: block;
            > img {
              height: 100%;
              width: 100%;
              border-radius: 8px 8px 0 0;
            }
          }
          .info {
            .title {
              font-size: 14px;
              color: #303943;
              line-height: 50px;
              margin-bottom: 4px;
            }
            padding: 6px;
            .purchase-info {
              margin-top: 6px;
              font-size: 12px;
              .price {
                color: #ff0000;
              }
            }
          }
        }
      }
    }
    .content-result-pagination {
      padding: 30px 0;
    }
  }
}
.filtrate-nav-wrapper {
  .label-wrapper {
    // width: 80px;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    font-weight: 600;
    color: #353535;
    padding-right: 20px;
    // display: flex;
    white-space:nowrap;
  }
  .label {
    // padding-top: 8px;
  }
  .item {
    display: inline-flex;
    position: relative;
    margin-right: 5px;
    margin-bottom: 14px;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 10px;
    // color: #888;
    color: #1c1f21;
    white-space: nowrap;
    &:hover {
      color: #fa8919;
    }
    &.active {
      font-weight: 500;
      color: #fa8919;
      background: #fbf5ee;
    }
  }
}
.condition-wrapper {
  .condition-inner {
    display: flex;
    flex-direction: row;
    height: 50px;
    align-items: center;
    & > div {
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
  .div-v {
      width: 1px;
      height: 30px !important;
      background-color: #e8e8e8;
      margin-right: 30px;
    }
  .condition-sort {
    display: flex;
    flex-direction: row;
  }
}
.free-wrapper {
  height: 50px;
  // background-color: #e8e8e8;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  span {
    padding: 4px 8px;
    margin-right: 10px;
    color: #1c1f21;
    cursor: pointer;
    &:hover {
      color: $mainColor;
    }
    &.checked {
      background-color: $mainColor;
      color: #ffffff;
    }
  }
}
.checkbox-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 14px;
  input[type="checkbox"] {

  }
  label[for] {
    margin-left: 6px;
  }
}
</style>
