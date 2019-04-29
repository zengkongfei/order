<template>
  <div class="activation">
    <div class="table" id="sibboxcon">
      <div style="background: white;margin-bottom:24px;">
        <div class="logoTitle save-btn">
          <img src="../../assets/images/top_images/logo.png">
          <p>查看会员</p>
          
        </div>
      </div>
    </div>
    <div class="activation-content clearfix" style="margin-top: 64px">
      <el-form ref="form" :model="form" label-width="112px">
        <div class="activation-one left" style="margin-right:100px">
          <el-form-item label="会员编号:">
            <span>{{form.memberCode}}</span>
          </el-form-item>
          <el-form-item prop="memberFullName" label="会员姓名:">
             <span>{{form.memberFullName}}</span>
          </el-form-item>
          <el-form-item label="会员身份证号:">
             <span>{{form.memberCard}}</span>
          </el-form-item>
          <el-form-item label="会员身份证照:(正面)">
              <img  :src="form.memberFrontView" width="406px" height="254px" alt="" />
          </el-form-item>
        </div>
         <div class="activation-one left">
          <el-form-item label="会员联系方式:">
            <span>{{form.contactWay}}</span>
          </el-form-item>
          <el-form-item label="会员性别:">
             <span> {{ form.memberSex == 0 ? '男' : '女' }}</span>
          </el-form-item>
          <el-form-item label="会员出生日期:">
             <span>{{form.memberBirthday}}</span>
          </el-form-item>
          <el-form-item label="会员身份证照:(反面)">
            <img  :src="form.memberBackView"  width="406px" height="254px" alt="" />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
import {getMemberActivation} from '@/js/vipmanagement'
export default {
  data(){
    return{
         form: {
          contactWay: '',//会员联系方式
          memberFrontView: '',//正面照片
          memberFullName	: '',//会员姓名
          memberBackView: '',//反面照片
          memberBirthday: '',//会员生日
          memberCard: '',//会员身份证号
          memberCode: '',//会员编号
          memberSex: '',//会员性别
          
      },
      // 会员id
      memberId: this.$route.params.memberId
    }
  },
    created() {
      this.getMemberInfo() //调用获取会员信息
    },
  methods:{
    //调用获取会员信息
      getMemberInfo(){
        getMemberActivation(this.memberId).then(res => {
          if (res && res.datas) {
            this.form.contactWay = res.datas.contactWay
            this.form.memberBackView = res.datas.memberBackView
            this.form.memberBirthday = res.datas.memberBirthday

            this.form.memberCard = res.datas.memberCard
            this.form.memberCode = res.datas.memberCode
            this.form.memberFrontView = res.datas.memberFrontView
            this.form.memberFullName = res.datas.memberFullName
            this.form.memberSex = res.datas.memberSex
          }
        }).catch(error => {
          this.$message.error(error + '')
        })
      }
  }
    
}
</script>
 <style>
.clearfix:after {
  content: "";
  display: block;
  visibility: hidden;
  height: 0;
  clear: both;
}

.clearfix {
  zoom: 1;
}

.left {
  float: left;
}

.right {
  float: right;
}

.activation {
  width: 100%;
  overflow: auto;
}
</style>
<style scoped>
.replace-btn-md {
  cursor: pointer;
  position: absolute;
  bottom: 1px;
  width: 240px;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0px 0px 4px 4px;
}

li,
ul {
  list-style-type: none;
}
.activation .table {
  padding: 0;

  background-color: #f0f2f5;
  min-width: 1136px;
}

.activation .logoTitle {
  background: #fff;
  height: 80px;
  /* padding: 0 200px;*/
  text-align: center;
  line-height: 80px;
  margin-bottom: 24px;
  position: relative;
}

.logoTitle p {
  color: #000000;
  font-size: 16px;
}

.activation .logoTitle img {
  float: left;
  width: 120px;
  height: 40px;
  margin-top: 20px;
}
</style>
<style>
</style>
<style>
.activation .save-btn .el-button--primary {
  height: 32px;
  width: 60px;
  line-height: 0;
  position: relative;
  background-color: #0082f0;
}

.activation .save-btn .el-button--primary span {
  position: absolute;
  top: 15px;
  left: 15px;
}

.activation .save-btn {
  height: 80px;
  width: 1136px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  border-radius: 4px;
  /* margin-bottom: 24px; */
}
.activation .mybtn {
  position: absolute;
  right: 0;
  top: 0;
  height: 32px;
  width: 60px;
}
</style>
<style scoped>
.activation-content {
  margin: 0 auto;
  width: 1136px;
}
.activation >>> .el-input {
  width: 406px;
  height: 32px;
}
.activation >>> .el-input__inner {
  width: 406px;
  height: 32px;
}

/*  zhaop*/

.avatar-uploader{
  width:406px;
height:254px;
background:rgba(238,238,238,1);
border-radius:4px;

}
.avatar-uploader>>>.el-icon-plus{
  font-size: 60px;
}
.avatar-uploader{
    line-height: 254px;
}

.avatar-uploader>>>.el-upload--text{
  margin-left: 110px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
