<template>
  <div class="video-wrapper">
    <ArcusVideoPlay></ArcusVideoPlay>
    <div class="video-top-wrapper">
      <div class="video-top w">
        <div>
          面包屑导航
        </div>
        <div class="video-study-wrapper clearfix">
          <div class="video-study-video f-l">
              <div class="video-player-wrapper">
                <!-- <ArcusVideoPlay></ArcusVideoPlay> -->
              </div>
          </div>
          <div class="video-study-contents-wrapper f-r">
              <div class="video-study-contents-title">目录</div>
              <div class="video-study-contents">
                <el-scrollbar class="video-study-contents-container">
                  <div style="height: 2000px;">
                    dsaf
                  </div>
                </el-scrollbar>
              </div>
          </div>
        </div>
        <div class="video-intro-wrapper clearfix">
          <div class="video-intro f-l">
            <div class="video-intro-thumb">
              <img src="https://res.shiguangkey.com/file/201904/15/20190415180253763606150.jpg" alt="">
            </div>
            <div>
              dsafsdaf
            </div>
          </div>
          <div class="video-purchase f-r">
            购买  分享
          </div>
        </div>
      </div>
    </div>
    <div>
      介绍
    </div>
    <div class="w clearfix">
      <div class="f-l">
        <div>
          摘要
        </div>
        <div>
          留言
        </div>
      </div>
      <div class="f-r">
        关联推荐
      </div>
    </div>
  </div>
</template>

<script>
import ArcusVideoPlay from '@/components/common/ArcusVideoPlay'
export default {
  name: 'ArcusVideo',
  components: { ArcusVideoPlay },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {

  },
  mounted () {
    // this.initPageData()
  }
}
</script>

<style lang="scss" scoped>
.video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
}
.video-wrapper {
  .video-top-wrapper {
    background-color: #232323;
    // background-repeat: no-repeat;
    // background-size: cover;
    color: #ffffff;
    .video-top {
      .video-study-wrapper{
        // position: relative;
        .video-study-video {
          min-height: 480px;
          width: 880px;
          .video-player-wrapper {
            height: 100%;
            width: 100%;
            .video-player-box {
              height: 100%;
            width: 100%;
            }
          }
        }
        .video-study-contents-wrapper {
          min-height: 480px;
          width: 320px;
          .video-study-contents-title {
            height: 40px;
            line-height: 40px;
          }
          .video-study-contents {
            height: 440px;
            background: #1f1f1f;
            .video-study-contents-container {
              height: 100%;
              ::v-deep .el-scrollbar__wrap {
                overflow-x: hidden !important;
              }
            }
          }
        }
      }
      .video-intro-wrapper {
        > div {
          height: 160px;
        }
        .video-intro {
          padding-top: 20px;
          display: flex;
          .video-intro-thumb {
            > img {
              height: 100%;
              width: 100%;
            }
            position: relative;
            width: 90px;
            height: 120px;
            background: #b2b2b2;
            border-radius: 5px;
            overflow: hidden;
            cursor: pointer;
          }
          width: 880px;
        }
        .video-purchase {
          width: 320px;
        }
      }
    }
  }
}
</style>
