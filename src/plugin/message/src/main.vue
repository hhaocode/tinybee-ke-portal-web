<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div class="message____wrapper"
      v-show="visible"
    >
      <i class="icon" :class="typeClass"></i>
      <slot>
        <p>{{message}}</p>
      </slot>
      <i v-if="showClose"></i>
    </div>

  </transition>
</template>

<script>
const typeIconMap = {}
export default {
  data () {
    return {
      visible: false,
      message: '',
      showClose: false,
      duration: 3000,
      timer: null,
      closed: false,
      type: 'info',
      onClose: null
    }
  },
  computed: {
    typeClass () {
      return this.type && !this.iconClass
        ? `message__icon icon-${typeIconMap[this.type]}`
        : ''
    }
  },
  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  methods: {
    handleAfterLeave () {
      // this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close () {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },
    clearTimer () {
      clearTimeout(this.timer)
    },
    startTimer () {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    }
  },
  mounted () {
    this.startTimer()
  }
}
</script>

<style scoped>
.message____wrapper {
  min-width: 200px;
  box-sizing: border-box;
  position: fixed;
  left: 50%;
  top: 20px;
  z-index: 99999;
  transform: translateX(-50%);
  transition: opacity 0.3s, transform .4s, top 0.4s;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  color: #FF0000;
}
.message-fade-enter,
.message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
