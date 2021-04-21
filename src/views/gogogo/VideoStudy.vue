<template>
  <div class="video-study-wrapper">
    <study-header></study-header>
    <div class="study-container">
      <div>

      </div>
      <div class="study-box">
        <video id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
        </video>
      </div>
      <div class="study-chapter-box">
        <div class="">
          <span></span>
        </div>
      </div>
    </div>
    <div class="content-info-nav-wrapper">
      <div class="w">
        <ul class="content-info-nav">
          <li class="nav-item" :class="{active: contentActive == 0}" @click="contentActive = 0">问答</li>
          <li class="nav-item" :class="{active: contentActive == 1}" @click="contentActive = 1">评论</li>
          <li class="nav-item" :class="{active: contentActive == 2}" @click="contentActive = 2">笔记</li>
          <li class="nav-item" :class="{active: contentActive == 3}" @click="contentActive = 3">资料下载</li>
        </ul>
      </div>
    </div>
    <div>
      <div class="w content-info-wrapper">
        <div class="content-info-container">
          <div class="nav-panel" :class="{active: contentActive == 0}">问答</div>
          <div class="nav-panel" :class="{active: contentActive == 1}">评论</div>
          <div class="nav-panel" :class="{active: contentActive == 2}">笔记</div>
          <div class="nav-panel" :class="{active: contentActive == 3}">资料下载</div>
        </div>
        <div class="sem-info-container">
          <div>社群</div>
          <div>营销</div>
        </div>
      </div>
    </div>
    <el-button @click="handleSwitch">切换视频</el-button>
    <div>
      <!-- <div v-for="idx in 100" :key="idx">
        {{idx}}
      </div> -->
    </div>
  </div>
</template>

<script>
// const tcplayerCssNode = document.createElement('link')
// tcplayerCssNode.href = 'https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css'
// tcplayerCssNode.rel = 'stylesheet'
// document.body.appendChild(tcplayerCssNode)

// const tcplayerJsNode = document.createElement('script')
// tcplayerJsNode.src = 'https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.v4.min.js'
// document.body.appendChild(tcplayerJsNode)
import { appendLink, appendScript } from '@/utils/dom'
import StudyHeader from '@/components/common/StudyHeader'
export default {
  name: 'gogogo',
  components: { StudyHeader },
  data () {
    return {
      player: null,
      contentActive: 0
    }
  },
  methods: {
    handleSwitch () {
      this.switchVideo('5285890802633447946', '1253435983',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmxBY2Nlc3NJbmZvIjp7fSwiYXBwSWQiOjEyNTM0MzU5ODMsImN1cnJlbnRUaW1lU3RhbXAiOjE1OTEwMjAxMTcsImZpbGVJZCI6IjUyODU4OTA4MDI2MzM0NDc5NDYifQ.F-8-lDZsMNdb8VqoyETM98JEKg-bv6jyiXGMgN9GUtg')
    },
    switchVideo (fileID, appID, psign) {
      if (!this.player) {
        return
      }
      this.player.loadVideoByID({
        fileID: fileID, // 请传入需要播放的视频 filID（必须）
        appID: appID, // 请传入点播账号的 appID（必须）
        // t: '', // 参考 Key 防盗链说明
        // us: '', // 参考 Key 防盗链说明
        psign: psign // 参考 Key 防盗链说明
        // exper: '' // 参考 试看功能说明
      })
    },
    createVideoPlayer (fileID, appID, psign) {
      this.player = window.TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
        fileID: fileID, // 请传入需要播放的视频 filID（必须）
        appID: appID, // 请传入点播账号的 appID（必须）
        psign: psign,
        playbackRates: [0.5, 1, 1.25, 1.5, 2], // 设置变速播放倍率选项，仅 HTML5 播放模式有效
        plugins: {
          ContinuePlay: { // 开启续播功能
            auto: true, // [可选] 是否在视频播放后自动续播
            text: '上次播放至 ', // [可选] 提示文案
            btnText: '恢复播放' // [可选] 按钮文案
          },
          ContextMenu: {
            mirror: true // 启右键菜单镜像选项：
          },
          ProgressMarker: true // 进度条标记
        },
        autoplay: false,
        preload: 'none', // 'auto', meta
        language: 'zh-CN',
        controls: true,
        bigPlayButton: true, // 是否显示居中的播放按钮（浏览器劫持嵌入的播放按钮无法去除）。
        controlBar: {
          playToggle: true, // 是否显示播放、暂停切换按钮。
          progressControl: true, // 是否显示播放进度条。
          volumePanel: true, // 是否显示音量控制。
          currentTimeDisplay: true, // 是否显示视频当前时间。
          durationDisplay: true, // 是否显示视频时长
          timeDivider: true, // 是否显示时间分割符。
          playbackRateMenuButton: true, // 是否显示播放速率选择按钮。
          fullscreenToggle: true, // 是否显示全屏按钮。
          QualitySwitcherMenuButton: true // 是否显示清晰度切换菜单。
        }
      })
      // console.log(this.player)
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     this.createVideoPlayer()
  //   })
  //     hlsLoaded: false,
  //     tcplayerLoaded: false
  //   }
  // },
  created () {
    appendLink('https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css')
    appendScript('https://imgcache.qq.com/open/qcloud/video/tcplayer/libs/hls.min.0.12.4.js', () => {
      this.hlsLoaded = true
    })
    appendScript('https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.v4.min.js', () => {
      this.tcplayerLoaded = true
    })
  },
  mounted () {
    const interval = setInterval(() => {
      if (this.hlsLoaded && this.tcplayerLoaded) {
        // 进行初始化
        clearInterval(interval)
        this.createVideoPlayer('5285890802664340800', '1253435983', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmxBY2Nlc3NJbmZvIjp7fSwiYXBwSWQiOjEyNTM0MzU5ODMsImN1cnJlbnRUaW1lU3RhbXAiOjE1OTA5OTY1MjUsImZpbGVJZCI6IjUyODU4OTA4MDI2NjQzNDA4MDAifQ.qcp6dISE2-oh_wW8dSpJa0jqR2L_S2zEZRqEr05Ep50')
        // window.TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
        //   fileID: '5285890802664340800', // 请传入需要播放的视频 filID（必须）
        //   appID: '1253435983', // 请传入点播账号的 appID（必须）,
        //   psign: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmxBY2Nlc3NJbmZvIjp7fSwiYXBwSWQiOjEyNTM0MzU5ODMsImN1cnJlbnRUaW1lU3RhbXAiOjE1OTA5OTY1MjUsImZpbGVJZCI6IjUyODU4OTA4MDI2NjQzNDA4MDAifQ.qcp6dISE2-oh_wW8dSpJa0jqR2L_S2zEZRqEr05Ep50'
        // })
      }
    }, 300)
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
    background: #000000;
    #player-container-id {
      height: 100%;
      width: 100%;
    }
  }
  .study-chapter-box {
    width: 360px;
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
