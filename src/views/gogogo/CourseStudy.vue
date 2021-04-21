<template>
  <div class="video-study-wrapper">
    <study-header :title="detail.title"></study-header>
    <div class="study-container">
      <div>
      </div>
      <div class="study-box" :class="{ article: detail.type === 2 }">
        <div id="player-container-id">
          <!-- <VodPlayer style="width:100%; height:100%;"></VodPlayer> -->
          <!-- <div></div>
          <div class="article-wrapper" v-if="currentPeriod.article">
            <div>
              <div>
                <div>{{currentPeriod.article.title}}</div>
                <div>{{currentPeriod.article.subtitle}}</div>
              </div>
              <div v-html="currentPeriod.article.content"></div>
              <div>{{currentPeriod.article.summary}}</div>
            </div>
          </div> -->
          <aliyun-vod-player style="width:100%; height:100%;" :data="currentPalyerInfo"></aliyun-vod-player>
        </div>
      </div>
      <div class="study-chapter-box">
        <div class="chapter-box-title" v-if="!fold">课程目录</div>
        <div class="chapter-box-content-wrapper">
          <gemini-scrollbar class="my-scroll-bar" v-if="!fold">
            <div class="chapter-box">
              <div v-for="(chapter, idx) in chapters" :key="idx">
                <div class="chapter-title" v-if="chapter.type === 'PERIOD'">
                  <div class="item" :class="{active: currentPeriod.id == chapter.id}">
                    <div class="item-text" @click="handleSwitchPeriod(chapter.id)"><i class="fa fa-file-o play-icon" :class="materialTypeIcon(chapter)"></i>{{chapter.title}}</div>
                  </div>
                </div>
                <div v-else>
                <div class="chapter-title">{{chapter.title}}</div>
                  <ul class="chapter-item" v-if="chapter.children">
                    <li class="item" :class="{active: currentPeriod.id == item.id}" v-for="(item, index) in chapter.children" :key="index">
                      <div class="item-text" @click="handleSwitchPeriod(item.id)"><i class="fa fa-file-o play-icon" :class="materialTypeIcon(item)"></i>{{item.title}}</div>
                      <!-- <ul class="vod-list">
                        <li class="vod" @click="handleSwitchVod(vod)" v-for="vod in item.cmsPeriodVods" :key="vod.id">
                          <span>{{vod.title}}</span>
                        </li>
                      </ul> -->
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </gemini-scrollbar>
        </div>
        <div class="fold-up" @click="triggerFold">
          <i class="fa" :class="{'fa-arrow-left': fold , 'fa-arrow-right': !fold}"></i>
        </div>
      </div>
    </div>
    <div class="w">
      <tabs activeName="FAQs">
        <tab-pane label="问答" name="FAQs">
          <div>问答</div>
        </tab-pane>
        <tab-pane label="评论" name="comments">
          <div>评论</div>
        </tab-pane>
        <tab-pane label="笔记" name="notes">
          <div>笔记</div>
        </tab-pane>
        <tab-pane label="资料下载" name="fileDownload">
          <div>
            <div v-if="currentPeriod.file">
              <ul>
                <li>
                  <a :href="currentPeriod.file.url" target="_blank">{{currentPeriod.file.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </tab-pane>
      </tabs>
    </div>
    <div>
      <!-- <div v-for="idx in 100" :key="idx">
        {{idx}}
      </div> -->
    </div>
  </div>
</template>

<script>
// import VodPlayer from '@/components/player/VodPlayer'
import AliyunVodPlayer from '@/components/player/AliyunVodPlayer'
import StudyHeader from '@/components/common/StudyHeader'
export default {
  name: 'CourseStudy',
  components: { StudyHeader, AliyunVodPlayer },
  data () {
    return {
      player: null,
      contentActive: 0,
      detail: {},
      chapters: [],
      purchased: false,
      mid: '',
      fold: false,
      currentVod: '',
      currentPalyerInfo: '',
      currentPeriod: ''
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    materialTypeIcon (item) {
      if (item.videoId) {
        return 'fa-video-camera'
      }
      if (item.audioId) {
        return 'fa-file-audio-o'
      }
      if (item.articleId) {
        return 'fa-file-text'
      }
      if (item.fileId) {
        return 'fa-file'
      }
      return 'fa-file-o'
    },
    triggerFold () {
      this.fold = !this.fold
    },
    handleSwitch () {
    },
    switchVideo (fileID, appID, psign) {
    },
    async handleSwitchPeriod (id) {
      // 获取详细信息
      if (this.currentPeriod.id === id) {
        return
      }
      await this.$get(`/api/web/cms/period/${id}`).then(res => {
        if (res.code === 0) {
          this.currentPeriod = res.data
          this.handleSwitchVod(res.data)
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleSwitchVod (item) {
      if (!item.video) {
        return
      }
      this.$get(`/api/vod/getVodAuth/${item.video.id}`, { params: { courseId: item.courseId, periodId: item.id } }).then(res => {
        if (res.code === 0) {
          this.currentPalyerInfo = res.data
        } else {
          this.$message.error(res.message)
        }
      })
    },
    handleGetFirsetPeriod () {
      for (let i = 0; i < this.chapters.length; i++) {
        if (this.chapters[i].type === 'PERIOD') {
          return this.chapters[i]
        }
        if (this.chapters.children) {
          for (let j = 0; j < this.chapters.children.length; j++) {
            return this.chapters.children[j]
          }
        }
      }
      return null
    },
    async initData () {
      //
      // console.log(this.$route)
      let { mid } = this.$route.query
      this.mid = mid
      const { id } = this.$route.params
      // console.log(id)
      if (!id) {
        //
      }
      await this.$store.dispatch('course/detail', id).then(res => {
        if (res.code === 0 && res.data) {
          if (res.data.type === 2) {
            this.$router.replace({ path: `/column-study/${id}`, query: this.$route.query })
            return
          }
          this.detail = res.data
          document.title = this.detail.title
        }
      }).catch(() => {})
      await this.$get(`/api/web/cms/periodsByCourseId/${id}`).then(res => {
        this.chapters = res.data || []
      })
      // this.$store.dispatch('course/chapters', { id, requireVod: true }).then(res => {
      //   if (res.code === 0 && res.data) {
      //     this.chapters = res.data
      //     if (this.chapters && this.chapters.length && this.chapters[0] && this.chapters[0].children && this.chapters[0].children.length) {
      //       this.handleSwitchPeriod(this.chapters[0].children[0])
      //     }
      //   }
      // }).catch(() => {})
      // 获取观看日志

      if (!mid) {
        // 获取
        mid = this.detail.umsUserCourse && this.detail.umsUserCourse.lastStudiedPeriodId && ''
        if (!mid) {
          //
          const period = this.handleGetFirsetPeriod()
          if (period) {
            mid = period.id
          }
        }
      }
      if (mid) {
        this.handleSwitchPeriod(mid)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.study-container {
  height: calc(100vh - 120px);
  min-height: 500px;
  display: flex;
  background-color: #1C1F21;
  .study-box {
    flex: 1;
    // width: calc(100% - 300px);
    height: 100%;
    padding: 10px;
    background: #000000;
    position: relative;
    #player-container-id {
      position: absolute;
      top: 10px;
      left: 10px;
      bottom: 10px;
      right: 10px;
    }
  }
  .study-chapter-box {
    // width: 360px;
    color: rgba(255,255,255,.6);
    // padding: 20px;
    padding-left: 30px;
    overflow-y: auto;
    position: relative;
    .chapter-box-title {
      padding: 20px 0;
      font-size: 20px;
      height: 60px;
    }
    .chapter-box-content-wrapper {
      height: calc(100% - 62px);
    }
    .my-scroll-bar {
      width: 360px;
    }
    .chapter-box {
      .chapter-title {
        font-size: 14px;
        padding: 15px 0;
        color: #ffffff;
        // .chapter-box-title {
        //   padding: 15px 0 20px;
        //   font-size: 24px;
        // }
      }
      .chapter-item {
        cursor: pointer;
        .item {
          padding: 10px 10px 10px 20px;
          font-size: 12px;
        }
        .vod {
          padding: 4px 0;
          :hover {
            color: $mainColor
          }
        }
      }
      .item {
        cursor: pointer;
          .item-text {
            display: block;
          }
          &:hover, &.active {
            .item-text {
              color: $mainColor
            }
          }
          .play-icon {
            display: inline-block;
            margin-right: 10px;
            font-size: 10px;
          }
          .vod-list {
            // display: none;
            padding-left: 10px;
            padding-top: 10px;
          }
        }
    }
    .fold-up {
      position: absolute;
      width: 13px;
      height: 100px;
      line-height: 100px;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0,0,0,.3);
      border-radius: 0 13px 13px 0;
      color: #545c63;
      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,.6);
        color: #ffffff;
      }
    }
  }
}
.content-info-nav-wrapper {
  box-shadow: 0 4px 8px 0 rgba(28,31,33,.1);
  .content-info-nav {
    height: 60px;
    display: flex;
    .nav-item {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      margin-right: 90px;
      color: #545c63;
      font-size: 16px;
      cursor: pointer;
      position: relative;
      &:hover,  &.active {
        color: $mainColor;
        &::after {
          background: $mainColor;
          transition: .3s;
        }
      }
      &::after{
        content: '';
        height: 4px;
        width: 20px;
        position: absolute;
        display: block;
        margin-left: -10px;
        left: 50%;
        bottom: 5px;
        transition: .3s;
        border-radius: 4px;
      }
    }
  }
}
.content-info-wrapper {
  display: flex;
  padding: 20px 0;
  .content-info-container {
    flex: 1;
    .nav-panel {
      display: none;
      &.active {
        display: block;
      }
    }
  }
  .sem-info-container {
    width: 300px;
  }
}
</style>
