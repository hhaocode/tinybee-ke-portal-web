<template>
    <div class="player-container">
      <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>
</template>

<script>
// 引入video样式
import videojs from 'video.js'

import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
window.videojs = videojs
// 引入hls.js
// import 'videojs-contrib-hls.js/src/videojs.hlsjs'
// import 'videojs-contrib-hls'
export default {
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        controls: true, // 控制条
        preload: 'auto', // 视频预加载
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'application/x-mpegURL',
          src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8'
          // https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8
        }],
        hls: true,
        poster: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg', // 你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style lang="scss">
$player-color: #FF0000;
$type: screen;
$proto: max-width;
$value: 640px;

.player-container{
  width: 750px;
  margin: 0px auto;
  @media #{$type} and ($proto: $value) {
    width: 100%;
  };
  .video-player{
    cursor: pointer;
  }
}

// *播放器播放按钮样式*
.video-js .vjs-big-play-button{
  height: 2em;
  width: 2em;
  line-height: 2em;
  border-radius: 1em;
  border: 0;
}
.vjs-custom-skin > .video-js .vjs-big-play-button{
  margin-left: -1em;
}
.video-js .vjs-big-play-button:hover, .vjs-custom-skin .video-js:hover .vjs-big-play-button{
  background-color: $player-color;
  transition: all 0.3s;
}
.video-js .vjs-control:focus:before, .video-js .vjs-control:hover:before, .video-js .vjs-control:focus{
  outline: none;
}
.vjs-custom-skin > .video-js .vjs-play-progress, .vjs-custom-skin > .video-js .vjs-volume-level{
  background-color: $player-color;
}
</style>
