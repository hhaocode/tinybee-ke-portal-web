<template>
  <div class="go-page">
    <div class="go-layout" ref="goLayout" @mouseup="handleDragMouseUp" @mousemove="handleDragMouseMove">
      <div class="go-left" :style="{width: mainLayoutWidth}">
        <div class="inner">
          <div class="chapter-title">
            <h2>{{currentPeriod.title}}</h2>
          </div>
          <div class="panel video-panel">

          </div>
          <div class="panel aricle-panel"></div>
          <div class="panel work-pannel"></div>
        </div>
        <div class="drag-wrap" @mousedown="handleDragMouseDown">
          <span class="drag"></span>
        </div>
      </div>
      <div class="go-right" :style="{left: mainLayoutWidth}">
        右边内容区
      </div>
    </div>
    <div class="go-aside-bar">
      <div class="inner">
        <router-link class="item" :to="`/course/intro/${id}`">
          <i class="fa fa-arrow-left"></i>
          <span class="text-tip">返回</span>
        </router-link>
        <ul class="menus">
          <li class="divider"></li>
          <li>
            <a href="javascript:;" class="item" :class="{on: this.chapterShow}" @click.stop="handleToggleChapter">
              <i class="fa fa-list"></i>
              <span class="text-tip">章节</span>
            </a>
            <a href="javascript:;" class="item">
              <i class="fa fa-question-circle"></i>
              <span class="text-tip">问答</span>
            </a>
            <a href="javascript:;" class="item">
              <i class="fa fa-edit"></i>
              <span class="text-tip">笔记</span>
            </a>
            <a href="javascript:;" class="item">
              <i class="fa fa-cloud-download"></i>
              <span class="text-tip">资料</span>
            </a>
          </li>
          <li class="divider"></li>
        </ul>
        <a href="/u/study-info" target="_blank" class="item user">
          <i>
            <img src="http://tinybee-ke.oss-cn-shanghai.aliyuncs.com/images/1354592904366133248.jpg" alt="">
          </i>
          <span class="text-tip">我的</span>
        </a>
      </div>
      <div class="expand chapter-expand" :class="{show: chapterShow}"
        @click.stop="chapterShow = true"
      >
        <div class="expand-inner">
           <gemini-scrollbar class="chapter-scrollbar">
             <div class="chapter-list ">
               <template v-for="(chapter, idx) in chapters">
                 <div class="chapter-row" :key="idx" v-if="chapter.type === 'CHAPTER'">
                   <span class="text">{{chapter.title}}</span>
                 </div>
                 <a href="javascript:;" class="period-row chapter-row" @click="handleStartWatch(chapter)" :key="idx" v-else>
                    <span class="type">
                      <i class="fa" :class="renderSourceType(chapter)"></i>
                    </span>
                    <span class="title">{{chapter.title}}</span>
                    <span class="process">
                      <span class="playing" v-if="mid * 1 == chapter.id">正在学习</span>
                      <i class="fa"></i>
                    </span>
                  </a>
                 <template v-if="chapter.children">
                   <div v-for="(item, index) in chapter.children" :key="idx + '' + index" class="period-row-wrap">
                     <a href="javascript:;" class="period-row" @click="handleStartWatch(item)">
                       <span class="type">
                         <i class="fa" :class="renderSourceType(item)"></i>
                       </span>
                       <span class="title">{{item.title}}</span>
                       <span class="process">
                         <span class="playing" v-if="mid * 1 == item.id">正在学习</span>
                         <i class="fa"></i>
                       </span>
                     </a>
                   </div>
                 </template>
                 <!-- <dd v-for=""></dd> -->
               </template>
             </div>
           </gemini-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      course: {},
      chapters: [],
      chapterShow: false,
      drag: false,
      mainLayoutWidth: '50%',
      rightClose: false,
      id: '',
      mid: '',
      currentPeriod: ''
    }
  },
  mounted () {
    this.init()
    this.initEvent()
  },
  watch: {
    $route: function (newVal) {

    }
  },
  methods: {
    async init () {
      const { mid } = this.$route.query
      // this.mid = mid
      const { id } = this.$route.params
      this.id = id
      // console.log(id)
      if (!id) {
      //
      }
      await this.$store.dispatch('course/detail', id).then(res => {
        if (res.code === 0 && res.data) {
          this.course = res.data
          document.title = this.detail.title
        }
      }).catch(() => {})
      await this.$get(`/api/web/cms/periodsByCourseId/${id}`).then(res => {
        const chapters = res.data || []
        chapters.forEach(v => {
          v.expanded = true
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
      if (mid) {
        this.handleSwitchPeriod(mid)
      }
    },
    handleStartWatch (item) {
      // this.mid = item.id
      //
      this.handleSwitchPeriod(item.id)
    },
    async handleSwitchPeriod (id) {
      // 获取详细信息
      if (this.mid === id) {
        return
      }
      this.mid = id
      this.chapterShow = false
      await this.$get(`/api/web/cms/period/${id}`).then(res => {
        if (res.code === 0) {
          this.currentPeriod = res.data
          // this.handleSwitchVod(res.data)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    renderSourceType (item) {
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
      // play
    },
    renderProcess (item) {
      // studyProgress
      return 'fa-circle'
      // 'fa-circle-o' 'fa-dot-circle-o'
    },
    handleToggleChapter () {
      this.chapterShow = !this.chapterShow
    },
    hideChapterPane () {
      this.chapterShow = false
    },
    handleDragMouseDown (e) {
      this.drag = true
    },
    handleDragMouseUp (e) {
      this.drag = false
    },
    handleCloseRight () {
      this.rightClose = true
      this.mainLayoutWidth = '100%'
    },
    handleDragMouseMove (e) {
      if (this.drag) {
        const width = (e.clientX - 60)
        const parentWidth = this.$refs.goLayout.clientWidth
        if (width < 400) {
          this.mainLayoutWidth = 400 / parentWidth * 100 + '%'
          return
        }
        if (parentWidth - width <= 400) {
          this.mainLayoutWidth = (parentWidth - 400) / parentWidth * 100 + '%'
        } else {
          this.mainLayoutWidth = width / parentWidth * 100 + '%'
        }
      }
    },
    initEvent () {
      // 初始化 layout
      const parentWidth = this.$refs.goLayout.clientWidth
      this.mainLayoutWidth = (parentWidth - 400) / parentWidth * 100 + '%'
      document.addEventListener('click', this.hideChapterPane)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.hideChapterPane)
  }
}
</script>

<style lang="scss" scoped>
$workbench-color: #1d1d21;
$mainColor: #1DD39A;
.go-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #f3f5f6!important;
  .go-aside-bar {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 60px;
    background-color: #1d1d21;
    z-index: 899;
    .inner {
      position: relative;
      height: 100%;
      background-color: $workbench-color;
      z-index: 899;
      color: rgba(255,255,255,.8);
      .item {
        position: relative;
        display: block;
        padding: 16px 0 14px;
        color: rgba(255,255,255,.8);
        i {
          position: relative;
          display: block;
          text-align: center;
          font-size: 24px;
          z-index: 2;
          margin-bottom: 8px;
        }
        .text-tip {
          display: block;
          text-align: center;
          font-size: 12px;
          line-height: 18px;
          font-weight: 400;
        }
      }
      .item:hover {
        background-color: #2d3135;
        color: #fff;
        i {
          background-color: #2d3135;
          color: #fff;
        }
        &.on {
          background-color: #2d3135;
        }
      }
      .item.on {
        background: rgba(255,255,255,.2);
        color: #fff;
      }
      .menus {
        .divider {
          margin: 0 auto;
          width: 20px;
          height: 1px;
          background-color: #363a3e;
        }
      }
    }
    .user {
      text-align: center;
      img {
        position: relative;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid #808792;
      }
    }
    .expand {
      margin-left: -340px;
      // visibility: hidden;
      transition: margin-left .3s ease;
      &.show {
        margin-left: 0;
        // visibility: visible;
        transition: margin-left .3s ease;
      }
    }
    .chapter-expand {
      position: absolute;
      left: 60px;
      top: 0;
      height: 100%;
      z-index: 898;
      width: 340px;
      background-color: #25282c;
      .expand-inner {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        padding: 28px 0 10px;
      }
    }
  }
  .go-layout {
    position: relative;
    z-index: 888;
    height: 100%;
    margin-left: 60px;
    user-select: none;
    .inner {
      position: relative;
      height: 100%;
    }
    .go-right, .go-left {
      position: absolute;
      top: 0;
      height: 100%;
      left: 0;
    }
    .go-left {
      width: 50%;
      background-color: #1d1f21;
      .inner {
        margin-right: 10px;
      }
      .chapter-title {
        height: 50px;
        padding: 0 0 0 20px;
        h2 {
          display: inline-block;
          vertical-align: middle;
          line-height: 50px;
          font-size: 18px;
          color: #fff;
        }
      }
      .panel {
        position: absolute;
        bottom: 0;
        top: 50px;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
      }
    }
    .go-right {
      right: 0;
      left: 50%;
    }
    .drag-wrap {
      position: absolute;
      right: 0;
      top: 0;
      width: 10px;
      height: 100%;
      cursor: col-resize;
      background-color: $workbench-color;
      .drag {
        position: absolute;
        top: 50%;
        margin-top: -20px;
        left: 3px;
        width: 2px;
        height: 40px;
        border: 1px solid #626972;
        border-width: 0 1px 0 1px;
        box-sizing: content-box;
      }
    }
  }
  .chapter-scrollbar {
    ::v-deep .thumb {
      background-color: #4e5a5e !important;
    }
  }
  .chapter-list {
    padding: 0 20px;
  }
  .period-row-wrap {
    padding-left: 10px;
    height: 30px;
    line-height: 30px;
  }
  .period-row {
    position: relative;
    display: block;
    padding: 0 14px 0 24px;
    font-size: 12px;
    color: #787d82;
    box-sizing: border-box;
    &:hover {
      color: $mainColor;
    }
    .type {
      position: absolute;
      left: 0;
      top: 1px;
      // font-size: 16px;
      font-size: 12px;
    }
    .title {
      display: inline-block;
      max-width: 190px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      vertical-align: middle;
    }
    .process {
      position: absolute;
      right: 0;
      top: 1px;
      &.finished {
        color: $mainColor;
      }
      .playing {
        font-size: 12px;
        color: $mainColor;
      }
    }
  }
  .chapter-row {
    height: 54px;
    line-height: 54px;
    font-size: 14px;
    color: #b5b9bc;
    .text {
      display: inline-block;
      max-width: 260px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      vertical-align: middle;
    }
  }
}
</style>
