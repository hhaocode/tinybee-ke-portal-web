<template>
  <div class="module-title-wrapper">
    <div class="module-title">
      <div class="title-wrapper">
        <h2 class="title">{{title}}</h2>
        <span class="sub-title">{{subTitle}}</span>
      </div>
      <div class="more-wrapper" v-if="moreUrl">
        <a :href="moreUrl" class="theme">
          <span>更多</span>
          <i class="fa fa-angle-right"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArcusModuleTitle',
  props: ['title', 'subTitle', 'moreUrl']
}
</script>

<style lang="scss" scoped>
.module-title-wrapper {
  padding: 30px 0 10px;
  .module-title {
    display: flex;
    justify-content: space-between;
    .title-wrapper {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .title {
        font-size: 24px;
        font-weight: 500;
        margin: 0;
        margin-right: 14px;
      }
      .sub-title {
        font-size: 14px;
        color: #666;
      }
    }
    .more-wrapper {
      color: #666;
    }
  }
}
</style>
