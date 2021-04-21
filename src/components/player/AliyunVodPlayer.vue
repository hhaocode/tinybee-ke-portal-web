<template>
  <div class="aliyun-vod-player-wrapper">
     <div class="prism-player" ref="player" id="J_prismPlayer" v-if="data && data.playAuth"></div>
     <div class="aliyun-vod-player-mask" v-else>
       <div class="aliyun-vod-player-mask-info">
         课件未上架
       </div>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      player: ''
    }
  },
  props: {
    data: {
      default: () => {
        return {}
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler (newVal, oldVal) {
        this.switchVod(newVal)
      }
    }
  },
  methods: {
    switchVod (data) {
      if (data) {
        // 设置
        this.$nextTick(() => {
          if (this.player) {
            this.player.dispose()
            this.$refs.player.innerHTML = ''
          }
          this.player = new window.Aliplayer({
            id: 'J_prismPlayer',
            width: '100%',
            height: '100%',
            autoplay: true,
            vid: data.vid,
            playauth: data.playAuth,
            cover: data.metaInfo.coverURL,
            mediaType: data.mediaType,
            playsinline: true
          })
        })
      }
    }
  },
  mounted () {
    if (this.data && this.data.playAuth) {
      this.switchVod(this.data)
    }
    // this.player = new window.Aliplayer({
    //   id: 'J_prismPlayer',
    //   width: '100%',
    //   // height: '100%',
    //   // autoplay: true,
    //   // 支持播放地址播放,此播放优先级最高
    //   // source: '播放url',
    //   // 播放方式二：点播用户推荐
    //   vid: '4d50962627934cba8497ebb8153d5ded',
    //   playauth: '/',
    //   cover: ''
    //   // encryptType: 1 // 当播放私有加密流时需要设置。
    //   // 播放方式三：仅MPS用户使用
    //   // vid: '1e067a2831b641db90d570b6480fbc40',
    //   // accId: 'dd',
    //   // accSecret: 'dd',
    //   // stsToken: 'dd',
    //   // domainRegion: 'dd',
    //   // authInfo: 'dd',
    //   // 播放方式四：使用STS方式播放
    //   // vid: '1e067a2831b641db90d570b6480fbc40',
    //   // accessKeyId: 'dd',
    //   // securityToken: 'dd',
    //   // accessKeySecret: 'dd',
    //   // region: 'cn-shanghai'// eu-central-1,ap-southeast-1
    // }, function (player) {
    //   console.log('播放器创建好了。')
    // })
  }
}
</script>

<style lang="scss" scoped>
.aliyun-vod-player-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .aliyun-vod-player-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: #ffffff;
    .aliyun-vod-player-mask-info {
      position: absolute;
      display: inline-block;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  }
}
</style>
