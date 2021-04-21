<template>
  <div>
    <div :model="form" ref="form" :rules="rules" class="form">
        <div required prop="mobile" class="form-item">
          <input type="text" v-model="form.mobile" placeholder="输入手机号" autocomplete="off">
        </div>
        <div required prop="authCode" class="form-item">
          <input type="text" v-model="form.authCode" maxlength="4" minlength="4" placeholder="输入验证码" style="width:168px; margin-right:10px;" autocomplete="off">
          <button class="register-btn" :disabled="authCodeBtnDisabled" @click="sendAuthMessage" style="width:112px;">{{authCodeMessage}}</button>
        </div>
        <div required prop="password" class="form-item">
          <input v-model="form.password" type="password" show-password placeholder="密码" autocomplete="off">
        </div>
        <div style="font-size:10px; color:red;">
          {{errorMessage}}
        </div>
        <div class="form-item">
          <button class="register-btn" @click="register" type="primary" style="width:100%;">登录</button>
        </div>
      </div>
  </div>
</template>

<script>
const initAuthCodeMessage = '发送验证码'
const mobileRes = /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/

export default {
  name: 'register',
  methods: {
    sendAuthMessage () {
      // 校验手机号码
      if (!this.form.mobile) {
        this.errorMessage = '请输入手机号码'
        return
      }
      if (!mobileRes.test(this.form.mobile)) {
        this.errorMessage = '请输入正确的手机号码'
        return
      }
      this.$get(`/api/auth/send/REGISTER/MOBILE/auth-code/${this.form.mobile}`).then(res => {
        if (res.code === 0) {
          this.sendAuthMessageHandle()
        }
      })
      //
    },
    sendAuthMessageHandle () {
      this.authCodeBtnDisabled = true
      let duration = 60
      const _this = this
      let interval = null
      const setIntervalFun = () => {
        _this.authCodeMessage = `${duration}秒重发`
        if (duration === 0) {
          _this.authCodeMessage = initAuthCodeMessage
          clearInterval(interval)
          interval = null
          this.authCodeBtnDisabled = false
        }
        --duration
      }
      setIntervalFun()
      interval = setInterval(setIntervalFun, 1000)
    },
    register () {
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //   }
      // })
      if (!this.form.mobile || !this.form.authCode || !this.form.password) {
        this.errorMessage = '请补全信息'
        return
      }
      this.$store.dispatch('app/register', this.form).then(res => {
        if (res.code === 0) {
          // 注册成功 ，去登陆 redirect
          this.$router.replace({ name: 'Login' })
        } else {
          this.errorMessage = res.message
        }
      })
    }
  },
  data () {
    return {
      authCodeMessage: initAuthCodeMessage,
      authCodeBtnDisabled: false,
      form: {
        mobile: '',
        authCode: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '手机号码不能为空' }
        ],
        authCode: [
          { required: true, message: '验证码不能为空' }
        ],
        password: [
          { required: true, message: '密码不能为空' }
        ]
      },
      errorMessage: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.register-btn {
  height: 40px;
  line-height: 40px;
}
</style>
