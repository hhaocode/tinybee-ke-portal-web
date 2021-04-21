<template>
  <div class="index-user-area-wrapper">
    <div class="avatar-wrapper flex h-center">
      <router-link to="/u">
        <img class="avatar" :src="user && user.avatar ? user.avatar : require('@/assets/images/common/icon-gray-bg.png')"/>
      </router-link>
    </div>
    <div class="user-detail-wrapper" v-if="user">
      <div class="text-center">{{user.nickname  || user.username}}</div>
      <div class="user-property-wrapper">
        <router-link to="/u/study-info" class="property study-info">
          <i class="fa fa-bookmark"></i>
          <span>课程</span>
        </router-link>
        <router-link to="/u/orders" class="property order">
          <i class="fa fa-newspaper-o"></i>
          <span>订单</span>
        </router-link>
        <router-link to="/u/assignment" class="property assignment">
          <i class="fa fa-list-ol"></i>
          <span>作业</span>
        </router-link>
      </div>
      <div></div>
      <div>
        <router-link to="/u/study-info" class="btn-go-study-info">
          <i class="fa fa-list-alt"></i><span>我的课表</span>
        </router-link>
      </div>
    </div>
    <div class="no-login-wrapper" v-else>
      <div class="welcome-login flex h-center">
        <!-- <img class="icon-gray-bg" :src="require('@/assets/images/common/icon-gray-bg.png')" alt=""> -->
        <span>走四方，学万里</span>
      </div>
      <button class="login-btn" @click="handleGoLogin">登录</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'IndexUserAreaWrapper',
  computed: {
    ...mapState({
      user: state => state.app.user
    })
  },
  methods: {
    handleGoLogin () {
      this.$router.push({ path: '/auth/login', query: { direct: window.location.href } })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.index-user-area-wrapper {
  width: 220px;
  height: 360px;
  background: url('~@/assets/images/common/index-user-area-bg.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 8px;
  padding-top: 40px;
  color: #ffffff;
  a {
    color: #ffffff;
  }
  .avatar-wrapper {
    .avatar {
      height: 60px;
      width: 60px;
      border-radius: 50%;
    }
  }
  .no-login-wrapper {
    padding: 15px;
    .login-btn {
      height: 40px;
      line-height: 40px;
      background-color: $mainColor;
      display: inline-block;
      width: 100%;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      cursor: pointer;
    }
    .icon-gray-bg {
      height: 150px;
    }
    .welcome-login {
      font-size: 24px;
      color: #999;
      padding: 50px 0;
    }
  }
  .user-detail-wrapper {
    padding: 30px 15px 15px;
    .user-property-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 50px 0 40px;
      .property {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #f2f2f2;;
        .fa {
          margin-bottom: 6px;
        }
        &:hover {
          color: $mainColor;
        }
        // &.study-info {
        //   color:#618FFD;
        // }
        // &.order {
        //   color:#89E456;
        // }
        // &.assignment {
        //   color:#FDC74E;
        // }
      }

    }
    .btn-go-study-info {
      margin-top: 10px;
      height: 40px;
      line-height: 40px;
      background-color: #f6f6f6;
      width: 100%;
      display: inline-block;
      text-align: center;
      color: #333;
      border-radius: 6px;
      .fa {
        margin-right: 8px;
      }
      &:hover {
        color: $mainColor;
        background-color: #F8F8F8;
        font-weight: 600;
      }
    }
  }
}
</style>
