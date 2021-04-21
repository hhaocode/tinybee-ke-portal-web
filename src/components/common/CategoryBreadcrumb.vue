<template>
  <div class="categor-breadcrumb-wrapper">
    <div class="categor-breadcrumb">
      <span class="categor-breadcrumb-item" v-for="(category, index) in categorys" :key="index">
        <i v-if="index !== 0" class="fa fa-angle-right"></i>
        <a v-if="index !== categorys.length - 1">
          {{category.name}}
        </a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryBreadcrumb',
  props: {
    title: {},
    categorys: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.categor-breadcrumb-wrapper {
  .categor-breadcrumb {
    height: 60px;
    line-height: 60px;
    .categor-breadcrumb-item {
      a, span, i {
        &.fa-angle-right {
          font-size: 12px;
        }
        font-size: 14px;
        display: inline-block;
        margin: auto 3px;
      }
      a:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
