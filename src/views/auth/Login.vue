<template>
  <div>
    <div class="form">
        <div class="form-item">
          <input type="text" v-model="form.mobile" placeholder="输入手机号">
        </div>
        <div v-if="form.type === 'mobile'" class="form-item">
          <input v-text="password" v-model="form.authCode" placeholder="输入密码" style="width:168px; margin-right:10px;">
          <button type="primary" style="width:112px;">发送验证码</button>
        </div>
        <div v-if="form.type === 'password'" class="form-item">
          <input type="password" v-model="form.password" show-password>
        </div>
        <div>
          测试账号: test/11112222
        </div>
        <div class="form-item">
          <button class="login-btn" type="primary" :disabled="logining" @click="login" style="width:100%;">登录</button>
        </div>
        <div>
          <!-- <a href="javascript:;" @click="">密码登录</a> -->
        </div>
        <div>
          <div>
            <span></span>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  computed: {
    loginDisabled () {
      return !(this.form.mobile && ((this.form.type === 'password' && this.form.password) || (this.form.type === 'mobile' && this.form.authCode)))
    }
  },
  mounted () {
    // this.loginDisabled = false
  },
  methods: {
    login () {
      if (!this.form.mobile) {
        this.$message.error('手机号码不能为空')
        return
      }
      if (this.form.type === 'password' && !this.form.password) {
        this.$message.error('密码不能为空')
        return
      }
      if (this.form.type === 'mobile' && !this.form.authCode) {
        this.$message.error('验证码不能为空')
        return
      }
      this.logining = true
      this.$store.dispatch('app/login', this.form).then(res => {
        if (res.code === 0) {
          const redirect = this.$route.query.redirect
          if (redirect) {
            window.location.href = redirect
          } else {
            this.$router.replace('/')
          }
        } else {
          this.$message.error(res.message)
          this.logining = false
        }
      }).catch(e => {
        this.$message.error('网络错误')
        this.logining = false
      })
    }
  },
  data () {
    return {
      logining: false,
      form: {
        mobile: '',
        authCode: '',
        password: '',
        type: 'password'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-btn {
  height: 40px;
  line-height: 40px;
}
</style>
