<template>
  <ArcusVideoPlay ></ArcusVideoPlay>
</template>

<script>
import ArcusVideoPlay from '@/components/common/ArcusVideoPlay'
export default {
  name: 'test',
  components: { ArcusVideoPlay },
  data () {
    return {
    }
  }
}
</script>

<style>
.vjs-menu-button-popup:hover .vjs-menu {
  display: block;
}
:focus{outline:0;}
.vjs-custom-skin > .video-js .vjs-big-play-button {
  font-size: 1.5em;
}
</style>
