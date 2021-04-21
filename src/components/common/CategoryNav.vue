<template>
  <div class="category-nav-wrapper">
    <div :class="['category-nav', {'breadcrumb' : breadcrumb}] ">
      <span v-for="(category, index) in categorys" :key="index">
        <i v-if="breadcrumb && index !== 0" class="fa fa-angle-right"></i>
        <a :data-id="category.id" @click="handleClick(category, breadcrumb && index === categorys.length - 1)"
        :class="{'last-breadcrumb': breadcrumb && index === categorys.length - 1, 'nav-all': category.id == 'all', 'active': category.id == selected}">{{category.name}}</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryNav',
  props: {
    categorys: {
      type: Array,
      default: () => []
    },
    selected: {
    },
    fontSize: {
      type: Number,
      default: () => 14
    },
    active: {
      default: () => ''
    },
    activeStyle: {
      default: () => {
        return {
          color: ''
        }
      }
    },
    breadcrumb: {
    }
  },
  methods: {
    handleClick (category, isLastBreadcrumb) {
      if (category.id === 'all' || isLastBreadcrumb) {
        return
      }
      this.$emit('click', category)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.category-nav-wrapper {
  font-size: 14px;
  .category-nav {
    a, i {
      &.fa-angle-right {
        font-size: 12px;
      }
      display: inline-block;
      // color: #55595c;
    }
    a {
      padding: 2px 10px;
      margin: 0;
      cursor: pointer;
      margin: 16px 4px;
      // margin: 10px 2px;
      border: 1px solid transparent;
      &.last-breadcrumb {
        cursor: inherit;
        color: inherit;
      }
      &.last-breadcrumb:hover, &.nav-all:hover {
        cursor: inherit;
        color: inherit;
      }
      &.nav-all {
        font-weight: 600;
      }
      &.active {
        border: 1px solid $mainColor;
        color: $mainColor;
        border-radius: 10px;
      }
      &:hover {
        color: $mainColor
      }
    }
    &.breadcrumb {
      margin-left: 3px;
      a {
        padding: 2px 6px;
        // margin: 12px 0;
        // padding: 2px 8px;
        &.active {
          border: none;
        }
        // &:hover {
        //   color: $mainColor
        // }
      }
    }
  }
}
</style>
