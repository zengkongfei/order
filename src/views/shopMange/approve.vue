<template>
  <div class="table">
    <div class="container">
      <!--新增提示框-->
      <div class="conAddlist">
        <div class="listtitle"><p>基本信息</p></div>
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <ul class="flexbox">
            <li><el-form-item label="经销商编号:" prop="name">
              {{form.dealerCode}}
            </el-form-item></li>
            <li><el-form-item label="经销商名称:" label-width="150px" prop="name">
              {{form.dealerName}}
            </el-form-item></li>
          </ul>
          <ul class="flexbox">
            <li>  <el-form-item label="统一社会信用代码:" prop="name">
              {{form.creditCode}}
            </el-form-item></li>
            <li><el-form-item label="招商经理:" prop="name">
              {{form.leasingManager}}
            </el-form-item></li>
          </ul>

          <ul class="flexbox">
            <li>
              <el-form-item label="注册地址:" prop="detailedAddress">
                {{form.registerAddress}}
              </el-form-item>
            </li>
            <li>
              <el-form-item label="负责人姓名:" prop="name" >
                {{form.chargeName}}
              </el-form-item>
            </li>
          </ul>
          <ul class="flexbox">
            <li>
              <el-form-item label="详细地址:" prop="detailedAddress">
                {{form.detailedAddress}}
              </el-form-item>
            </li>

            <li>
              <el-form-item label="负责人性别:" prop="name" >
                {{form.legalSex}}
              </el-form-item>
            </li>

          </ul>

          <ul class="flexbox">
            <li>
              <el-form-item label="法人姓名:" prop="legalName" >
                {{form.legalName}}
              </el-form-item>
            </li>

            <li>
              <el-form-item label="负责人联系方式:" prop="chargePhone" >
                {{form.chargePhone}}
              </el-form-item>
            </li>
          </ul>

          <ul class="flexbox">
            <li>
              <el-form-item label="法人身份证号码:" prop="name" >
                {{form.legalCard}}
              </el-form-item>
              <el-form-item label="法人身份证照:（正面）" prop="legalFrontView" label-width="20">
                <img :src="form.legalFrontView" class="avatar">
              </el-form-item>
              <el-form-item label="法人身份证照:（背面）" prop="legalBackView" label-width="20">
                <img :src="form.legalBackView" class="avatar">
              </el-form-item>
            </li>
            <li>
              <el-form-item label="负责人照片:" prop="chargePhoto" >
                <img :src="imageUrl" class="avatar">
              </el-form-item>
            </li>
          </ul>
          <div class="listtitle"><p>网点证照</p></div>
          <ul class="conloaduplist">
            <li>
              <el-form-item label="" prop="name">
                <img v-if="form.licenseImageUrlYY" :src="form.licenseImageUrlYY" class="avatar">
                <div class="pictext" v-if="form.licenseImageUrlSP"><i>*</i>营业执照</div>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="" prop="name">
                <img v-if="form.licenseImageUrlSP" :src="form.licenseImageUrlSP" class="avatar">

                <div class="pictext" v-if="form.licenseImageUrlSP"><i>*</i> 食品生产许可证</div>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="" prop="name">
                <img v-if="form.licenseImageUrlAQ" :src="form.licenseImageUrlAQ" class="avatar">
                <div class="pictext" v-if="form.licenseImageUrlSP"><i>*</i> 安全生产许可证</div>
              </el-form-item>
            </li>
            <!--<li>-->
              <!--<el-form-item label="" prop="name">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--<div class="pictext"><i>*</i> <div>这个证照的名字真有点长...</div></div>-->
              <!--</el-form-item>-->
            <!--</li>-->
            <!--<li>-->
              <!--<el-form-item label="" prop="name">-->
                <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--<div class="pictext"><i>*</i> <div>这个证照的名字真有点长...</div></div>-->
              <!--</el-form-item>-->
            <!--</li>-->
          </ul>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import { ealerAdd } from '../../js/employee'
import {getDealerInfo, getDetailedDealerInfo} from "../../js/vipmanagement";
export default {
  name: 'Basetable',
  data() {
    return {
      tableData: [],
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      dialogVisible: true,
      imageUrl: 'http://bucket-health-test.oss-cn-hangzhou.aliyuncs.com/da1a63ecc79c47e3b2f5f0d19f81e373.jpg?Expires=1581340248&OSSAccessKeyId=LTAIo4pB85rIrn3v&Signature=9J0SNGZ38O1xvE3fdp0PDOQSb%2FE%3D',
      value3: true,
      value4: true,
      levelId: '',
      status: 1,
      input: '',
      options: [],
      form: {
        dealerName: '',
        dealerCode: '',
        registerAddress:'',
        province: '',
        creditCode: '',
        leasingManager: '',
        detailedAddress: '',
        legalName: '',
        chargeName: '',
        legalSex: '',
        legalFrontView: '',
        legalBackView: '',
        chargePhone: '',
        chargePhoto: '',
        legalCard:'',
        licenseImageUrlYY:'',
        licenseImageUrlAQ:'',
        licenseImageUrlSP:'',
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]

      },
      value1: '',
      value2: '',
      idx: -1,
      fileList3: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {

        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      educationList: '',
      levelist: '',
      typelist: '',
      dialogImageUrl: '',
      dialogVisible: false,
      levelistId: '',
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      content: ``,
      str: '',
      editorOption: {}

    }
  },
  computed: {
    data() {
      return this.tableData
    },
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },

  created() {
    getDetailedDealerInfo().then(res => {
      this.form.dealerName=res.datas.dealerName;
      this.form.dealerCode=res.datas.dealerCode;
      this.form.registerAddress=res.datas.registerAddress;
      this.form.province=res.datas.province;
      this.form.creditCode=res.datas.creditCode;
      this.form.leasingManager=res.datas.leasingManager;
      this.form.detailedAddress=res.datas.legalName;
      this.form.legalName= res.datas.legalName;
      this.form.chargeName=res.datas.chargeName;
      this.form.legalSex=res.datas.legalSex;
      this.form.legalFrontView=res.datas.legalFrontView;
      this.form.legalBackView=res.datas.legalBackView;
      this.form.chargePhone=res.datas.chargePhone;
      this.form.chargePhoto=res.datas.chargePhoto;
      this.form.legalCard=res.datas.legalCard;
      this.form.licenseImageUrlYY=res.datas.licenseImageUrlYY;
      this.form.legalCardImageUrlAQ=res.datas.legalCardImageUrlAQ;
      this.form.legalCardImageUrlSP=res.datas.legalCardImageUrlSP;
    }).catch(error => {
      this.$message.error(error + '')
    })
  },
  methods: {
    // 提交
    submitForm() {

    },
    // 取消
    takeAway() {
      this.$router.push('/branch/aptitude')
    },
    // 提交
    submitForm() {
      dealerAddd(this.form).then(res => {
        console.log(res.datas)
      }).catch(error => {
        this.$message.error(error + '')
      })
      this.$router.push('/branch/aptitude')
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}

</script>

<style scoped>
  li,ul{ list-style-type: none;}
  .table {
    width: 100%;
    font-size: 14px;
  }
  .forminputtext select, .forminputtext input {
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    padding: 0 15px;
  }
  .forminputtext .textarea {
    width: 50%;
    color: #606266;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    display: inline-block;
    font-size: inherit;
    padding: 15px;
  }
  .forminputtext input {
    margin-right: 20px;
  }
  .forminputtext select {
    width: 200px;
    margin-right: 20px;
  }
  .forminputtext li {
    margin-bottom: 18px;
  }
  .forminputtext ul {
    list-style: none;
  }
  .upaload p {
    text-align: center;
    margin: 10px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
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
    width: 300px;
    height: 200px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 300px;
    height: 200px;
    display: block;
  }
  .avatar-uploader-icon{border:solid 1px #c0ccda;}
  .avatar-uploader .el-upload:hover {border-color: #409EFF;}
  .conseachlist ul{ list-style-type: none;display:flex;margin:10px;}
  .conseachlist ul li,.lfinfo{ flex:1; width:50%;}
  .conseachlist li p,.infoList p{margin:0 5px;}
  .lfinfo b i,.conmetn li b i{ color: red;font-weight: bold;margin:0 3px; }
  .conseachlist li label,.conseachlist li p,.infoList li b,.infoList p,.block{ display: inline-block;}
  .conseachlist label,.conseachlist p{justify-content:center;flex-direction:column;}
  .lfinfo li{margin-top:15px;}
  .lfinfo li b,.infoList li b{width:80px; text-align: right;}
  .rigphoto,.lfinfo{ display: inline-flex;}
  .botlist{clear: left; border-top:dashed 1px #ddd; margin: 20px 12px; display:inline-table;}
  .conmetn li p,.conmetn li b,.edit_container{ display: inline-block;}
  .conmetn li{ float: left; width:50%; margin: 12px 0;}
  .conmetn li b{margin:0 5px; }
  .conmetn{padding-bottom: 50px; width: 100%;}
  .edit_container{margin:10px; width:150%;}
  .dialog-footer{ padding:0 60px 30px 60px; display: inline-table;}
  .conAddlist{margin: 20px;}
  .flexbox{ display: flex; margin: 0; padding: 0;}
  .flexbox li{ float: left; width: 50%; }
  .flexbox p{ line-height:18px; height: 18px;}
  .pictext i{ color: red;font-weight: bold; display: inline-block; vertical-align: top;margin-top: -5px;}
  .pictext div{ height: 20px; line-height: 20px; border: solid 1px #c0ccda; display: block;margin: 5px 0;width:94%; display: inline-block; overflow: hidden; white-space: normal;}
  conloaduplist{ display: flex;}
  .conloaduplist li{flex-direction:column;flex-wrap:wrap; display: inline-flex;}
  .listtitle{ border-bottom:solid 1px #c0ccda; margin: 20px; }
  .el-form{margin: 30px; width:80%;}
  .el-icon-plus:before{ vertical-align: middle;}

</style>

