<template>
  <div :class="['search-container', 'defult']">
    <div class="search-wrapper">
      <input type="text" class="search-input" :class="{'dropdowned': searchDropdown}" @focus="focused = true" @blur="focused = false" size="large" ref="searchInput">
      <button class="search-btn fa fa-search"></button>
      <transition name="fade-in-linear">
        <div v-show="searchDropdown" class="search-dropdown" @mouseover="hovered = true" @mouseout="hovered = false">
          <div class="search-dropdown-container light" :class="theme">
            <div class="hot-search">
              <div>
                <h2>热搜</h2>
              </div>
              <div class="host-search-container">
                <span @click="handleSearch(item)" v-for="(item, idx) in hotSearchs" :key="idx">{{item}}</span>
              </div>
            </div>
            <div v-if="histories && histories.length">
              <div class="line"></div>
              <div  class="search-history">
                <div class="flex space-between v-center">
                  <h2>最近搜索</h2>
                  <button class="clean-search-history-btn" @click="clearSearchHistory">清空</button>
                </div>
                <ul>
                  <li @click="handleSearch(item)" v-for="(item, index) in histories" :key="index">
                    <span>{{item}}</span><i class="fa fa-close"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import { getStyle } from '@/utils/dom'
import { removeItem } from '@/utils/storage'
const classOption = {}
export default {
  name: 'ArcusSearch',
  props: {
    type: {
      type: String,
      default: () => {
        return 'defult'
      }
    },
    theme: {
      type: String,
      default: 'light'
    }
  },
  data () {
    return {
      classOption: classOption,
      domain: '1',
      kw: '',
      focused: false,
      hovered: false,
      histories: ['vue', 'react', 'spring'],
      hotSearchs: ['vue', 'react', 'spring']
    }
  },
  computed: {
    searchDropdown () {
      return this.focused || this.hovered
      // return true
    }
  },
  // mounted: {
  // },
  methods: {
    handleFocus () {
      this.searchDropdown = true
      // const inputWidth = getStyle(this.$refs.searchInput.$el).width
      // console.log(inputWidth)
    },
    handleSearch (q) {
      this.$router.push({ path: '/search', query: { q } })
    },
    clearSearchHistory () {
      removeItem()
    }
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #1DD39A;
.search-wrapper {
  position: relative;
  .search-btn {
    font-size: 16px;
    color: #E8e8e8;
    position: absolute;
    right: 10px;
    top: 50%;
    background: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    &:hover {
      color: $mainColor;
    }
  }
  .search-input {
    padding-right: 40px;
    &.dropdowned {
      border: 1px solid $mainColor;
      +.search-btn {
        color: $mainColor;
      }
    }
  }
}
.search-dropdown {
  position: absolute;
  top: 100%;
  z-index: 20;
  width: 100%;
  padding-top: 10px;
  .search-dropdown-container {
    // min-width: 260px;
    // min-height: 120px;
    border-radius: 0 0 6px 6px;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.15);
    background: #ffffff;
    color: #333;
    &.light {
      background: #ffffff;
      color: #333;
    }
    &.dark {
      background: #333;
      color: #F2F2F2;
    }
    h2 {
      font-weight: 600;
      padding: 8px 0;
      margin: 0;
      font-size: 14px;
      margin-left: 15px;
    }
    .clean-search-history-btn {
      // height: 14px;
      // line-height: 14px;
      border-radius: 7px;
      font-size: 9px;
      padding: 2px 4px;
      margin-right: 15px;
      color: #777;
      &:hover {
        color: #333;
      }
    }
  }
  .hot-search {
    .host-search-container {
      padding: 15px;
      font-size: 14px;
      span {
        display: inline-block;
        padding: 5px 6px;
        background-color: #F7F7F7;
        margin: 0 10px 10px;
        border-radius: 6px;
        cursor: pointer;
        color: #333;
        &:hover {
          color: $mainColor;
          background-color: #e8e8e8;
        }
      }
    }
  }
  .line {
    height: 1px;
    margin: 10px 15px;
    background: #e8e8e8;
  }
  .search-history {
    font-size: 0;
    li {
      height: 34px;
      line-height: 34px;
      padding: 0 15px;
      font-size: 14px;
      cursor: pointer;
      position: relative;
      &:hover {
        background: #F7F7F7;
        color: $mainColor;
        .fa-close {
          color: #777;
        }
      }
      &:last-child {
        border-radius: 0 0 6px 6px;
      }
      .fa-close {
        position: absolute;
        right: 15px;
        color: #e8e8e8;
        top: 50%;
        transform: translateY(-50%);
        &:hover {
          color: $mainColor;
        }
      }
    }
  }
}
</style>
