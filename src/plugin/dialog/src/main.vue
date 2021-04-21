<template>
  <div class="dialog-wrapper-mask" v-if="visiable" style="z-index: 999999">
    <div class="dialog" :style="{width: width}">
      <div class="dialog-header">
        <slot name="header">
          <div class="dialog-header-origin">
            {{title}}
          </div>
        </slot>
        <i v-if="closable" class=" dialog-close">×</i>
      </div>
      <div class="dialog-body">
        <slot>
        </slot>
      </div>
      <div class="dialog-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TDialog',
  props: {
    visiable: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: '提示'
    },
    closable: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.dialog-wrapper-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(red, green, blue, alpha); */
  overflow: auto;
  margin: 0;
  background: rgba(0, 0, 0, .3);
  .dialog {
    position: relative;
    margin: 0 auto 50px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 50%;
    margin-top: 15vh;
    .dialog-header {
      position: relative;
      .dialog-header-origin {
        padding: 0 15px;
        height: 56px;
        line-height: 56px;
      }
      .dialog-close {
        display: inline-block;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        font-size: 20px;
        height: 20px;
        width: 20px;
        &:hover {
          color: $mainColor;
        }
      }
    }
  }
}
</style>
