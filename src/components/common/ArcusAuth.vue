<template>
  <div class="arcus-auth-wapper">
    <div class="arcus-auth-box">
      252152142
      <div>
        <iframe src="/auth" frameborder="0"></iframe>
      </div>
    </div>
    <div class="arcus-auth-mask"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.arcus-auth-wapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  .arcus-auth-mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
  }
  .arcus-auth-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 2;
  }
}
</style>
