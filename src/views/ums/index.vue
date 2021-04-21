<template>
  <div>
    <!-- <div>个人中心</div> -->
    <div class="user-center-header">
      <div class="user-intro">
        <img class="avatar" :src="require('@/assets/images/common/icon-gray-bg1.png')" alt="">
        <div>{{user.nickname || user.username}}</div>
        <div>ID: {{user.id}}</div>
      </div>
      <div>
      </div>
    </div>
    <div>
      <div class="flex user-center space-between">
        <div class="nav">
          <div class="nav-wrapper">
            <div class="nav-title">
              <h2>个人中心</h2>
              <div class="line"></div>
            </div>
            <ul class="nav-tabs">
              <li>
                <router-link class="tab-item" to="/u/study-info">我的学习</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/orders">全部订单</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/fav">收藏</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/coupon">优惠券</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/personal-info">个人资料</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/assignment">我的作业</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/evaluating">我的评测</router-link>
              </li>
              <li>
                <router-link class="tab-item" to="/u/contract">我的合同</router-link>
              </li>
              <!-- <li>
                <router-link class="tab-item" to="/u/class-teacher">班主任</router-link>
              </li> -->
              <li>
                <router-link class="tab-item" to="/u/faq">常见问题</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: state => state.app.user
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';
$cWidth: 1050px;
$navWidth: 160px;
.user-center-header {
  width: $cWidth;
  margin: auto;
  // padding: 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  .avatar {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }
  .user-intro {
    width: $navWidth;
    display: flex;
    background: #f8fafc;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
  }
}
.user-center {
  width: $cWidth;
  margin: auto;
  padding: 0 0 20px;
  .nav {
    width: $navWidth;
    .nav-wrapper {
      // background: #f8fafc;
      // padding-top: 20px;
      background: #ffffff;
    }
    .nav-title {
     h2 {
      font-size: 16px;
      line-height: 24px;
      padding: 12px 24px;
      font-weight: 700;
     }
     .line {
      height: 1px;
      background-color: #d9dde1;
      margin: 0 24px;
     }
    }
    .nav-tabs {
      list-style: none;
      // border: 1px solid #e8e8e8;
      > li {
        .tab-item {
          display: block;
          height: 50px;
          line-height: 50px;
          padding: 0 30px;
          font-size: 14px;
          position: relative;
          // text-align: center;
          &::after {
              content: '';
              position: absolute;
              left: 0;
              top: 50%;
              margin-top: -10px;
              height: 20px;
              width: 3px;
              border-radius: 0 3px 3px 0;
              background-color: transparent;
            }
          // &.active {
          //   color: $mainColor;
          //   &::after {
          //     background-color: $mainColor;
          //   }
          // }
          &:hover {
            // color: $mainColor;
            background-color: #F8F8F8;
            &::after {
              background-color: #A1A1A3;
            }
          }
          ::v-deep &.router-link-exact-active.router-link-active{
            color: $mainColor;
            font-weight: bold;
            &::after {
              background-color: $mainColor;
            }
          }
        }
      }
    }
  }
  .content {
    width: 860px;
    // border: 1px solid #e8e8e8;
    padding: 15px 0;
    background: #ffffff;
  }
}
</style>
