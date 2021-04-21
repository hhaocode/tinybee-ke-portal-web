<template>
  <div class="video-wrapper">
    <video-player ref="player" class="vjs-custom-skin" :options="playerOptions"></video-player>
    <el-button @click="test">点击</el-button>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
export default {
  name: 'ArcusVideoPlay',
  methods: {
    test () {
      console.log(this.$refs.player)
    }
  },
  data () {
    return {
      playerOptions: {
        constols: true,
        height: '480px',
        loop: false,
        muted: true,
        // poster:
        preload: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        width: '880px',
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-wrapper {

  width: 880px;
  height: 480px;
  margin: auto;
  ::v-deep {
    .video-js{
      background-color: #232323;
    }
    .vjs-menu-button-popup:hover .vjs-menu {
      display: block;
    }
    :focus{outline:0;}
    .vjs-custom-skin > .video-js .vjs-big-play-button {
      font-size: 1.5em;
    }
  }
}
</style>
