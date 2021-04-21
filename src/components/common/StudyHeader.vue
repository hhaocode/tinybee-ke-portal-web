<template>
  <div class="study-header-wrapper">
    <div class="study-header">
      <div class="flex">
        <div class="back">
          <!-- <i class="el-icon-back"></i> -->
          <!-- <i class="fa fa-arrow-left" aria-hidden="true"></i>返回 -->
          <router-link to="/course/list">所有课程</router-link>
        </div>
        <!-- <div>收藏</div>
        <div>分享</div> -->
        <div class="title-wrapper">
          <div>{{title}}</div>
        </div>
      </div>
      <div>
        <ArcusHeaderLoginArea></ArcusHeaderLoginArea>
      </div>
    </div>
  </div>
</template>

<script>
import ArcusHeaderLoginArea from './ArcusHeaderLoginArea'
export default {
  name: 'StudyHeader',
  props: {
    title: {
      type: [Number, String],
      default: ''
    }
  },
  components: {
    ArcusHeaderLoginArea
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.study-header-wrapper {
  .study-header {
    display: flex;
    height: 60px;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    padding: 0 40px;
    align-items: center;
    .back {
      cursor: pointer;
      &:hover {
        color: $mainColor;
      }
    }
    .title-wrapper {
      font-size: 16px;
      font-weight: bold;
      padding-left: 20px;
    }
  }
}
</style>
