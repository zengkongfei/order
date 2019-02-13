<template>
  <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
    <el-form-item prop="username">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.username" auto-complete="off" placeholder="请输入手机号码">
        <i slot="prefix" class="icon-shouji"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="verificationCode">
      <el-input size="small" @keyup.enter.native="handleLogin" v-model="loginForm.verificationCode" auto-complete="off" placeholder="请输入验证码">
        <i slot="prefix" class="icon-yanzhengma yanzhengma" style=""></i>
        <template slot="append">
          <span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click.native.prevent="handleLogin" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  const MSGINIT = '发送验证码'
  // const MSGERROR = '验证码发送失败'
  const MSGSCUCCESS = '${time}秒后重发'
  const MSGTIME = 60
  import { isvalidatemobile } from '@/utils/validate'
  import { sendSms } from '../../api/basic'
  export default {
    name: 'codelogin',
    data() {
      const validatePhone = (rule, value, callback) => {
        if (isvalidatemobile(value)[0]) {
          callback(new Error(isvalidatemobile(value)[1]))
        } else {
          callback()
        }
      }
      const validateCode = (rule, value, callback) => {
        if (value.length !== 6) {
          callback(new Error('请输入6位数的验证码'))
        } else {
          callback()
        }
      }
      return {
        msgText: MSGINIT,
        msgTime: MSGTIME,
        msgKey: false,
        loginForm: {
          username: '',
          verificationCode: '',
          accountType: 2
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validatePhone }],
          verificationCode: [{ required: true, trigger: 'blur', validator: validateCode }]
        },
        sendForm: {
          phoneNumber: '',
          contentType: 1,
          accountType: 2
        }
      }
    },
    created() {},
    mounted() {},
    computed: {
    },
    props: [],
    methods: {
      handleSend() {
        if (this.msgKey) return
        this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
        this.msgKey = true
        this.sendForm.phoneNumber = this.loginForm.username
        sendSms(this.sendForm).then(res => {
          if (res.success) {
            this.$message.info('短信发送成功')
          }
        })
        const time = setInterval(() => {
          this.msgTime--
          this.msgText = MSGSCUCCESS.replace('${time}', this.msgTime)
          if (this.msgTime === 0) {
            this.msgTime = MSGTIME
            this.msgText = MSGINIT
            this.msgKey = false
            clearInterval(time)
          }
        }, 1000)
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$store.dispatch('Login', this.loginForm).then(res => {
              this.$router.push({ path: '/' })
            }).catch(error => {
              this.$message.error(error)
            })
          }
        })
      }
    }
  }
</script>

<style>
  .yanzhengma{
    display:block;
    margin-top: 8px;
  }
  .msg-text {
    display: block;
    width: 60px;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }
  .msg-text.display {
    color: #ccc;
  }
</style>
