<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username" class="use">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"

        placeholder="请输入用户名"
      >
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
      <i>
        <img src="../../assets/images/top_images/userName.png" alt="用户">
      </i>
    </el-form-item>
    <el-form-item prop="password" class="pass">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        placeholder="请输入密码"
      >
        <i class="el-icon-view el-input__icon" slot="suffix" @click="showPassword"></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
      <i>
        <img src="../../assets/images/top_images/code.png" alt="密码">
      </i>
    </el-form-item>
    <el-checkbox v-model="checked">记住账号</el-checkbox>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
      >登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
// import md5 from 'js-md5'
export default {
  name: "userlogin",
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!isvalidUsername(value)) {
      //   callback(new Error('请输入正确的用户名'))
      // } else {
      //   callback()
      // }
      callback();
    };
    const validateCode = (rule, value, callback) => {
      if (this.code.value !== value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      passwordType: "password"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          const userinfo = {
            username: this.loginForm.username,
            password: this.loginForm.password,
            accountType: 0
          };
          this.$store
            .dispatch("Login", userinfo)
            .then(res => {
              location.reload();
            })
            .catch(error => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>
<style>
.login-form > .use,
.login-form > .pass {
  position: relative;
}
.login-form > .use img,
.login-form > .pass img {
  position: absolute;
  top: 22px;
  left: 40px;
}
 .el-input__icon{
   margin-right: -118px;
   margin-left: 60px;
 }
</style>
