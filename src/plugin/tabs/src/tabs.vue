<template>
  <div class="tabs">
    <div class="tabs_header" :class="{border: border}">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="tab-item" :style="{'margin-right':gutter}" v-for="(pane, index) in panes" :key="index" :class="{active: currentName === pane.name }">
        <span @click="handleTabClick(pane, pane.name || index, $event)">{{pane.label || pane.name}}</span>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
    <div class="tabs_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import TabNav from './tab-nav'
export default {
  name: 'Tabs',
  props: {
    activeName: [String, Number],
    value: {},
    navPosition: {
      type: String,
      default: 'left'
    },
    gutter: {
      type: String,
      default: '30px'
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      rootTabs: this
    }
  },
  data () {
    return {
      currentName: this.value || this.activeName,
      panes: []
    }
  },
  computed: {
    navs: function () {
      return []
    }
  },
  watch: {
    activeName (val) {
      this.setCurrentName(val)
    },
    value (val) {
      this.setCurrentName(val)
    },
    currentName (value) {
      // if (this.$refs.nav) {
      //   this.$nextTick(() => {
      //     this.$refs.nav.$nextTick(_ => {
      //       this.$refs.nav.scrollToActiveTab()
      //     })
      //   })
      // }
      this.setCurrentName(value)
    }
  },
  methods: {
    calcPaneInstances (isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
            vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'TabPane')
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]))
        if (isForceUpdate || panesChanged) {
          this.panes = panes
        }
        // this.setCurrentName(this.currentName)
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    },
    setCurrentName (value) {
      const changeCurrentName = () => {
        this.currentName = value
        this.$emit('input', value)
      }
      // if (this.currentName != value) {

      // }
      changeCurrentName()
    },
    handleTabClick (tab, tabName, event) {
      this.setCurrentName(tabName)
      this.$emit('tab-click', tab, event)
    }
  },
  created () {
    if (!this.currentName) {
      this.setCurrentName('0')
    }
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true))
  },
  mounted () {
    this.calcPaneInstances()
  },

  updated () {
    this.calcPaneInstances()
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.tabs {
  .tabs_header {
    display: flex;
    height: 50px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 8px;
    font-size: 14px;
    &.border {
      border-bottom: 1px solid #e8e8e8;
    }
    &.center {
      justify-content: center;
    }
    &.right {
      justify-content: flex-end;
    }
    &.space {
      justify-content: space-between;
    }
    .tab-item {
      height: 100%;
      // padding: 0 20px;
      display: inline-flex;
      align-items: center;
      span {
        cursor: pointer;
        padding: 10px 15px;
        position: relative;
        &:hover {
          color: $mainColor;
        }
      }
      &.active {
        color: $mainColor;
        span::after {
          content: '';
          position: absolute;
          display: block;
          height: 4px;
          width: 20px;
          background-color: $mainColor;
          bottom: -7px;
          left: 50%;
          margin-left: -10px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
