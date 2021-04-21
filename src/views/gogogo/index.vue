<template>
  <div id="gogogo">
   <!-- <link href="https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.css" rel="stylesheet"> -->
 <!--如果需要在 Chrome 和 Firefox 等现代浏览器中通过 H5 播放 HLS 格式的视频，需要在 tcplayer.v4.min.js 之前引入 hls.js。-->
 <!-- <script src="https://imgcache.qq.com/open/qcloud/video/tcplayer/libs/hls.min.0.12.4.js"></script> -->
 <!--播放器脚本文件-->
 <!-- <script src="https://imgcache.qq.com/open/qcloud/video/tcplayer/tcplayer.v4.min.js"></script> -->
  <div class="gogogo-wrapper">
    <div class="gogogo-core-wrapper">
        <div class="gogogo-core-header">
          头
        </div>
        <div class="gogogo-core-container">
          <video is="video" id="player-container-id" preload="auto" playsinline webkit-playsinline></video>
        </div>
    </div>
    <div class="gogogo-record-wrapper">
      <div class="gogogo-split-resize">
        <span class="resize-drag"></span>
      </div>
      <div class="gogogo-record">

      </div>
    </div>
    <video id="player-container-id" width="414" height="270" preload="auto" playsinline webkit-playsinline>
    </video>
  </div>
  <div class="gogogo-aside-bar">
    <div class="gogogo-aside-bar-container">
      <a class="back-btn" href="">返回</a>
      <ul class="gogogo-aside-bar-menu">
        <li class="menu-item">
          <a class="menu-a" href="javascript:;">章节</a>
        </li>
        <li class="menu-item">
          <a class="menu-a" href="javascript:;">我的</a>
        </li>
      </ul>
    </div>
    <div class="chapter-container">
            asdfasdfsadfsdafasd
    </div>
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

export default {
  name: 'gogogo',
  data () {
    return {
      player: null
    }
  },
  methods: {
    switchVideo () {
      this.player.loadVideoByID({
        fileID: '', // 请传入需要播放的视频 filID（必须）
        appID: '', // 请传入点播账号的 appID（必须）
        t: '', // 参考 Key 防盗链说明
        us: '', // 参考 Key 防盗链说明
        sign: '', // 参考 Key 防盗链说明
        exper: '' // 参考 试看功能说明
      })
    },
    createVideoPlayer () {
      this.player = window.TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
        fileID: '5285890802071737634', // 请传入需要播放的视频 filID（必须）
        appID: '1253435983', // 请传入点播账号的 appID（必须）
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
        autopla: true,
        preload: 'auto',
        language: 'zh-CN',
        controlBar: {
          playToggle: true,
          progressControl: true,
          volumePanel: true,
          currentTimeDisplay: true,
          durationDisplay: true,
          timeDivider: true,
          playbackRateMenuButton: true,
          fullscreenToggle: true,
          QualitySwitcherMenuButton: true
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
        window.TCPlayer('player-container-id', { // player-container-id 为播放器容器 ID，必须与 html 中一致
          fileID: '5285890802617285899', // 请传入需要播放的视频 filID（必须）
          appID: '1253435983' // 请传入点播账号的 appID（必须）
        })
      }
    }, 300)
  }
}
</script>

<style lang="scss" scoped>
#gogogo{
  height: 100%;
  position: relative;
  background: #1d1f21;
  color: #ffffff;
  .gogogo-wrapper {
    position: relative;
    z-index: 888;
    height: 100%;
    margin-left: 50px;
    .gogogo-record-wrapper {
      width: 400px;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      padding-left: 10px;
      .gogogo-split-resize {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        width: 10px;
        &:hover{
          cursor: col-resize;
        }
        .resize-drag {
          position: absolute;
          top: 50%;
          margin-top: -20px;
          left: 3px;
          width: 2px;
          height: 40px;
          border: 1px solid #626972;
          border-width: 0 1px 0 1px;
        }
      }
      .gogogo-record {
        background-color: #ffffff;
        color: #545c63;
        height: 100%;
      }
    }
    .gogogo-core-wrapper {
      height: 100%;
      width: calc(100% - 400px);
      position: absolute;
      top: 0;
      left: 0;
      .gogogo-core-header {
        height: 50px;
        display: flex;
        align-items: center;
      }
      .gogogo-core-container {
        height: calc(100% - 50px);
        position: relative;
        #player-container-id {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .gogogo-aside-bar {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 50px;
      background-color: #1d1d21;
      z-index: 899;
      .gogogo-aside-bar-container {
        .back-btn {
          display: flex;
          height: 50px;
          justify-content: center;
          align-items: center;
          color: #D2D2D3;
          &:hover {
            color: #ffffff;
          }
        }
        .gogogo-aside-bar-menu {

          .menu-item {
            display: block;
            height: 60px;
            line-height: 60px;
            &:hover {
              > .menu-a {
                color: #ffffff;
              }
            }
            > .menu-a {
              display: flex;
              height: 100%;
              width: 100%;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 20px 0;
              color: #D2D2D3;
            }
          }
          .chapter-container {
            color: #ffffff;
            background: inherit;
            height: 100%;
            width: 200px;
          }
        }
      }
    }
}

</style>
