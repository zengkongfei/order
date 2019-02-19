<template>
  <div class="brabnEditWrap">
    <div class="table">
      <div class="container">
        <!--修改提示框-->
        <div class="contentWrap">
          <div class="conAddlist">
            <div class="listtitle">
              <i class="icon-square"></i>
              <span>基础信息</span>
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="160px" :inline="true">
              <div class="right-left-box clearfix">
                <div class="left-box left">
                  <div>
                    <el-form-item label="经销商编号:" class="second-input">
                      {{ form.dealerCode }}
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="统一社会信用代码：">
                      {{ form.creditCode }}
                    </el-form-item>

                  </div>
                  <div>
                    <el-form-item label="注册地址：" class="second-input">
                      {{ form.registerAddress }}
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="详细地址：" class="second-input">
                      {{ form.detailedAddress }}
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="法人姓名：" prop="legalName" required="required">
                      {{ form.legalName }}
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="法人身份证号码：" prop="legalCard">
                      {{ form.legalCard }}
                    </el-form-item>
                  </div>
                  <div class="explain-fu pic-d img-size-first">
                    <p class="explain">（正面）</p>
                    <el-form-item label="法人身份证照：" prop="legalFrontView">
                      <img v-if="form.legalFrontView" :src="form.legalFrontView" class="avatar" style="border-radius:4px;">
                      <i v-else class="el-icon-plus avatar-uploader-icon"
                         style="border:none;width:406px;height:254px;line-height:254px;border-radius:4px;"/>
                    </el-form-item>
                  </div>
                  <div class="explain-fu pic-d img-size-first">
                    <p class="explain">（背面）</p>
                    <el-form-item label="法人身份证照：" prop="legalBackView">
                      <img v-if="form.legalBackView" :src="form.legalBackView" class="avatar" style="border-radius:4px;">
                      <i v-else class="el-icon-plus avatar-uploader-icon"
                         style="border:none;width:406px;height:254px;line-height:254px;border-radius:4px;"/>
                    </el-form-item>
                  </div>
                </div>
                <div class="right-box right">
                  <div class="right-form ">
                    <el-form-item label="经销商名称：" prop="chargeName">
                      {{ form.dealerName }}
                    </el-form-item>
                  </div>
                  <div class="right-form ">
                    <el-form-item label="招商经理：" prop="chargeName">
                      {{ form.leasingManager }}
                    </el-form-item>
                  </div>
                  <div class="right-form ">
                    <el-form-item label="负责人姓名：" prop="chargeName">
                      {{ form.chargeName }}
                    </el-form-item>
                  </div>
                  <div class="right-form">
                    <el-form-item label="负责人性别：" prop="chargeSex" class="sex-slect">
                      {{ form.legalSex }}
                    </el-form-item>
                  </div>
                  <div class="right-form">
                    <el-form-item label="负责人联系方式：" prop="chargePhone">
                      {{ form.chargePhone }}
                    </el-form-item>
                  </div>
                  <div class="pic-d img-size-second">
                    <el-form-item label="负责人照片：" prop="chargePhoto">
                      <img v-if="form.chargePhoto" :src="form.chargePhoto" class="avatar" style="border-radius:4px;">
                      <i v-else class="el-icon-plus avatar-uploader-icon"
                         style="width: 205px; height: 250px;border:none"/>
                    </el-form-item>
                  </div>

                </div>
              </div>
              <div class="listtitle">
                <i class="icon-square"></i>
                <span>网点证照</span>
              </div>
              <div class="licences clearfix" >
                <div v-for="item in licences" class="licences"  style="width:266px;height:200px;">
                  <img :src="item.imageUrl" height="200px" width="266px">
                </div>
              </div>
              <!--<div class="licences" v-for="item in licences">
                <img v-if="item.imageUrl" :src="item.imageUrl" height="200px" width="266px">
                  <i v-else="item.imageUrl == ''" class="el-icon-plus"
                     style="width: 266px; height: 200px;border:none;line-height: 200px;background: rgba(238, 238, 238, 1);"></i>
                &lt;!&ndash;<p v-if="item.imageDesc" class="pictext" ><i>*</i>{{ item.imageDesc }}</p>&ndash;&gt;
              </div>-->
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer"></span>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {getDetailedDealerInfo} from '../../js/vipmanagement'

  export default {
    name: 'Basetable',
    data() {
      return {
        tableData: [],
        cur_page: 1,
        editVisible: false,
        delVisible: false,
        dialogVisible: true,
        imageUrl: '',
        value3: true,
        value4: true,
        levelId: '',
        status: 1,
        input: '',
        options: [],
        form: {
          dealerName: '',
          dealerCode: '',
          registerAddress: '',
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
          legalCard: ''
        },
        licences: [],
        rules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
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
        this.form.dealerName = res.datas.dealerName
        this.form.dealerCode = res.datas.dealerCode
        this.form.registerAddress = res.datas.registerAddress
        this.form.province = res.datas.province
        this.form.creditCode = res.datas.creditCode
        this.form.leasingManager = res.datas.leasingManager
        this.form.detailedAddress = res.datas.legalName
        this.form.legalName = res.datas.legalName
        this.form.chargeName = res.datas.chargeName
        this.form.legalSex = res.datas.legalSex
        this.form.legalFrontView = res.datas.legalFrontView
        this.form.legalBackView = res.datas.legalBackView
        this.form.chargePhone = res.datas.chargePhone
        this.form.chargePhoto = res.datas.chargePhoto
        this.form.legalCard = res.datas.legalCard
        this.licences = res.datas.licences

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
<style>
  .brabnEditWrap .select-table .el-button--text {
    color: rgba(102, 102, 102, 1);
  }

  .xuanze-wrap .el-dialog__headerbtn {
    right: 24px;
  }

  .xuanze-wrap .el-form-item {
    margin: 24px 0;
  }

  .xuanze-wrap .el-button {
    margin: 20px 0px;
  }

  .brabnEditWrap .ChoiceManager .el-table th.is-leaf {
    border-bottom: 1px solid #D9D9D9;
  }

  .brabnEditWrap .ChoiceManager .el-table td {
    border-bottom: 1px solid #D9D9D9;
  }

  .brabnEditWrap .ChoiceManager .el-table tr {
    height: 54px;
    box-sizing: border-box;
  }

  .brabnEditWrap .ChoiceManager thead > tr > th {
    background: rgba(250, 250, 250, 1);
    /* border-radius:4px 4px 0px 0px;*/
  }

  .brabnEditWrap .ChoiceManager .el-dialog__body {
    /* border-top:1px solid #D9D9D9;
     border-bottom:1px solid #D9D9D9;*/
    border-style: solid none solid none;
    border-width: 1px;
    border-color: #D9D9D9;
    padding: 0 24px;
  }

  .brabnEditWrap .ChoiceManager .el-input__inner {
    width: 224px;
  }

  .brabnEditWrap .el-table thead {
    color: rgba(51, 51, 51, 1);
    font-size: 14px;
  }

  .brabnEditWrap .el-table__body {
    color: rgba(102, 102, 102, 1);
  }

  .brabnEditWrap .el-form-item__label {
    color: rgba(51, 51, 51, 1);
  }

  .brabnEditWrap .ChoiceManager .el-form {
    margin: 0;
    width: 100%;
  }

  .brabnEditWrap .el-table td {
    padding: 6px 0;
  }

  .brabnEditWrap .el-dialog__footer {
    padding: 24px;
  }

  .brabnEditWrap .dialog-footer {
    padding: 0 !important;
  }

  .brabnEditWrap .el-table__header {
    width: 100%;
  }

  .brabnEditWrap .el-dialog__title {
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }

  /* .brabnEditWrap .el-upload-list--picture-card .el-upload-list__item-actions {
     top: 160px;
     height: 40px;
   }*/
  .brabnEditWrap .lattice-point-warp .el-upload-list__item.is-success .el-upload-list__item-status-label {
    display: none;
  }

  .brabnEditWrap .lattice-point-warp .el-upload-list--picture-card .el-upload-list__item:nth-child(4n+4) {
    margin-right: 0;
  }

  .brabnEditWrap .lattice-point-warp .el-upload-list--picture-card .el-upload-list__item {
    width: 266px;
    height: 200px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    border: none;
    margin-right: 24px;
    position: relative;
  }

  .brabnEditWrap .lattice-point-warp .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    max-width: 266px;
    max-height: 200px;
    width: auto;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .el-upload-list--picture-card .el-upload-list__item-name {
    display: none;
  }

  .brabnEditWrap .table .lattice-point-warp .el-upload--picture-card {
    border: none;
    display: inline-block;
    background: rgba(255, 255, 255, 1);
    /* background-color: rgb(255,0,255); */
    height: 300px;
  }

  .brabnEditWrap .el-icon-plus:before {
    font-size: 60px;
  }

  .brabnEditWrap .icon-blue-circular-wrap {
    height: 32px;
    line-height: 32px;
  }

  .brabnEditWrap .icon-blue-circular {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: rgba(0, 130, 240, 1);
    vertical-align: 2px;
    margin-right: 7px;
  }

  .brabnEditWrap .left-box .el-input__inner {
    width: 406px;
  }

  .brabnEditWrap .right-box .el-input__inner {
    width: 200px;
  }

  .brabnEditWrap .right-box .el-form-item {
    margin-right: 0;
    display: block;
  }

  .brabnEditWrap .el-input__inner {
    height: 32px;
  }

  .brabnEditWrap .icon-square {
    display: inline-block;
    width: 10px;
    height: 20px;
    background: rgba(0, 130, 240, 1);
    border-radius: 2px;
    vertical-align: -4px;
    margin-right: 10px;
  }

  .brabnEditWrap .select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }

  .brabnEditWrap .img-size-first .el-upload {
    position: relative;
    width: 406px;
    height: 254px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .brabnEditWrap .img-size-first .avatar {
    max-width: 406px;
    max-height: 254px;
  }

  .brabnEditWrap .img-size-second .el-upload {
    position: relative;
    width: 200px;
    height: 280px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .brabnEditWrap .img-size-second .avatar {
    max-width: 200px;
    max-height: 280px;
  }

  .brabnEditWrap .img-size-three .el-upload {
    position: relative;
    width: 266px;
    height: 200px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .brabnEditWrap .img-size-three .avatar {
    max-width: 266px;
    max-height: 200px;
  }

  .brabnEditWrap .select-box .el-input__inner {
    width: 196px;
  }

  .brabnEditWrap .pic-d .el-upload {
    position: relative;
  }

  .brabnEditWrap .operation-dialog {
    position: absolute;
    right: 0;
    /*top: 160px;*/
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0px 0px 4px 4px;
    margin: 0;
    display: none;
  }

  .brabnEditWrap .el-upload:hover .operation-dialog {
    display: block;
  }

  .brabnEditWrap .operation-dialog > i {
    color: white;
  }

  .brabnEditWrap .operation-dialog .el-icon-refresh {
    margin-right: 40px;

  }

  .brabnEditWrap .title-p {
    line-height: 16px;
    margin: 0;
    color: #999999;
    margin-bottom: 10px;
  }

  .sex-slect .el-input--suffix .el-input__inner {
    padding-right: 15px;
  }

  .right {
    float: right;
  }

  .left {
    float: left
  }

  .space {
    margin-left: 160px;
  }

  .container .conAddlist .el-form {
    margin: 0;
    width: 100%;
  }

  .second-input .el-input__inner {
    width: 221px;
  }

  .first-input .el-input__inner {
    width: 616px;
  }

  .shuru .el-input__inner {
    border: none;
  }

  .custom-upload .el-upload--picture-card {
    width: 266px;
    height: 200px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    border: none;
    line-height: 200px;
  }

  .custom-upload .el-upload-list--picture-card .el-upload-list__item {
    width: 266px;
    height: 200px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    border: none;
    line-height: 200px;
  }

  .custom-upload .el-upload-list--picture-card .el-upload-list__item-status-label {
    background-color: transparent;
    display: none;
  }

  .custom-upload .el-upload-list--picture-card .el-upload-list__item-actions {
    height: 40px;
    bottom: 0;
    top: inherit;
    line-height: 40px;
  }

  .avatar-uploader-icon {
    background: rgba(238, 238, 238, 1);
    border: none;
  }

  .right-form .el-form-item {
    margin-right: 0;
  }
</style>

<style scoped>
  .explain-fu {
    position: relative;
  }

  .explain {
    position: absolute;
    left: 58px;
    top: 21px;
    color: #606266;
  }

  .xuanze-wrap {
    border-top: 1px solid rgba(217, 217, 217, 1);
  }

  .logoTitleWrap {
    width: 1136px;
    margin: 0 auto;
  }

  .logoTitle {
    background: #FFF;
    height: 80px;
    /* padding: 0 200px;*/
    text-align: center;
    line-height: 80px;
    margin-bottom: 24px;
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  }

  .logoTitle p {
    color: #000000;
    font-size: 16px;
  }

  .logoTitle img {
    float: left;
    width: 120px;
    height: 40px;
    margin-top: 20px;
  }

  .logoTitle .el-button {
    float: right;
    margin-top: -76px;
  }

  .contentWrap {
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;
  }

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

  .input-box {
    position: relative;
  }

  .input-box > div {
    float: right;
    position: relative;
  }

  .input-box .circular-icon {
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    border: 4px solid rgba(0, 130, 240, 1);
    box-sizing: border-box;
  }

  .input-box .tips-icon {
    color: red;
    position: absolute;
    top: 50%;
    left: 7px;
    transform: translateY(-50%);
    display: inline-block;
    height: 8px;
  }

  .input-box input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 240px;
  }

  li, ul {
    list-style-type: none;
  }

  .table {
    width: 100%;
    font-size: 14px;
    background-color: #F0F2F5;
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

  .brabnEditWrap .el-form-item__content {

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

  .avatar-uploader-icon {
    border: solid 1px #c0ccda;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .conseachlist ul {
    list-style-type: none;
    display: flex;
    margin: 10px;
  }

  .conseachlist ul li, .lfinfo {
    flex: 1;
    width: 50%;
  }

  .conseachlist li p, .infoList p {
    margin: 0 5px;
  }

  .lfinfo b i, .conmetn li b i {
    color: red;
    font-weight: bold;
    margin: 0 3px;
  }

  .conseachlist li label, .conseachlist li p, .infoList li b, .infoList p, .block {
    display: inline-block;
  }

  .conseachlist label, .conseachlist p {
    justify-content: center;
    flex-direction: column;
  }

  .lfinfo li {
    margin-top: 15px;
  }

  .lfinfo li b, .infoList li b {
    width: 80px;
    text-align: right;
  }

  .rigphoto, .lfinfo {
    display: inline-flex;
  }

  .botlist {
    clear: left;
    border-top: dashed 1px #ddd;
    margin: 20px 12px;
    display: inline-table;
  }

  .conmetn li p, .conmetn li b, .edit_container {
    display: inline-block;
  }

  .conmetn li {
    float: left;
    width: 50%;
    margin: 12px 0;
  }

  .conmetn li b {
    margin: 0 5px;
  }

  .conmetn {
    padding-bottom: 50px;
    width: 100%;
  }

  .edit_container {
    margin: 10px;
    width: 150%;
  }

  .dialog-footer {
    padding: 0 60px 30px 60px;
    display: inline-table;
  }

  .conAddlist {
    margin: 20px auto;
    width: 1136px;
  }

  .flexbox {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .flexbox li {
    float: left;
    width: 50%;
  }

  .flexbox p {
    line-height: 18px;
    height: 18px;
  }

  .pictext i {
    color: red;
    font-weight: bold;
    display: inline-block;
    vertical-align: top;
    margin-top: -5px;
  }

  .pictext div {
    height: 20px;
    line-height: 20px;
    /*  border: solid 1px #c0ccda;*/
    display: block;
    margin: 5px 0;
    width: 94%;
    display: inline-block;
    overflow: hidden;
    white-space: normal;
  }

  .brabnEditWrap .conloaduplist {
    display: flex;
    padding: 0;
  }

  .conloaduplist li {
    flex-direction: column;
    flex-wrap: wrap;
    display: inline-flex;
  }

  .listtitle {
    border-bottom: dashed 1px rgba(217, 217, 217, 1);
    padding: 48px 0 11px;
    margin-bottom: 32px;

  }

  .el-form {
    margin: 30px;
    width: 80%;
  }

  .el-icon-plus:before {
    vertical-align: middle;
  }

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

  .licences {
      float: left;
     margin-left: 10px;
     margin-bottom:10px;
  }
   .licences img{
       border-radius:4px;
   }
  /* .img-box {
    float: left;
    display: inline-block;
    width: 266px;
    height: 200px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    text-align: center;
    vertical-align: middle;
    border: none;
    margin-right: 24px;
  } */

  .licences .img-box:nth-child(4n+4) {
    margin-right: 0;
  }
</style>



