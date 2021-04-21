<template>
  <div>
    <!-- <el-tabs v-model="active">
      <el-tab-pane label="个人信息">个人信息</el-tab-pane>
      <el-tab-pane label="修改密码">修改密码</el-tab-pane>
      <el-tab-pane label="修改邮箱">修改邮箱</el-tab-pane>
      <el-tab-pane label="修改手机">修改手机</el-tab-pane>
      <el-tab-pane label="切换账号">切换账号</el-tab-pane>
      <el-tab-pane label="注册账号">注册账号</el-tab-pane>
    </el-tabs> -->
    <div>
      <tabs :activeName="activeName" border>
        <tab-pane name="info" label="个人信息">
          <div class="container-padding-20">
            <div class="form">
              <!--  -->
              <div class="form-item">
                <div class="label">账号：</div>
                <div class="content">
                  <div>{{user.username}}</div>
                  <div><button @click="goModifyPwd">修改密码</button></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label"><i class="required">*</i>昵称：</div>
                <div class="content">
                  <div style="width: 400px;"><input type="text" v-model="user.nickname" name="" id=""></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">头像：</div>
                <div class="content">
                  <div><img style="width: 100px; height: 100px;" :src="require('@/assets/images/common/icon-gray-bg1.png')" alt="" srcset=""></div>
                  <div style="padding-left: 10px;">
                    <div style="padding-bottom: 10px;">支持jpg、gif、png或bmp格式的图片，小于5M</div>
                    <div class="file-upload-btn">
                      修改图片<input type="file" accept="image/gif, image/jpeg, image/jpg, image/png, image/bmp" name="" id="">
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">性别：</div>
                <div class="content">
                  <!-- Example ofdot-circle-o -->
                  <div>
                    <span class="radio" :class="{checked: user.gender === 1}" @click="chooseGender(1)">
                      <span class="radio-dot"></span>男
                    </span>
                    <!-- <span class="radio">
                      <label for="radio">
                        <input type="radio" class="radio-dot" :value="1" name="" id="male">男
                      </label>
                    </span> -->
                    <span class="radio" :class="{checked: user.gender === 2}" @click="chooseGender(2)">
                      <span class="radio-dot"></span>女
                    </span>
                    <span class="radio" :class="{checked: user.gender === 0}" @click="chooseGender(0)">
                      <span class="radio-dot"></span>保密
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">常用邮箱：</div>
                <div class="content">
                  <div>{{user.email}}</div>
                  <div>
                    <button @click="goModifyEmail">修改邮箱</button>
                  </div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">手机号码：</div>
                <div class="content">
                  <div>{{user.mobile}}</div>
                  <div><button @click="goModifyMobile">修改手机</button></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">个性签名：</div>
                <div class="content">
                  <div>
                    <textarea maxlength="50" placeholder="填写签名，50个字内"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
        <tab-pane name="modifyPwd" label="修改密码">
          <div class="container-padding-20">
            <div class="form">
              <div class="form-item">
                <div class="label">旧密码：</div>
                <div class="content">
                  <div style="width: 400px;"><input type="password" v-model="pwd.oldPwd"  autocomplete="off"></div><div><router-link to="/resetPwd">忘记密码？</router-link></div>
                </div>
              </div>
              <!-- <div class="form-item">
                <div class="label"></div>
                <div class="content">
                 <a>忘记密码？</a>
                </div>
              </div> -->
              <div class="form-item">
                <div class="label">新密码：</div>
                <div class="content">
                  <div style="width: 400px;"><input type="password" v-model="pwd.newPwd" autocomplete="off"></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">确认密码：</div>
                <div class="content">
                  <div style="width: 400px;"><input type="password" v-model="pwd.confirmPwd"  autocomplete="off"></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label"></div>
                <div class="content">
                  <button class="submit">确认</button>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
        <tab-pane name="modifyEmail" label="修改邮箱">
          <div class="container-padding-20">
            <div class="form">
              <div class="form-item">
                <div class="label">新邮箱</div>
                <div class="content">
                  <div style="width: 400px;"><input type="email" v-model="user.email" autocomplete="off"></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label"></div>
                <div class="content">
                  <button class="submit">发送验证邮件</button>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
        <tab-pane name="modifyMobile" label="修改手机">
          <div class="container-padding-20">
            <div class="form">
              <div class="form-item">
                <div class="label">手机号: </div>
                <div class="content">
                  <div style="width: 400px;"><input type="text" v-model="mobile.mobile" autocomplete="off"></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">图形验证码: </div>
                <div class="content">
                  <div style="width: 400px;"><input type="text" v-model="mobile.imageCode" autocomplete="off"></div><div>图形验证码</div>
                </div>
              </div>
              <div class="form-item">
                <div class="label">短信验证码: </div>
                <div class="content">
                  <div style="width: 400px;"><input type="text" v-model="mobile.mobileCode" autocomplete="off"></div><div><button>发送短信验证码</button></div>
                </div>
              </div>
              <div class="form-item">
                <div class="label"></div>
                <div class="content">
                  <button class="submit">发送验证邮件</button>
                </div>
              </div>
            </div>
          </div>
        </tab-pane>
        <tab-pane name="account" label="账号管理">
          <div class="container-padding-20">账号管理</div>
        </tab-pane>
      </tabs>
    </div>
  </div>
</template>

<script>
const initPwd = { oldPwd: '', newPwd: '', confirmPwd: '' }
const initMobile = { mobile: '', imageCode: '', imageCodeToken: '', mobileCode: '' }
export default {
  components: { },
  name: 'PersonalInfo',
  data () {
    return {
      active: 0,
      user: {
        email: ''
      },
      activeName: 'info',
      pwd: Object.assign({}, initPwd),
      mobile: Object.assign({}, initMobile)
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    goModifyEmail () {
      this.activeName = 'modifyEmail'
    },
    goModifyMobile () {
      this.activeName = 'modifyMobile'
    },
    goModifyPwd () {
      this.activeName = 'modifyPwd'
    },
    initData () {
      this.$get('/api/ums/user/get').then(res => {
        if (res.code === 0) {
          this.user = res.data
        }
      })
    },
    chooseGender (val) {
      this.user.gender = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
.form {
  font-size: 14px;
  .form-item {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    .label {
      display: flex;
      width: 120px;
      padding-right: 20px;
      flex-direction: row;
      justify-content: flex-end;
      height: 34px;
      align-items: center;
      i {
        color: #FF3300;
        margin-right: 6px;
      }
    }
    .content {
      display: flex;
      flex-direction: row;
      flex: 1;
      align-items: center;
    }
  }
}
button {
  // height: 12px;
  // line-height: 12px;
  font-size: 10px;
  padding: 2px 5px;
  border: 1px solid $mainColor;
  margin-left: 20px;
  border-radius: 15px;
  color: #f5f5f5;
  // background: #fff;
  background: $mainColor;
  &:hover {
    color: #ffffff;
  }
  &.submit {
    // padding: 6px 10px;
    min-width: 100px;
    margin-left: 0;
    height: 40px;
    line-height: 40px;
    border-radius: 4px;
  }
  &.left {
    margin-left: 0;
  }
}
textarea {
  resize: none;
  padding: 8px;
  width: 500px;
  height: 100px;
  border: 1px solid #e4e5e8;
  color: #555;
  overflow: hidden;
  border-radius: 6px;
  font-size: 12px;
  &:focus {
    border-color: $mainColor;
  }
}
.radio {
  margin: auto 20px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  .radio-dot {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #c7c7c7;
    margin-right: 4px;
    border-radius: 50%;
  }
  &.checked {
    border-color: $mainColor;
    .radio-dot {
      position: relative;
      border-color: $mainColor;
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        height: 8px;
        width: 8px;
        background-color: $mainColor;
        top: 50%;
        left: 50%;
        margin-top: -4px;
        margin-left: -4px;
        // transform: translateX(-50%) translateX(-50%);
        border-radius: 50%;
      }
    }
  }
}
</style>
