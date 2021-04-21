<template>
  <div class="login-area-wrapper" >
    <ul class="login-area" :class="themeColor">
      <!-- <li>
        <a href="/manage">我的网校</a>
      </li> -->
      <!-- <li>
        <router-link to="">机构入驻</router-link>
      </li> -->
      <li>
        <router-link to="/u/study-info">我的学习</router-link>
      </li>
      <li>
        <a href="">
          <i class="el-icon-bell"></i>
        </a>
      </li>
      <li>
        <a href="">
          <i :class="cartNum > 0 ? 'el-icon-shopping-cart-full' : 'el-icon-shopping-cart-2'"></i>
        </a>
      </li>

      <li>
        <i class="el-icon-minus rotate-90"></i>
      </li>
      <li v-if="user" class="user-area-wrapper">
        <a href="/u" class="header-avator-wrapper">
          <img class="header-avator" :src="user.member && user.member.avatar ? user.member.avatar : require('@/assets/images/common/icon-gray-bg1.png')"/>
        </a>
        <div class="user-area-box">
          <div class="user-area-box-header">
            <!-- https://img4.mukewang.com/545865890001495702200220-100-100.jpg -->
            <img class="user-area-box-header-avator" :src="user.member && user.member.avatar ? user.member.avatar : require('@/assets/images/common/icon-gray-bg1.png')" alt=""><span>{{user.nickname || user.username}}</span>
          </div>
          <div class="user-options">
            <div><a href="/u/orders">我的订单</a></div>
            <div><a href="/u/study-info">我的课程</a></div>
            <div><a href="/u/personal-info">个人资料</a></div>
            <div><a href="/u/faq">常见问题</a></div>
            <div><a href="javascript:;" @click="handleLogout">注销</a></div>
          </div>
        </div>
      </li>
      <li v-else class="auth-btn-group">
        <a :href="`/auth/login?redirect=${$route.path}`">登录</a> / <a href="/auth/register">注册</a>
      </li>
    </ul>
    <ArcusAuth v-if="authing"></ArcusAuth>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArcusAuth from '@/components/common/ArcusAuth'
export default {
  name: 'ArcusHeaderLoginArea',
  components: { ArcusAuth },
  props: {
    themeColor: {
      default: 'blank'
    }
  },
  computed: {
    ...mapState({
      user: state => state.app.user,
      authing: state => state.app.authing
    })
  },
  data () {
    return {
      cartNum: 0
    }
  },
  methods: {
    handleAuth () {
      this.$store.dispatch('app/authing', true)
    },
    handleLogout () {
      this.$store.dispatch('app/logout').then(res => {
        setTimeout(() => {
          this.$router.replace({ path: '/' }).catch(e => {})
        }, 500)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
.login-area-wrapper {}
.login-area {
  a:hover {
    color: $mainColor !important;
  }
  &.blank{
    a {
      color: #000000;
    }
  }
  &.white {
    a {
      color: #ffffff;
    }
  }
  .rotate-90 {
    transform: rotate(90deg);
  }
  li {
    display: inline-block;
    > a {
      display: block;
      padding: 14px 12px;
    }
    &.auth-btn-group > a {
      font-size: 12px;
      display: inline-block;
      padding: 12px 4px;
    }
    &.user-area-wrapper {
      .header-avator-wrapper {
        vertical-align: middle;
        .header-avator {
          border-radius: 50%;
          // border: 1px solid #CCC;
          width: 32px;
          height: 32px;
          border-color: #4d5559;
          vertical-align: middle;
          margin-top: -6px;
          border-radius: 16px;
        }
      }
      position: relative;
      &:hover {
        .user-area-box {
          display: block;
        }
      }
      .user-area-box {
        color: #424e67;
        z-index: 2;
        &::before {
          display: inline-block;
          content: "";
          border: 10px solid transparent;
          position: absolute;
          right: 16px;
          top: -20px;
          border-bottom-color: $mainColor;
        }
        display: none;
        position: absolute;
        top: calc(100% - 2px);
        right: 0;
        width: 260px;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.2);;
        .user-area-box-header {
          border-radius: 5px 5px 0 0;
          height: 90px;
          // background-color: $mainColor;
          background: linear-gradient($mainColor, #FFFFFF);
          display: flex;
          align-items: center;
          padding: 0 20px;
          .user-area-box-header-avator {
            height: 50px;
            width: 50px;
            border-radius: 50%;
          }
        }
        .user-options {
          a {
            font-size: 12px;
            display: block;
            height: 40px;
            line-height: 40px;
            color: #424e67;
            padding: 0 20px;
            &:hover {
              background-color: #F0F8FD;
            }
            &:last-child {
              border-radius: 0 0 5px 5px;
            }
          }
        }
      }
    }
  }
}
</style>
