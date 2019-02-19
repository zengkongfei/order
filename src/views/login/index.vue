<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-info text-white animated fadeInLeft"></div>
    <div class="loginTop">
      <img src="../../assets/images/goodLogo3.png" alt="logo">
    </div>
    <div class="login-border animated fadeInRight">
      <div class="login-top">
        <img src="../../assets/images/top_images/logo.png" alt="logo">
      </div>
      <div class="login-main">
        <span class="login-title">用户登录</span>
        <!-- <el-tabs v-model="activeName">
          <el-tab-pane label="手机登录" name="code"> -->
            <codeLogin></codeLogin>
          <!-- </el-tab-pane> -->
          <!-- <el-tab-pane label="账号密码登录" name="user">
            <userLogin></userLogin>
          </el-tab-pane> -->
        <!-- </el-tabs> -->
      </div>
    </div>

    <div class="bttom">
      <span>
        <span class="tex">Copyright@</span>
        <span class="tac">2019 美好铺子科技有限公司</span>
      </span>
    </div>
  </div>
</template>

<script>
// import userLogin from "./userlogin";
import codeLogin from "./codelogin";
export default {
  name: "login",
  components: {
    // userLogin,
    codeLogin
  },
  data() {
    return {
      activeName: "code"
    };
  },
  created() {},
  mounted() {},
  props: [],
  methods: {}
};
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  height: 900px;
}
.login-container .loginTop {
  width: 100%;
  height: 80px;
  background: rgba(38, 42, 55, 1);
  line-height: 80px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  position: absolute;
  top: 0px;
  left: 0px;
}
//登录页logo样式
.login-container .loginTop > img {
  margin-left: 392px;
   width: 119px;
   height: 44px;
  // width: 188px;
  // height: 60px;
  margin-top: 18px;
}
.login-container .bttom {
  width: 100%;
  height: 40px;
  background-color: #fff;
  position: absolute;
  bottom: -38px;
  left: 0px;
  text-align: center;
  line-height: 40px;
}
.login-container .bttom .tac {
  display: inline-block;
  width: 152px;
  height: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
}
.login-container .bttom .tex {
  display: inline-block;
  width: 67px;
  height: 20px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.45);
  line-height: 20px;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/images/top_images/login.png");
  background-size: cover;
}
.login-info {
  padding-left: 60px;
}
.login-info-title {
  line-height: 90px;
}
.login-info-item {
  font-size: 14px;
}
.login-border {
  width: 420px;
  height: 439px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 50px 25px 50px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  position: relative;
}
.login-border > .login-top > img {
  position: absolute;
  top: 30px;
  left: 116px;
}
.login-main {
  // border-radius: 3px;
  // box-sizing: border-box;
  // background-color: #fff;
  width: 420px;
  height: 273px;
  position: absolute;
  top: 150px;
  left: 0px;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: rgba(102, 102, 102, 1);
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  letter-spacing: 3px;
  position: relative;
  // color: #409eff;
  // width: 72px;
  // height: 25px;
  // font-size: 18px;
  // text-align: center;
  // font-family: PingFang-SC-Medium;
  // font-weight: 500;
  // color: rgba(102, 102, 102, 1);
  // line-height: 25px;
}
.login-title {
  position: absolute;
  top: -10px;
  left: 184px;
}
.login-submit {
  margin-top: 20px;
  margin-left: 32px;
  width: 356px;
  height: 40px;
  box-shadow: 0px 5px 8px 0px rgba(0, 130, 240, 0.5);
  border-radius: 4px;
  background: rgba(0, 130, 240, 1);
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-form-item {
    margin-bottom: 12px;
  }
  .el-input {
    input {
      width: 356px;
      height: 40px;
      margin-left: 32px;
      margin-top: 30px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
.el-checkbox__inner {
  margin-left: 32px;
}
.el-tabs__item.is-top:nth-child(2) {
  margin-left:90px;
}
.el-tabs__active-bar {
    left:93px;
  // width: 178px !important;
  background: rgba(0, 130, 240, 1);
}
.el-tabs__nav-wrap::after {
  width: 356px;
  margin-left: 32px;
  height: 1px;
  background: rgba(216, 216, 216, 1);
}
.el-tabs__item{
  padding: 0 37px;
}
.el-form-item__error {
  left: 32px;
}
// 修改input框
.login-form>.inpCode>.el-input input{
   width: 242px;
   height: 40px;
}

</style>
