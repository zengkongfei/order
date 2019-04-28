<template>
  <div class="activation">
    <div class="table" id="sibboxcon">
      <div style="background: white;margin-bottom:24px;">
        <div class="logoTitle save-btn">
          <img src="../../assets/images/top_images/logo.png">
          <p>激活会员</p>
          <div class="mybtn">
            <el-button type="primary" @click="submitEdit('form')">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="activation-content clearfix" style="margin-top: 64px">
      <el-form ref="form" :model="res" label-width="112px" :rules="rules">
        <div class="activation-one left" style="margin-right:100px">
          <el-form-item label="会员编号:">
            <span>{{memberCode}}</span>
          </el-form-item>
          <el-form-item label="会员姓名:" prop="memberFullName">
            <el-input v-model="res.memberFullName"></el-input>
          </el-form-item>
          <el-form-item label="会员身份证号:" prop="memberCard">
            <el-input v-model="res.memberCard"></el-input>
          </el-form-item>
          <el-form-item label="会员身份证号:(正面)">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccessone"
              :before-upload="beforeAvatarUploadone"
              :auto-upload="true"
              :action="actionUrl"
            >
              <img v-if="imageUrlOne" :src="imageUrlOne" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="picTitle">
              <p>尺寸:526*332px</p>
              <p>质量: 小于1000k</p>
              <p>格式:jpeg</p>
            </div>
          </el-form-item>
        </div>
        <div class="activation-one left">
          <el-form-item label="会员联系方式:" prop="tel">
            <span>{{memberTel}}</span>
          </el-form-item>
          <el-form-item label="会员性别" prop="memberSex">
            <el-select v-model="res.memberSex" placeholder="请选择性别">
              <el-option
                v-for="(item,index) in sex"
                :label="item.label"
                :key="index"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item prop="memberBirthday" label="会员生日">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="res.memberBirthday"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="会员身份证号:(反面)" prop>
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccesstwo"
              :before-upload="beforeAvatarUploadtwo"
              :auto-upload="true"
              :action="actionUrl"
            >
              <img v-if="imageUrlTwo" :src="imageUrlTwo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="picTitle">
              <p>尺寸:526*332px</p>
              <p>质量: 小于1000k</p>
              <p>格式:jpeg</p>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { addActivation,picPath } from "../../js/vipmanagement";
export default {
  data() {
    return {
      actionUrl: "",
      form: "",
      imageUrlOne: "",
      imageUrlTwo: "",
      //固定
      memberTel:this.$route.query.contactWay,
      memberCode:this.$route.query.memberCode,
      //规定
      rules: {
        memberFullName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        memberCard: [
          { required: true, message: "请输入正确身份证号", trigger: "blur" },
          {
            min: 15,
            max: 18,
            message: "请输入正确身份证号位数",
            trigger: "blur"
          }
        ],
        memberSex: [
          { required: true, message: "请选择性别", trigger: "change" }
        ],
        memberBirthday: [
          { required: true, message: "请选择生日", trigger: "change" }
        ]
      },
      //性别

      sex: [
        {
          label: "男",
          value: 1
        },
        {
          label: "女",
          value: 0
        }
      ],
      res: {
        id: this.$route.query.memberId,
        memberBackView: "",
        memberBirthday: "",
        memberCard: "",
        memberFrontView: "",
        memberFullName: "",
        memberSex: ""
      }
    };
  },
  created() {
    this.actionUrl = process.env.BASE_API + "health-file/file/upload";
  },
  methods: {
    handleAvatarSuccessone(response, file, fileList) {
        this.imageUrlOne = URL.createObjectURL(file.raw)
      },
      beforeAvatarUploadone(file) {
        const isJPG = file.type === 'image/jpeg';
         const isLt2M = file.size / 1024 < 1000;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
          return false
        }
        if (isLt2M > 300) {
          this.$message.error('上传头像图片大小不能超过 1000kb!')
          return false
        }
        const isSize = new Promise(function(resolve, reject) {
        let width = 526;
        let height = 332;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传图片尺寸为526px*332px!");
          return Promise.reject()
        }
      );
        this.picFileone(file)
        return isJPG && isSize
      },
      picFileone(content) {
        let formData = new FormData()
        formData.append('file', content)
        picPath(formData).then(res => {
          this.res.memberFrontView  = res.datas[0].relativePath
        }).catch(error => {
            console.log(error,'error')
          this.$message.error(error + '')
        })
      },
    //第二张图
    
    handleAvatarSuccesstwo(response, file, fileList) {
        this.imageUrlTwo = URL.createObjectURL(file.raw)
      },
      beforeAvatarUploadtwo(file) {
        const isJPG = file.type === 'image/jpeg';
         const isLt2M = file.size / 1024 < 1000;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
          return false
        }
        if (isLt2M > 300) {
          this.$message.error('上传头像图片大小不能超过 1000kb!')
          return false
        }
        const isSize = new Promise(function(resolve, reject) {
        let width = 526;
        let height = 332;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message.error("上传图片尺寸为526px*332px!");
          return Promise.reject()
        }
      );
        this.picFiletwo(file)
        return isJPG && isSize
      },
      picFiletwo(content) {
        let formData = new FormData()
        formData.append('file', content)
        picPath(formData).then(res => {
          this.res.memberBackView= res.datas[0].relativePath
        }).catch(error => {
          this.$message.error(error + '')
        })
      },
    submitEdit(addform) {
      console.log("xxx", this.res);
      this.$refs["form"].validate(valid => {
        if (valid) {
          addActivation(this.res)
            .then(res => {
              this.$message.success(res.msg);
                this.$router.push("/memberMag/memberInfo");
            })
            .catch(error => {
              this.$message.error(error + "请重新提交");
            });
        } else {
          console.log("error submit!!");
        }
      });

    }
    }
};
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

.avatar-uploader {
  width: 406px;
  height: 254px;
  background: rgba(238, 238, 238, 1);
  border-radius: 4px;
}
.avatar-uploader >>> .el-icon-plus {
  font-size: 60px;
}
.avatar-uploader {
  line-height: 254px;
}

.avatar-uploader >>> .el-upload--text {
  width: 100%;
}
.avatar-uploader >>> .avatar {
  width: 406px;
  height: 254px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.picTitle p {
  margin: 0px;
  font-size: 14px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
</style>
