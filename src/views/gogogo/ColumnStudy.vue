<template>
  <div class="column-wrapper" :class="{'isCollapse': isCollapse, fixed: fixed}">
    <div class="column-sider">
      <div class="logo-wrapper">
        <a href="/" class="logo">
        </a>
      </div>
      <div class="intro-wrapper">
        <div class="flex">
          <div>
            <img class="course-cover" :src="detail.coverUrl" alt="" srcset="">
          </div>
          <div class="flex v">
            <div>
              {{detail.title}}
            </div>
            <div>
              <button @click="$router.push(`/course/intro/${detail.id}`)">查看详情</button>
            </div>
          </div>
        </div>
      </div>
      <div class="contents">
        <div>
          <div class="chapter" v-for="(chapter, idx) in chapters" :key="idx">
            <div class="__chapter" v-if="chapter.type === 'PERIOD'">
              <div class="__chapter_period" :class="{active: currentPeriod.id === chapter.id}" @click="handleSwitchPeriod(chapter)">
                {{chapter.title}}
              </div>
            </div>
            <div class="__chapter" v-else>
              <div class="__chapter_row" @click="handleToggleChapter(chapter)" :class="{'no-children': !(chapter.children && chapter.children.length)}">
                <span>{{chapter.title}} ({{chapter.children.length || 0}})</span>
                <span v-if="chapter.children && chapter.children.length" class="fa" :class="{'fa-angle-up': chapter.expanded, 'fa-angle-down': !chapter.expanded}"></span>
                <!-- <span class="fa fa-angle-down"></span> -->
              </div>
              <ul class="__chapter_periods" v-if="chapter.children && chapter.expanded">
                <li class="__chapter_period inner" :class="{active: currentPeriod.id === period.id}" v-for="(period, index) in chapter.children" :key="index" @click="handleSwitchPeriod(period)">
                  <span>{{period.title}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column-main">
      <div class="column-header">
        <div>
          <i id="trigger-fold-btn" class="fa fa-bars trigger-fold-btn" :class="{'isCollapse': isCollapse}" @click="hanleTriggerCollapse"></i>
          <span>{{detail.title}}</span>
        </div>
        <div>
          <ArcusHeaderLoginArea></ArcusHeaderLoginArea>
        </div>
      </div>
      <div class="column-content">
        <div class="column-container">
          <div class="column__content" ref="articleEl">
            <div v-if="article.id"></div>
            <div class="title">
              <div>{{article.title}}</div>
            </div>
            <div class="profile"></div>
            <div>
              <img :src="article.coverUrl" alt="">
            </div>
            <div class="content">
              <div class="article-content" v-html="article.content"></div>
            </div>
          </div>
        </div>
        <div class="column-menus">
          <div class="column__menus">
            <div class="menu-item">
              <span class="fa fa-commenting-o"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-star-o"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-arrows-alt"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-share-square-o"></span>
            </div>
             <div class="menu-item" style="margin-bottom: 100px;">
              <span class="fa fa-edit"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-chevron-left"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-chevron-right"></span>
            </div>
            <div class="menu-item">
              <span class="fa fa-chevron-circle-up"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArcusHeaderLoginArea from '@/components/common/ArcusHeaderLoginArea'
const initArticle = { content: '课件加载中' }
export default {
  components: {
    ArcusHeaderLoginArea
  },
  data () {
    return {
      isCollapse: false,
      detail: '',
      chapters: [],
      fixed: false,
      currentPeriod: '',
      article: Object.assign({}, initArticle)
    }
  },
  mounted () {
    this.init()
    this.initEvent()
  },
  watch: {
  },
  methods: {
    handleToggleChapter (chapter) {
      chapter.expanded = !chapter.expanded
    },
    hanleTriggerCollapse () {
      this.isCollapse = !this.isCollapse
      if (window.innerWidth <= 1150 && !this.isCollapse) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    async handleSwitchPeriod (period) {
      console.log(period)
      if (!this.isCollapse && this.fixed) {
        this.isCollapse = true
      }
      if (this.currentPeriod.id === period.id) {
        return
      }
      await this.$get(`/api/web/cms/period/${period.id}`).then(res => {
        if (res.code === 0) {
          this.currentPeriod = res.data
          // this.handleSwitchVod(res.data)
          if (this.currentPeriod.article) {
            this.article = this.currentPeriod.article
          } else {
            this.article = Object.assign({}, initArticle, { content: '暂无课件' })
          }
        } else {
          this.$message.error(res.message)
        }
      })
    },
    async init () {
      const { mid } = this.$route.query
      this.mid = mid
      const { id } = this.$route.params
      // console.log(id)
      if (!id) {
        //
      }
      await this.$store.dispatch('course/detail', id).then(res => {
        if (res.code === 0 && res.data) {
          if (res.data.type === 1) {
            this.$router.replace({ path: `/course-study/${id}`, query: this.$route.query })
            return
          }
          this.detail = res.data
          document.title = this.detail.title
        }
      }).catch(() => {})
      await this.$get(`/api/web/cms/periodsByCourseId/${id}`).then(res => {
        const chapters = res.data || []
        chapters.forEach(v => {
          v.expanded = false
          if (v.children) {
            v.children.forEach(d => {
              if (d.id === mid) {
                v.expanded = true
                return false
              }
            })
          }
        })
        this.chapters = chapters
      })
    },
    initEvent () {
      this.changeLayout()
      window.addEventListener('resize', this.changeLayout)
    },
    changeLayout () {
      if (window.innerWidth <= 1150) {
        this.isCollapse = true
        this.fixed = true
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.changeLayout)
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
$siderWidth:350px;
.course-cover {
  height: 100px;
  width: 200px;
}

.column-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  overflow: hidden;
  .column-sider {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: $siderWidth; //
    border-right: 1px solid #e8e8e8;
    transition: left 0.6s ease;
    background: #fefdfc;
    overflow: hidden;
    z-index: 2;
  }
  .column-main {
    position: absolute;
    top: 0;
    left: $siderWidth; //
    bottom: 0;
    right: 0;
    min-width: 750px;
    transition: left 0.6s ease;
    .column-header {
      height: 56px;
      position: absolute;
      left: 0;
      right: 0;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      padding: 0 20px;
      align-items: center;
      justify-content: space-between;
      .trigger-fold-btn {
        cursor: pointer;
        font-size: 20px;
        margin-right: 10px;
        transition: .6s ease;
      }
    }
    .column-content {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 56px;
      overflow: hidden;
      .column-container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        overflow-y: auto;
        .column__content {
          padding: 40px 0;
          width: 680px;
          margin: auto;
          .title {
            color: #404040;
            font-weight: 600;
            -webkit-font-smoothing: antialiased;
            line-height: 1.5;
            font-size: 24px;
            // margin-top: 60px;
          }
          .profile {
            color: #888;
            font-size: 16px;
            padding-top: 10px;
          }
          img {
            width: 100%;
          }
          .content {
            overflow: hidden;
            user-select:none;
            // outline: none; white-space: pre-wrap; overflow-wrap: break-word;
            img {
              max-width: 100%;
            }
          }
        }
      }
    }
    .column-menus {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      // margin-top: 56px;
      left: 50%;
      margin-left: 350px;
      overflow: visible;
      .column__menus {
        width: 38px;
        .menu-item {
          height: 38px;
          width: 38px;
          font-size: 18px;
          border-radius: 50%;
          background: #f6f7f9;
          line-height: 38px;
          text-align: center;
          color: #999;
          cursor: pointer;
          border: 1px solid #f6f7f9;
          margin-bottom: 20px;
          &:hover {
            color: $mainColor;
            background: transparent;
            border: 1px solid $mainColor;
          }
        }
      }
    }
  }
}
.column-wrapper.isCollapse {
  .column-sider {
    left: -$siderWidth;
    transition: left 0.6s ease;
  }
  .column-main {
    left: 0;
    transition: left 0.6s ease;
    .column-header {
      .trigger-fold-btn {
        transform: rotateZ(90deg);
      }
    }
  }
}
.column-wrapper.fixed {
  .column-sider {
    position: fixed;
    z-index: 999;
  }
  .column-main {
    left: 0;
  }
  &.isCollapse {
    #trigger-fold-btn {
      position: static;
      transition: .6s ease;
    }
  }
  #trigger-fold-btn {
    position: fixed;
    z-index: 999;
    top: 20px;
    left: 400px;
    transition: .6s ease;
  }
}
// @media screen and (max-width: 1150px) {
// .column-wrapper {
//   .column-sider {
//     left: -380px;
//     transition: left 0.6s ease;
//   }
//   .column-main {
//     left: 0;
//     transition: left 0.6s ease;
//     .column-header {
//       .trigger-fold-btn {
//         transform: rotateZ(90deg);
//       }
//     }
//   }
// }
// }
.logo-wrapper {
  height: 60px;
  margin-bottom: 30px;
  padding-top: 15px;
  padding-left: 20px;
  .logo {
    display: inline-block;
    height: 36px;
    width: 86px;
    background-image: url("~@/assets/com-logo.png");
    // background-image: url('~@/assets/');
  }
}
.intro-wrapper {
  display: flex;
  height: 110px;
  margin: 0 22px 0 38px;
  padding-bottom: 20px;
  cursor: pointer;
}
.contents {
  position: absolute;
  top: 220px;
  width: 100%;
  bottom: 0;
  overflow-y: auto;
  .chapter {
    .__chapter {
      border-bottom: 1px solid #e9e9e9;
    }
    .__chapter_row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      padding-top: 20px;
      padding-bottom: 20px;
      font-weight: 600;
      &.no-children {
        cursor: not-allowed;
      }
    }
    .__chapter_row, .__chapter_period {
      padding-left: 40px;
      padding-right: 20px;
    }
    .__chapter_period {
      padding-top: 20px;
      padding-bottom: 20px;
      position: relative;
      cursor: pointer;
      color: #4c4c4c;
      &:hover {
        color: $mainColor;
        font-weight: 600;
      }
      &.active {
        color: $mainColor;
        background-color: #fef6ee;
        font-weight: 600;
      }
      &.inner {
        padding: 15px 20px 15px 60px;
      }
    }
  }
}
</style>
