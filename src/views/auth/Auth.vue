<template>
  <div class="auth">
      <div>
        <div class="auth-logo-wrapper">
          <a class="auth-logo" href="/"></a>
        </div>
      </div>
      <div class="auth-wrapper">
        <div class="auth-header">
          <router-link class="auth-nav-item" :to="{ name: 'Login', query: $route.query}">登录</router-link>
          <router-link class="auth-nav-item" :to="{ name: 'Register', query: $route.query}">注册</router-link>
        </div>
        <router-view ></router-view>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  computed: {
    ...mapState({
      user: state => state.app.user
    })
  },
  mounted () {
    if (this.user) {
      // 表示已经登录
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.auth {
  background-color: #efefef;
  height: 100%;
  position: fixed;
  width: 100%;
  overflow: auto;
  background: url('~@/assets/images/auth-bg.png') center center;
}
.auth-logo-wrapper {
  width: 460px;
  margin: auto;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-logo {
  display: block;
  width: 131px;
  height: 51px;
  background-image: url('~@/assets/index-logo.png');
}
.auth-wrapper {
  background-color: #ffffff;
  border-radius: 5px;
  width: 360px;
  margin: auto;
  position: relative;
  padding: 25px 35px;
  .auth-header {
    padding: 0 0 30px;
    >.auth-nav-item {
      display: inline-block;
      padding: 8px 8px;
      margin-right: 12px;
      position: relative;
      &.router-link-exact-active.router-link-active {
        color: $mainColor;
        &::after {
          content: "";
          display: block;
          height: 3px;
          width: 20px;
          background-color: $mainColor;
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -10px;
        }
      }
    }
  }
}
</style>
