<template>
  <div class="">
      <!-- <div class="content-cate-breadcrumb-wrapper">
        <div class="w">
          IT技术 > dsffa
        </div>
      </div> -->
      <div class="intro-header-wrapper" :style="{'background-image': `url(${detail.coverUrl})`}">
        <div class="w intro-header">
          <div>
            <span>
              <span>首页</span>
              <i class="fa fa-angle-right"></i>
            </span>
            <span v-for="(category) in categoryChain" :key="category.id">
              <span>{{category.name}}</span>
              <i class="fa fa-angle-right"></i>
            </span>
            <span>{{detail.title}}</span>
          </div>
          <div class="text-center title-wrapper">
            <h2 class="title">
              <span>{{detail.title}}</span>
            </h2>
            <p class="subtitle">
              {{detail.subtitle}}
            </p>
          </div>
          <div class="purchase-info-wrapper">
            <div class="purchase-info">
              <div class="price">
                <span v-if="detail.free">免费</span>
                <span v-else>
                  <span >¥{{detail.discountPrice || detail.originalPrice}}</span>
                  <span class="origin-price" v-if="detail.discountPrice">原价：{{detail.originalPrice}}</span>
                </span>
              </div>
              <div class="info">
                <span>{{courseTypeMap[detail.type]}}</span>
                <!-- <span class="label">难度</span><span class="value">中级</span>
                <span class="dot"></span>
                <span class="label">时长</span><span class="value">{{detail.totalHours}}小时</span>
                <span class="dot"></span>
                <span class="label">学习人数</span><span class="value">292</span>
                <span class="dot"></span>
                <span class="label">综合评分</span><span class="value">10.00</span> -->
              </div>
            </div>
            <div class="purchase-btn-group" v-if="detail.id">
              <button v-if="purchased" class="go-study-btn" @click="handleGoStudy('')">去学习</button>
              <div v-else>
                <button v-if="detail.free" @click="handleJoin">加入学习</button>
                <div v-else>
                  <button class="purchase-btn" @click="handlePurchase">购买</button>
                  <button class="add-cart-btn">加购物车</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-content-wrapper">
        <div class="w intro-content clearfix">
          <div class="f-l intro-desc">
            <div style="margin-bottom: 40px;">
              <tabs activeName="intro">
                <tab-pane name="intro" label="课程介绍">
                  <div>
                    <div v-html="detail.description"></div>
                  </div>
                </tab-pane>
                <tab-pane name="chapters" label="章节">
                  <div>
                    <div class="chapter-container" v-if="periodTree && periodTree.length">
                      <div v-for="(chapter, index) in periodTree" :key="index">
                        <div class="chapter-item" v-if="chapter.type == 'CHAPTER'">
                          <div class="chapter-title">{{chapter.title}}</div>
                          <ul class="item-container" v-if="chapter.children && chapter.children.length">
                            <li class="item" v-for="(item, idx) in chapter.children" :key="idx" @click="goStudy(item)" :disabled="!detail.purchased">
                              <div><i class="icon fa" :class="materialTypeIcon(item)" aria-hidden="true"></i><span>{{item.title}}</span></div>
                              <div></div>
                            </li>
                          </ul>
                        </div>
                        <div class="chapter-item period" v-else>
                          <div class="item" @click="goStudy(chapter)" :disabled="!detail.purchased">
                            <div><i class="icon fa" :class="materialTypeIcon(chapter)" aria-hidden="true"></i><span>{{chapter.title}}</span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-else>
                      <span>暂无章节</span>
                    </div>
                  </div>
                </tab-pane>
                <tab-pane name="package" label="专题套餐">
                  专题套餐
                </tab-pane>
                <tab-pane name="evaluate" label="用户评价">
                  用户评价
                </tab-pane>
              </tabs>
            </div>
          </div>
          <div class="f-r intro-copyright-wrapper">
            <div>
              <!-- <img style="width:100%;" src="https://res.shiguangkey.com/file/202003/06/20200306193847149546323.jpg" alt="" srcset=""> -->
              <!-- <el-tabs>
                <el-tab-pane label="机构介绍">
                  机构介绍
                </el-tab-pane>
              </el-tabs> -->
            </div>
            <div></div>
          </div>
        </div>
      </div>
    <div class="intro-footer-wrapper">
      <!-- <div class="w">推荐</div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import { data } from '@/mock/page-content.json'
// import CategoryNav from '@/components/common/CategoryNav'
export default {
  name: 'Intro',
  data () {
    return {
      detail: {
        id: '',
        originalPrice: 0
      },
      chapters: [],
      purchased: false,
      tabActive: 'chapters',
      categoryChain: [],
      periodTree: []
    }
  },
  computed: {
    ...mapState({
      courseTypeMap: state => state.course.courseTypeMap
    })
  },
  components: {
    // TabPane
    // CategoryNav
  },
  mounted () {
    this.initPageData()
  },
  methods: {
    materialTypeIcon (item) {
      // if (item.videoId) {
      //   return 'fa-video-camera'
      // }
      // if (item.audioId) {
      //   return 'fa-file-audio-o'
      // }
      // if (item.articleId) {
      //   return 'fa-file-text'
      // }
      // if (item.fileId) {
      //   return 'fa-file'
      // }
      // return 'fa-file-o'
      if (item.hasLive) {
        return 'fa-signal'
      }
      if (item.videoId) {
        return 'fa-play'
      }
      if (item.articleId) {
        return 'fa-file-text'
      }
      return 'fa-file-o'
    },
    goStudy (item) {
      if (this.detail.purchased) {
        this.handleGoStudy(item.id)
        // open(`/course/go/${}`)
      }
    },
    handleJoin () {
      // console.log(this.detail)
      if (this.detail.id) {
        this.$post(`/api/ums/user-course/join/${this.detail.id}`).then(res => {
          if (res.code === 0 && res.data) {
            this.handleGoStudy()
          }
          if (res.code === 401) {
            // this.$router.push({ path: '/auth/login', query: { redirect: window.location.href } })
          }
        }).catch(() => {})
      }
    },
    handleGoStudy (mid) {
      const query = {}
      if (mid) {
        query.mid = mid
      }
      if (this.detail.type === 2) {
        this.$router.push({ path: `/column-study/${this.detail.id}`, query: query })
      } else {
        this.$router.push({ path: `/course/go/${this.detail.id}`, query: query })
      }
    },
    handlePurchase () {
      if (this.purchased) {
        // 已经购买
        return
      }
      this.$router.push({ path: '/o/confirm-order', query: { contentId: this.detail.id } })
    },
    initPageData () {
      const { id } = this.$route.params
      if (!id) {
        //
      }
      this.$get(`/api/open/web/cms/detail/${id}`).then(res => {
        if (res.code === 0 && res.data) {
          this.detail = res.data
          this.purchased = this.detail.purchased
        }
      })
      this.$get(`/api/open/web/cms/periodsByCourseId/${id}`).then(res => {
        this.periodTree = res.data || []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.intro-header-wrapper {
  background-size: cover;
  // background-size: 100% 100%;
    // background-position: center;
  background-repeat: no-repeat;
  margin-bottom: 100px;
  // height: 180px;
  // opacity: 0.3;
  // filter: blur(100px);
  // -webkit-filter: blur(100px);
  // -moz-filter: blur(100px);
  // -o-filter: blur(100px);
  // -ms-filter: blur(100px);
  // filter: blur(100px);
  // filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='100');
  .title-wrapper {
    .title {
      font-size: 24px;
      font-weight: 600;
      padding-top: 10px;
    }
    .subtitle {
      width: 900px;
      margin: 0 auto;
      padding: 30px 0;
    }
  }
  .purchase-info {
    padding: 30px 40px;
    position: relative;
    .price {
      padding-bottom: 16px;
      font-size: 32px;
      color: #FF0000;
      .origin-price {
        font-size: 14px;
        color: #77787b;
        text-decoration: line-through;
      }
    }
    .info {
      font-size: 12px;
      color: #545c63;
      line-height: 24px;
      .dot {
        display: inline-block;
        height: 4px;
        width: 4px;
        background: #545c63;
        vertical-align: middle;
        margin-right: 8px;
        border-radius: 50%;
      }
      .label {
        font-weight: 700;
        padding-right: 8px;
      }
      .value {
        padding-right: 8px;
      }
    }
  }
  .purchase-btn-group {
    position: absolute;
    top: 50%;
    right: 40px;
    button {
      cursor: pointer;
      border-radius: 24px;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 24px;
      font-weight: 700;
      padding: 8px 28px;
      transition: all .3s;
      margin-left: 16px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .purchase-btn {
      background: #f01414;
      color: #fff;
    }
    .add-cart-btn {
      background: rgba(240,20,20,.1);
      color: #f20d0d;
    }
    .go-study-btn {
      padding: 11px 32px;
      font-size: 16px;
      line-height: 24px;
      border-radius: 24px;
      border-style: solid;
      border-width: 1px;
      transition: all .3s;
      color: #fff;
      background-color: #f20d0d;
      border-color: #f20d0d;
      opacity: 1;
      &:hover {
        color: #fff;
        border-color: #c20a0a;
        background: #c20a0a;
        opacity: 1;
      }
    }
  }
  .intro-header {
    height: 290px;
    position: relative;
    // opacity: 0.3;
    // -webkit-filter: blur(100px);
    // -moz-filter: blur(100px);
    // -o-filter: blur(100px);
    // -ms-filter: blur(100px);
    // filter: blur(100px);
    // filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius='100');
    .purchase-info-wrapper {
      position: absolute;
      width: 1080px;
      min-height: 128px;
      position: absolute;
      left: 50%;
      margin-left: -540px;
      bottom: -64px;
      // background-image: url(/static/module/img/fixed_bg.png);
      // background-repeat: no-repeat;
      // background-size: cover;
      // background-position: center;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,.1);
    }
  }
}
.intro-profile {
  padding: 17px;
}

.intro-content-wrapper {
  .intro-desc {
    width: 900px;
  }
  .intro-copyright-wrapper {
    width: 280px;
  }
}
.chapter-container {
  padding: 10px;
  .chapter-item {
    margin: 20px 0;
    box-shadow: 2px 2px 10px 1px rgba(0,0,0,.1);
    // box-shadow: 0 1px 3px 1px #d9dfe9;
    padding: 15px;
    border-radius: 6px;
    &.period {
      // .icon {
      //     display: inline-block;
      //     font-size: 18px;
      //     margin-right: 12px;
      //   }
      //   &:hover {
      //     color: $mainColor;
      //     background-color: $theme-bg;
      //     cursor: pointer;
      //   }
    }
    .chapter-title {
      font-size: 16px;
      padding: 15px 0;
    }
    .item-container {
      font-size: 14px;
      padding: 0;
    }
    .item {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .icon {
          display: inline-block;
          font-size: 18px;
          margin-right: 12px;
        }
        &:not([disabled="disabled"]):hover {
          color: $mainColor;
          background-color: $theme-bg;
          cursor: pointer;
        }
      }
  }
}
</style>
