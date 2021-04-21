import Pager from './pager.vue'
import './style.scss'
export default {
  name: 'Pagination',

  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: Number,
    pageCount: Number,
    pagerCount: {
      type: Number,
      validator (value) {
        return (value | 0) === value && value > 4 && value < 22 && (value % 2) === 1
      },
      default: 7
    },
    currentPage: {
      type: Number,
      default: 1
    },
    layout: {
      default: 'prev, pager, next, total'
    }
  },

  data () {
    return {
      internalCurrentPage: 1,
      internalPageSize: 0,
      lastEmittedPage: -1,
      userChangePageSize: false
    }
  },

  render (h) {
    // const layout = this.layout
    // if (!layout) return null
    // if (this.hideOnSinglePage && (!this.internalPageCount || this.internalPageCount === 1)) return null
    const template = <div class={['customer-pagination', {
    }] }></div>
    const TEMPLATE_MAP = {
      total: <total></total>,
      first: <first></first>,
      prev: <prev></prev>,
      pager: <pager currentPage={ this.internalCurrentPage } pageCount={ this.internalPageCount } pagerCount={ this.pagerCount } on-change={ this.handleCurrentChange }></pager>,
      // currentPage={ this.internalCurrentPage }
      // pageCount={ this.internalPageCount }
      // pagerCount={ this.pagerCount }
      // on-change={ this.handleCurrentChange }
      next: <next></next>,
      // slot: <slot>{ this.$slots.default ? this.$slots.default : '' }</slot>,
      // total: <total></total>
      trailer: <trailer></trailer>
    }
    template.children = template.children || []
    template.children.push(TEMPLATE_MAP.total)
    template.children.push(TEMPLATE_MAP.first)
    template.children.push(TEMPLATE_MAP.prev)
    template.children.push(TEMPLATE_MAP.pager)
    template.children.push(TEMPLATE_MAP.next)
    template.children.push(TEMPLATE_MAP.trailer)
    return template
  },

  components: {
    Total: {
      render (h) {
        return <span class="__total">共{this.$parent.total}条</span>
      }
    },
    First: {
      render (h) {
        return (
          <button
            type="button"
            class="btn-prev"
            disabled={ this.$parent.internalCurrentPage === 1 }
            on-click={ this.$parent.first }>
            {
              <span>首页</span>
            }
          </button>
        )
      }
    },
    Trailer: {
      render (h) {
        return (
          <button
            type="button"
            class="btn-prev"
            disabled={ this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={ this.$parent.tail }>
            {
              <span>尾页</span>
            }
          </button>
        )
      }
    },
    Prev: {
      render (h) {
        return (
          <button
            type="button"
            class="btn-prev"
            disabled={ this.$parent.internalCurrentPage <= 1 }
            on-click={ this.$parent.prev }>
            {
              this.$parent.prevText
                ? <span>{ this.$parent.prevText }</span>
                : <i class="fa fa-angle-left"></i>
            }
          </button>
        )
      }
    },

    Next: {
      render (h) {
        return (
          <button
            type="button"
            class="btn-next"
            disabled={ this.$parent.internalCurrentPage === this.$parent.internalPageCount || this.$parent.internalPageCount === 0 }
            on-click={ this.$parent.next }>
            {
              this.$parent.nextText
                ? <span>{ this.$parent.nextText }</span>
                : <i class="fa fa-angle-right"></i>
            }
          </button>
        )
      }
    },
    Pager
  },

  methods: {
    handleCurrentChange (val) {
      this.internalCurrentPage = this.getValidCurrentPage(val)
      this.userChangePageSize = true
      this.emitChange()
    },
    getValidCurrentPage (value) {
      // 解析
      value = parseInt(value, 10)

      const havePageCount = typeof this.internalPageCount === 'number'

      let resetValue
      if (!havePageCount) {
        if (isNaN(value) || value < 1) resetValue = 1
      } else {
        if (value < 1) {
          resetValue = 1
        } else if (value > this.internalPageCount) {
          resetValue = this.internalPageCount
        }
      }

      if (resetValue === undefined && isNaN(value)) {
        resetValue = 1
      } else if (resetValue === 0) {
        resetValue = 1
      }

      return resetValue === undefined ? value : resetValue
    },
    emitChange () {
      this.$nextTick(() => {
        if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
          this.$emit('current-change', this.internalCurrentPage)
          this.lastEmittedPage = this.internalCurrentPage
          this.userChangePageSize = false
        }
      })
    },
    first () {
      this.internalCurrentPage = 1
      this.emitChange()
    },
    tail () {
      this.internalCurrentPage = this.internalPageCount
      this.emitChange()
    },
    prev () {
      const newVal = this.internalCurrentPage - 1
      this.internalCurrentPage = this.getValidCurrentPage(newVal)
      // this.$emit('prev-click', this.internalCurrentPage)
      this.emitChange()
    },

    next () {
      if (this.disabled) return
      const newVal = this.internalCurrentPage + 1
      this.internalCurrentPage = this.getValidCurrentPage(newVal)
      // this.$emit('next-click', this.internalCurrentPage);
      this.emitChange()
    }
  },

  computed: {
    internalPageCount () {
      let res = null
      if (typeof this.total === 'number') {
        res = Math.max(1, Math.ceil(this.total / this.internalPageSize))
      } else if (typeof this.pageCount === 'number') {
        res = Math.max(1, this.pageCount)
      }
      return res
    }
  },

  watch: {
    pageSize: {
      immediate: true,
      handler (val) {
        this.internalPageSize = isNaN(val) ? 10 : val
      }
    }
  }
}
