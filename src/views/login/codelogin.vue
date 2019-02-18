<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username" class="phoneNumber">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="手机号"
      >
        <!-- <i slot="prefix" class="icon-shouji"></i> -->
      </el-input>
      <i>
        <img src="../../assets/images/top_images/userName.png" alt>
      </i>
    </el-form-item>
    <el-form-item prop="verificationCode" class="inpCode">
       <div class="inpt">
              <el-input
          size="small"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.verificationCode"
          auto-complete="off"
          placeholder="验证码"
        >
          <!-- <i slot="prefix" class="icon-yanzhengma yanzhengma" style></i> -->
          <template slot="append">
            <span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>
          </template>
        </el-input>
       </div>
      <i>
        <img src="../../assets/images/top_images/code.png" alt>
      </i>
    </el-form-item>
    <el-form-item>
      <el-button
        size="small"
        type="primary"
        @click.native.prevent="handleLogin"
        class="login-submit"
      >登&nbsp;录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const MSGINIT = "验证码";
// const MSGERROR = '验证码发送失败'
const MSGSCUCCESS = "${time}秒后重发";
const MSGTIME = 60;
import { isvalidatemobile } from "@/utils/validate";
import { sendSms } from "../../api/basic";
export default {
  name: "codelogin",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (isvalidatemobile(value)[0]) {
        callback(new Error(isvalidatemobile(value)[1]));
      } else {
        callback();
      }
    };
    const validateCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error("请输入6位数的验证码"));
      } else {
        callback();
      }
    };
    return {
      msgText: MSGINIT,
      msgTime: MSGTIME,
      msgKey: false,
      loginForm: {
        username: "",
        verificationCode: "",
        accountType: 1
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validatePhone }
        ],
        verificationCode: [
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      sendForm: {
        phoneNumber: "",
        contentType: 1,
        accountType: 1
      }
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    handleSend() {
      if (this.msgKey) return;
      this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
      this.msgKey = true;
      this.sendForm.phoneNumber = this.loginForm.username;
      sendSms(this.sendForm).then(res => {
        if (res.success) {
          this.$message.info("短信发送成功");
        }
      });
      const time = setInterval(() => {
        this.msgTime--;
        this.msgText = MSGSCUCCESS.replace("${time}", this.msgTime);
        if (this.msgTime === 0) {
          this.msgTime = MSGTIME;
          this.msgText = MSGINIT;
          this.msgKey = false;
          clearInterval(time);
        }
      }, 1000);
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              location.reload();
            })
            .catch(error => {
              this.$message.error(error);
            });
        }
      });
    }
  }
};
</script>

<style>
.yanzhengma {
  display: block;
  margin-top: 8px;
}
.msg-text {
  display: inline-block;
  font-size: 12px;
  cursor: pointer;
  width: 102px;
  height: 40px;
  background: rgba(0, 130, 240, 1);
  text-align: center;
  line-height: 40px;
  margin-top: 10px;
  margin-left:-7px;
  border-radius: 4px;
  /* position: absolute;
  top: 10px;
  left: -102px; */
}
/* .login-form .inp{
   position: relative;
} */
.msg-text.display {
  color: #ccc;
}
.el-input-group__append {
  border: none;
  background: rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
}
 .inpCode .inpt .el-input__inner{
    width: 242px;
    height: 40px;
 }
/* 给手机输入框,验证码加上图标 */
.login-form > .phoneNumber,
.login-form > .inpCode {
  position: relative;
}
.login-form > .phoneNumber img,
.login-form > .inpCode img {
  position: absolute;
  top: 22px;
  left: 40px;
}
.el-form-item .el-input__validateIcon {
  display: none;
}
.el-input--small .el-input__inner{
  padding-left: 30px;
}
</style>
