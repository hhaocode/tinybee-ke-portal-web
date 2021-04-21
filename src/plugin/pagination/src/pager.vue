<template>
  <ul @click="onPagerClick" class="pager">
    <!-- 第一页 -->
    <li
      :class="{ active: currentPage === 1}"
      v-if="pageCount > 0"
      class="number">1</li>
      <!-- 前部更多 -->
    <li
      class="fa more btn-quickprev"
      :class="[quickprevIconClass]"
      v-if="showPrevMore"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'fa-ellipsis-h'">
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager }"
      class="number">{{ pager }}</li>
      <!-- 后部更多 -->
    <li
      class="fa more btn-quicknext"
      :class="[quicknextIconClass]"
      v-if="showNextMore"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'fa-ellipsis-h'">
    </li>
    <!-- 总页数 -->
    <li
      :class="{ active: currentPage === pageCount }"
      class="number"
      v-if="pageCount > 1">{{ pageCount }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    // 当前页码
    currentPage: Number,
    // 总页数
    pageCount: Number,
    //
    pagerCount: Number
  },

  watch: {
    showPrevMore (val) {
      if (!val) this.quickprevIconClass = 'fa-ellipsis-h'
    },

    showNextMore (val) {
      if (!val) this.quicknextIconClass = 'fa-ellipsis-h'
    }
  },

  methods: {
    onPagerClick (event) {
      const target = event.target
      if (target.tagName === 'UL' || this.disabled) {
        return
      }

      let newPage = Number(event.target.textContent)
      const pageCount = this.pageCount
      const currentPage = this.currentPage
      const pagerCountOffset = this.pagerCount - 2

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset
        }
      }

      /* istanbul ignore if */
      if (!isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1
        }

        if (newPage > pageCount) {
          newPage = pageCount
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage)
      }
    },

    onMouseenter (direction) {
      if (this.disabled) return
      if (direction === 'left') {
        this.quickprevIconClass = 'fa-angle-double-left'
      } else {
        this.quicknextIconClass = 'fa-angle-double-right'
      }
    }
  },
  computed: {
    pagers () {
      const pagerCount = this.pagerCount
      const halfPagerCount = (pagerCount - 1) / 2
      const currentPage = Number(this.currentPage)
      const pageCount = Number(this.pageCount)
      let showPrevMore = false
      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - halfPagerCount) {
          showPrevMore = true
        }
        if (currentPage < pageCount - halfPagerCount) {
          showNextMore = true
        }
      }
      const array = []
      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showPrevMore = showPrevMore
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.showNextMore = showNextMore
      return array
    }
  },

  data () {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'fa-ellipsis-h',
      quickprevIconClass: 'fa-ellipsis-h'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
