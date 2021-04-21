<template>
        <div class="player-wrapper">
          <video-player  class="vjs-custom-skin vjs-arcus-skin"
                         ref="videoPlayer"
                         :options="playerOptions"
                         :playsinline="true"
                         @play="onPlayerPlay($event)"
                         @pause="onPlayerPause($event)"
                         @ended="onPlayerEnded($event)"
                         @loadeddata="onPlayerLoadeddata($event)"
                         @waiting="onPlayerWaiting($event)"
                         @playing="onPlayerPlaying($event)"
                         @timeupdate="onPlayerTimeupdate($event)"
                         @canplay="onPlayerCanplay($event)"
                         @canplaythrough="onPlayerCanplaythrough($event)"
                         @ready="playerReadied"
                         @statechanged="playerStateChanged($event)">
          </video-player>
        </div>
</template>

<script>
// custom skin css
// import videojs from 'video.js'
// import 'videojs-contrib-hls'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
// import { getToken } from '@/utils/auth'
// window.videojs = videojs
export default {
  name: 'LivePlayer',
  data () {
    return {
      // videojs options
      playerOptions: {
        // height: '360',
        height: '100%',
        width: '100%',
        autoplay: false,
        // muted: true,
        language: 'zh-CN',
        preload: 'auto', // 视频预加载
        // playbackRates: [0.7, 1.0, 1.5, 2.0],
        // preload: true,
        sources: [
          {
            src: 'rtmp://58.200.131.2:1935/livetv/ahtv',
            type: 'rtmp/flv'
          }],
        //   {
        //   // type: 'video/mp4',
        //   type: 'application/x-mpegURL',
        //   // mp4
        //   // type: 'application/x-mpegURL',
        //   // src: 'http://vjs.zencdn.net/v/oceans.mp4'
        //   // type: 'video/m3u8',
        //   // // mp4
        //   // src: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
        //   // src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
        //   src: 'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'
        //   // src: 'http://127.0.0.1:7100/api/file/a.m3u8'
        //   // src: 'https://cdn.letv-cdn.com/2018/12/05/JOCeEEUuoteFrjCg/playlist.m3u8'
        //   // webm
        //   // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
        // }],
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
        // hls: true,
        // hls: {
        //   withCredentials: false
        // },
        // hls: {
        //   withCredentials: true
        // },
        html5: {
          hls: {
            withCredentials: true
          }
        },
        controlBar: {
          // remainingTimeDisplay: true,
          playToggle: {},
          progressControl: {},
          fullscreenToggle: {},
          volumeMenuButton: {
            inline: false,
            vertical: true
          }
        }
      }
    }
  },
  mounted () {
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      // console.log('dynamic change options', this.player)
      // change src
      // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })
      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      // this.player.muted(false)
    }, 5000)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // listen event
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      // console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied (player) {
      // seek to 10s
      // console.log('example player 1 readied', player)
      // player.currentTime(10)
      // console.log('example 01: the player is readied', player)
      // const _this = this
      // var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      // player.tech_.hls.xhr.beforeRequest = function (options) {
      //   console.log(options)
      //   const userInfo = localStorage.getItem('userInfo')
      //   const token = JSON.parse(userInfo).accessToken
      //   options.headers = {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json;charset=UTF-8',
      //     'Accept-Language': 'zh-CN,zh;q=0.9,hy;q=0.8,mn;q=0.7',
      //     Authorization: 'Bearer ' + token
      //   }
      //   return options
      // }
      // var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
      // player.tech_.hls.xhr.beforeRequest = function (options) {
      //   // const userInfo = localStorage.getItem('userInfo')
      //   const token = getToken()
      //   options.headers = {
      //     Accept: 'application/json, text/plain, */*',
      //     'Content-Type': 'application/json;charset=UTF-8',
      //     'Accept-Language': 'zh-CN,zh;q=0.9,hy;q=0.8,mn;q=0.7',
      //     Authorization: token,
      //     'x-access-token': token
      //     // Authorization: 'Bearer ' + token
      //   }
      //   return options
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.player-test {
  width: 500px;
  height: 400px;
}
.player-wrapper{
  // height: 100%;
  // width: 100%;
  position: relative;
  ::v-deep .video-js {
    height: 100%;
    width: 100%;
      .vjs-control-bar {
        // background-color: transparent;
      }
     .vjs-volume-panel.vjs-volume-panel-horizontal {
      transition: width 1s;
      width: 3em;
      &:hover {
        width: 10em;
      transition: width .1s;
      .vjs-mute-control {
        margin: 0;
      }
      .vjs-volume-control.vjs-volume-horizontal {
          width: 8em;
          height: 3em;
          visibility: visible;
          opacity: 1;
          position: relative;
          transition: visibility .1s,opacity .1s,height .1s,width .1s,left 0s,top 0s;
          // vjs-volume-panel vjs-control vjs-volume-panel-horizontal
        }
      }
    }
  }
}

</style>
