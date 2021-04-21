<template>
  <div class="room">
    <header style="height: 60px; background-color:#e8e8e8;">头部</header>
    <div class="live-wrapper">
      <div class="live">
        <div style="height: 100%; width: 100%; position: relative;"><LivePlayer></LivePlayer></div>
      </div>
      <div class="info">
        <div class="info-tab">
          <div class="info-tab-item active">介绍</div>
          <div class="info-tab-item">讨论</div>
          <div class="info-tab-item">笔记</div>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import LivePlayer from '@/components/player/LivePlayer'
export default {
  name: 'LiveRoom',
  components: { LivePlayer }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.room {
  .live-wrapper {
    padding: 20px 10px 10px 5px;
    background-color: #242426;
    height: calc(100vh - 60px);
    display: flex;
    color: #ffffff;
    .live {
      display: flex;
      flex: 1;
    }
    .info {
      width: 300px;
      background-color: #1F1F1F;
      .info-tab {
        display: flex;
        // justify-content: space-around;
        // align-items: center;
        cursor: pointer;
        background-color: #000000;
        .info-tab-item {
          position: relative;
          display: flex;
          flex: 1;
          height: 40px;
          justify-content: center;
          align-items: center;
          &.active, &:hover {
            &::after {
              display: block;
            }
          }
          &::after {
            display: none;
            content: '';
            height: 2px;
            width: 30px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -15px;
            background-color: $mainColor;
          }
        }
      }
    }
  }
}
</style>
