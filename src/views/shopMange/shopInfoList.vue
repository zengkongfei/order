<template>
  <div class="table shopInfoListWrap">
    <div id="container" class="container">
      <div class="addSearch" style="width:100%">
        <el-form ref="plan" :model="condition" :inline="true" label-width="105px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="网点编号:" style="">
                <el-input v-model="condition.dealerCode" placeholder="请输入网点编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网点名称:" style="">
                <el-input v-model="condition.dealerName" placeholder="请输入网点名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网点联系方式:" style="">
                <el-input v-model="condition.chargePhone" placeholder="请输入网点联系方式"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="负责人姓名:" style="">
                <el-input v-model="condition.chargeName" placeholder="请输入负责人姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人姓名:" style="">
                <el-input v-model="condition.legalName" placeholder="请输入法人姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="招商经理:" style="">
                <el-input v-model="condition.leasingManager" placeholder="请输入招商经理"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="注册地(省):" style="">
                <!-- <el-input v-model="condition.province" placeholder="请选择注册地(省)"/>-->
                <el-select v-model="condition.province" placeholder="请选择注册地（省）" class="myInput" @change="getCity">
                  <el-option v-for="item in provinceList" :label="item.label" :value="item.value" :key="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地(市):" style="">
                <!-- <el-input v-model="condition.city" placeholder="请选择注册地(市)"/>-->
                <el-select v-model="condition.city" placeholder="请选择注册地（市）" class="myInput" @change="getCounty">
                  <el-option v-for="item in cityList" :label="item.label" :value="item.value" :key="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地(区):" style="">
                <!-- <el-input v-model="condition.county" placeholder="请选择注册地(区)"/>-->
                <el-select v-model="condition.county" placeholder="请选择注册地（市）" class="myInput">
                  <el-option v-for="item in countyList" :label="item.label" :value="item.value" :key="item.value"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="handle-box" style="width:100%">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
      <el-table
        :data="tableData" border
        :header-cell-style="{background:'rgba(250,250,250,1)'}"
        :default-sort="{prop: 'lastModifiedDate', order: 'descending'}"
        empty-text="暂无数据"
        @sort-change='sortChange' height='600px'>
        <el-table-column prop="dealerCode" label="网点编号" width="150"/>
        <el-table-column prop="dealerName" label="网点名称" width="200"/>
        <el-table-column prop="creditCode" label="统一社会信用代码" width="200"/>
        <el-table-column prop="legalName" label="法人姓名" width="150"/>
        <el-table-column label="法人身份证号" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="showLegalCard(scope.$index, scope.row)">
              {{ scope.row.legalCard }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="chargeName" label="负责人姓名" width="150"/>
        <el-table-column label="负责人性别" width="150" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.chargeSex == 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chargePhone" label="网点联系方式" width="150"/>
        <el-table-column label="负责人照片" width="150" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="showChargePhoto(scope.$index, scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="注册地（省）" width="150"/>
        <el-table-column prop="city" label="注册地（市）" width="150"/>
        <el-table-column prop="county" label="注册地（县）" width="150"/>
        <el-table-column prop="detailedAddress" label="详细地址" width="250"/>
        <el-table-column label="网点证照" width="150" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="showNetworkPhoto(scope.$index, scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="leasingManager" label="招商经理" width="150"/>
        <el-table-column prop="lastModifiedDate" label="创建时间" width="150" sortable="custom"/>
        <i class="el-dialog__close el-icon el-icon-close"/>
        <el-table-column label="网点二维码" align="left" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="downQRcode(1,scope.row)">
              查看
            </el-button>
            <el-button type="text" @click="downQRcode(2,scope.row)">
              保存
            </el-button>

          </template>
        </el-table-column>
      </el-table>
      <!--身份证-->
      <el-dialog :visible.sync="dialogVisibleCard" title="法人身份证" width="932px" class="legalCardDialog">
        <template>
          <div class="" style="display: flex;height:270px">
            <div style="flex:1;display:flex;margin-right:24px;background:rgba(238, 238, 238, 1);align-items: center;justify-content: center;">
            <img :src="card.legalFrontView" alt="" style="max-width:430px;max-height: 270px"></div>
            <div style="flex:1;display:flex;background:rgba(238, 238, 238, 1);align-items: center;justify-content: center;">
            <img :src="card.legalBackView" alt="" style="max-width:430px;max-height: 270px"></div>
          </div>
          <p class="p-text-legalCard">{{ card.legalCard }}</p>
          <span slot="footer" class="dialog-footer"/>
        </template>
      </el-dialog>
      <!--负责人照片-->
      <el-dialog
        :visible.sync="dialogVisibleChargePhoto"
        title="负责人照片"
        width="248px"
        height="415px"
        class="chargeNameDialog">
        <template>
          <div id="zhaopianbox">
            <img :src="chargePhoto.chargeUrl" alt="" style="width: 200px; height: 280px;">
          </div>
          <p class="p-text-one"><span style="margin-right:24px">{{ chargePhoto.chargeName }}</span><span>{{ chargePhoto.dealerCode }}</span>
          </p>
          <span slot="footer" class="dialog-footer"/>
        </template>
      </el-dialog>
      <!--网点证照-->
      <el-dialog
        :visible.sync="dialogVisibleNetworkPhoto"
        title="网点证照"
        width="932px"
        height="1102px">
        <div class="clearfix imgWrap">
          <div class="img-box-left left">
            <img :src="urlListFirst" alt="">

          </div>
          <div class="img-box-right right">
            <div
              v-for="(item,index) in urlList"
              :key="item.imageUrl"
              class="img-box-right-item"
              @click="changeImgUrl(index)">
              <img :src="item.imageUrl" alt="">
              <div v-if="imgShow !== index" class="img-cover"/>
            </div>
          </div>
        </div>
        <div class="left-footer">
          <span slot="footer" class="dialog-footer" left>
            <span>{{ urlListDesc }}</span>
            <span>{{ licenceNumber }}</span>
            <span><img src="../../assets/images/dealer/big-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/small-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/right-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/left-icon.png" alt=""></span>
          </span>
        </div>

      </el-dialog>
      <!--网点二维码 -->
      <el-dialog id="qr" :visible.sync="dialogVisibleQRcode" width="900px">
        <div id="pic" class="picFile">
          <img :src="QR"/>
        </div>
      </el-dialog>
      <paging-query :page="page" @change="getData"/>
    </div>
  </div>
</template>

<script>
import {shopInfoList, getLicencesList, getQrCode, getArea, downPic } from '../../js/shopInfo'
import * as html2canvas from 'html2canvas'
import PagingQuery from '../../components/pagingQuery'

export default {
  name: 'Basetable',
  components: {
    PagingQuery
  },
  data() {
    return {
      countyList: [],
      cityList: [],
      provinceList: [],
      tableData: [],
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      dialogVisible: false,
      status: 1,
      input: '',
      value: [],
      options: [{
        value: []
      }],
      QR: '',
      dealerAddress: '',
      dealerName: '',
      dialogVisibleChargePhoto: false,
      dialogVisibleCard: false,
      dialogVisibleNetworkPhoto: false,
      dialogVisibleQRcode: false,
      byId: '',
      urlListDesc: '',
      licenceNumber: '',
      urlListFirst: '',
      urlList: [],
      urlListId: '',
      signImages: [],
      imgShow: 0,
      plan: {
        dealerId: '',
        content: ''
      },
      card: {
        legalFrontView: '',
        legalBackView: '',
        legalCard: ''
      },
      chargePhoto: {
        chargeUrl: '',
        chargeName: '',
        dealerCode: ''
      },
      NetworkPhoto: {
        businessLicenseView: ''
      },
      // 查询条件
      condition: {
        dealerCode: '', // 网点编号
        dealerName: '', // 网点名称
        chargePhone: '', // 网点联系方式
        chargeName: '', // 负责人姓名
        legalName: '', // 法人姓名
        leasingManager: '', // 招商经理  createTime: '2019-03-01 15:14:23',
        province: '', // 注册地（省）
        city: '', // 注册地（市）
        county: '' // 注册地（区）
      },
      // 店铺属性字段
      store: {
        dealerCode: '', // 网点编号
        dealerName: '', // 网点名称
        creditCode: '', // 统一社会信用代码
        legalName: '', // 法人姓名
        legalCard: '', // 法人身份证号
        chargeName: '', // 负责人姓名
        legalSex: '', // 负责人性别
        chargePhone: '', // 网点联系方式
        chargePhoto: '', // 负责人照片"
        province: '', // 注册地（省）
        city: '', // 注册地（市）
        county: '', // 注册地（区）
        detailedAddress: '', // 详细地址
        licences: '', // 网点证照
        leasingManager: '', // 招商经理
        createTime: '', // 创建时间"
        qrCode: '' // 二维码
      },
      downloadimg:'',//保存图片
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        pageTotals:0,
        orderBy: 'lastModifiedDate desc'
      },
      file: {
        filename: ''
      }
    }
  },
  computed: {
    data() {
      return this.tableData
    }
  },
  created() {
    this.getProvince()
    this.getData()
  },
  methods: {
    sortChange(column, prop, order) {
            if (column.order == 'ascending') {
                this.page.orderBy = 'lastModifiedDate'
                this.getData()
            }
            if (column.order == 'descending') {
                this.page.orderBy = 'lastModifiedDate desc'
                this.getData()
            }
        },
    getCounty() {
      this.condition.county = ''
      const params = {
        areaType: 3,
        parentId: this.condition.city
      }
      getArea(params).then(res => {
        this.countyList = res.datas
      })
    },
    getProvince() {
      const params = {
        areaType: 1,
        parentId: '0000'
      }
      getArea(params).then(res => {
        this.provinceList = res.datas
      })
    },
    getCity() {
      this.condition.city = ''
      const params = {
        areaType: 2,
        parentId: this.condition.province
      }
      getArea(params).then(res => {
        this.cityList = res.datas
      })
    },
    // 切换证照
    changeImgUrl(index) {
      this.urlListFirst = this.urlList[index].imageUrl
      this.urlListDesc = this.urlList[index].imageDesc
      this.imgShow = index
      this.signImages = [this.urlList[index].imageUrl]
    },
    // 显示法人身份证照
    showLegalCard(index, row) {
      this.dialogVisibleCard = true
      this.card.legalBackView = row.legalBackView
      this.card.legalFrontView = row.legalFrontView
      this.card.legalCard = row.legalCard
    },
    // 显示负责人照片
    showChargePhoto(index, row) {
      this.dialogVisibleChargePhoto = true
      this.chargePhoto.chargeUrl = row.chargePhoto
      this.chargePhoto.chargeName = row.chargeName
      this.chargePhoto.dealerCode = row.dealerCode
    },
    // 显示网点证照
    showNetworkPhoto(index, row) {
      this.dialogVisibleNetworkPhoto = true
      this.NetworkPhoto.businessLicenseView = row.businessLicenseView
      this.urlListId = row.dealerId
      this.licenceNumber = row.dealerCode
      this.plan.dealerId = row.dealerId
      // 获取证照信息列表
      getLicencesList(this.plan).then(res => {
        this.urlList = res.datas
        this.urlListFirst = res.datas[0].imageUrl
        this.urlListDesc = res.datas[0].imageDesc
        this.signImages = [res.datas[0].imageUrl]
      })
    },
    // 获取列表数据
    getData() {
      this.condition.page = this.page
      shopInfoList(this.condition).then(res => {
        this.tableData = res.datas
        this.page.total = res.total
        this.page.pageNum = res.pageNum
        this.page.pageTotals = res.pageTotals
      }).catch(error => {
        this.$message.error(error + '')
      })
    },
    // 查询
    handSeach() {
      this.getData()
    },
    // select
    handleChange() {
    },
    // 刷新
    handFlush() {
      // 清空查询条件
      this.condition.dealerCode = ''// 网点编号
      this.condition.dealerName = '' // 网点名称
      this.condition.chargePhone = '' // 网点联系方式
      this.condition.chargeName = '' // 负责人姓名
      this.condition.legalName = '' // 法人姓名
      this.condition.leasingManager = '' // 招商经理
      this.condition.province = '' // 注册地（省）
      this.condition.city = '' // 注册地（市）
      this.condition.county = ''// 注册地（区）
      this.getData()
    },
    // 保存图片
    downQRcode(index,row) {
      getQrCode({dealerId:row.dealerId}).then(res => {
        if (res && res.msg) {
          this.downloadimg = res.msg
          this.QR = res.msg
          if (index === 1 && this.QR) {
            this.dialogVisibleQRcode = true
          } else if (index === 2 && this.downloadimg) {
            // 如果浏览器支持msSaveOrOpenBlob方法（使用IE浏览器时,调用该方法去下载图片)
            if (window.navigator.msSaveOrOpenBlob) {
             var bstr = atob(this.downloadimg.split(',')[1])
             var n = bstr.length
             var u8arr = new Uint8Array(n)
             while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
             }
             var blob = new Blob([u8arr])
             window.navigator.msSaveOrOpenBlob(blob, 'chart-download' + '.' + 'png')
            } else {
             // 这里就按照chrome等新版浏览器来处理
             const a = document.createElement('a')
             a.href = this.downloadimg
             a.setAttribute('download', 'chart-download.jpg')
             a.click()
            }
          }
        } else {
          this.$message.error('无二维码')
        }
      }).catch(error => {
         this.$message.error(error + '')
      })
    }
  }
}

</script>
<style>
  .shopInfoListWrap .el-table th {
    padding:0;
    line-height: 53px;
    box-sizing: border-box;
  }
  .shopInfoListWrap .el-table td {
    padding:15px 0;
    line-height: 53px;
    box-sizing: border-box;
  }
  .shopInfoListWrap .saveBtn .el-button--primary {
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }

 .shopInfoListWrap .container {
    padding: 24px 32px 0 32px;
    background: #FFF;
    min-width: 1560px;
    margin: 0;
    min-height: 956px;
  }

  .table {
    padding: 24px;
    padding-bottom: 0;
    background-color: #F0F2F5;
    overflow: auto;
  }

  .app-main {
    background-color: #F0F2F5;
  }

  .shopInfoListWrap .handle-box {
    margin-bottom: 24px;
  }

  .shopInfoListWrap .el-button {
    padding: 0 4px 0 0;
  }

  /* .shopInfoListWrap .el-button+.el-button{
    border-left:1px solid rgba(217,217,217,1);;
    border-radius: 0;
    margin:0;
    padding:0 0 0 8px;

  } */
  .shopInfoListWrap .myInput {
    width: 100%
  }

  .shopInfoListWrap .el-input__icon {
    line-height: 0;
  }

  /*  .shopInfoListWrap .handle-box{
      min-width: 1560px;
    }*/
  /*.shopInfoListWrap .el-table{
    min-width: 1560px;
  }*/
  .shopInfoListWrap .el-dialog__footer {
    display: none;
  }

  .shopInfoListWrap .p-text-one {
    text-align: center;
    padding-bottom: 24px;
    margin: 0;
    padding-top: 20px;
  }

  .shopInfoListWrap #qr .el-dialog__header {
    display: none;
  }
  .shopInfoListWrap #qr .el-dialog{
    background:transparent;
    box-shadow: none;
  }
  .shopInfoListWrap #qr .el-dialog__body {
    padding: 0;
    width: 900px;
    /* height: 636px;*/
    /*background: url("../../images/pic.png") no-repeat center;*/
  }

  .shopInfoListWrap .el-dialog__body {
    font-size: 14px;
    color: #333333;
    padding: 0 24px;
    /*padding:0;*/
  }

  .shopInfoListWrap .legalCardDialog .el-dialog__body {
    padding: 24px 24px 0;
  }

  .shopInfoListWrap .el-dialog__title {
    color: #333333;
    font-size: 16px;
  }

  .shopInfoListWrap .el-dialog__header {
    padding: 0 24px;
    height: 54px;
    border-bottom: solid 1px #D9D9D9;
    line-height: 54px;
  }

  .shopInfoListWrap .left-footer {
    text-align: left;
    padding: 20px 0;
  }

  .shopInfoListWrap .left-footer > span > span:nth-child(1) {
    margin-right: 32px;
  }

  .shopInfoListWrap .left-footer > span > span:nth-child(2) {
    margin-right: 240px;
  }

  .shopInfoListWrap .left-footer > span > span:nth-child(3) {
    margin-right: 32px;
  }

  .shopInfoListWrap .left-footer > span > span:nth-child(4) {
    margin-right: 32px;
  }

  .shopInfoListWrap .left-footer > span > span:nth-child(5) {
    margin-right: 32px;
  }

  .shopInfoListWrap .imgWrap {
    /*border-top: 1px solid rgba(217, 217, 217, 1);*/
    padding-top: 24px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .shopInfoListWrap .img-box-left {
    width: 670px;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    margin-right: 8px;
    height: 504px;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shopInfoListWrap .img-box-left > img {
    align-items: center;
    /* height: 504px;*/
    max-width: 670px;
    max-height: 504px;
  }

  .shopInfoListWrap .img-box-right {
    height: 504px;
    overflow: auto;
  }

  .shopInfoListWrap .img-box-right-item {
    position: relative;
    width: 184px;
    height: 138px;
    border-radius: 4px;
    background: rgba(238, 238, 238, 1);
    text-align: center;
    margin-bottom: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .shopInfoListWrap .img-box-right-item > img {
    max-width: 180px;
    max-height: 135px;
  }

  .shopInfoListWrap .img-box-right-item > .img-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51, 51, 51, 0.5);
    border-radius: 4px;
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
    margin-bottom: 1px;
  }

  .shopInfoListWrap .addSearch {
    /* min-width: 1560px;*/
  }

  .shopInfoListWrap .el-button--primary {
    height: 32px;
    width: 60px;
    line-height: 0;
    position: relative;
    background-color: #0082F0;
    padding: 0;
  }

  .shopInfoListWrap .addSearch .el-form-item__label {
    line-height: 32px;
  }

  .shopInfoListWrap .addSearch .el-form-item__content {
    line-height: 32px;
  }

  .shopInfoListWrap .el-form--inline .el-form-item {
    margin: 0 0 24px 0;
    width: 100%;
  }

  .shopInfoListWrap .el-input__inner {
    height: 32px;
    line-height: 32px;
  }

  .shopInfoListWrap .el-form--inline .el-form-item__content {
    width: 77%;
  }

  .shopInfoListWrap .chargeNameDialog .el-dialog__body {
    padding: 0;
  }
</style>

<style scoped>
  li, ul {
    list-style-type: none;
  }

  .handle-box {
    margin-bottom: 20px;
  }
  /*// .inptxt{width:300px; height: 32px; line-height: 32px;}*/
  .handle-box {
    clear: left;
  }

  #zhaopianbox {
    width: 200px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(238, 238, 238, 1);
    margin: 0 auto;
    margin-top: 24px;
    border-radius: 4px;
  }

  .img-box {
    display: flex;
  }

  .p-text {
    text-align: center;
    clear: left;
    padding-top: 22px;
  }

  .p-text-legalCard {
    text-align: center;
    padding: 12px 0 24px;
    margin: 0;
  }

  .img-box > div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(238, 238, 238, 1);
    width: 430px;
    height: 270px;
  }

  .img-box > div > img {
    width: 100%;
    max-height: 270px;
    max-width: 430px;
  }

  .img-box > div:nth-child(1) {
    text-align: left;
    margin-right: 10px;
  }

  .img-box > div:nth-child(2) {
    text-align: right;
  }

  .picFile {
    width: 100%;
    /*height: 385px;*/
    /* margin-bottom: 20px;*/
    overflow: hidden;
  }

  .picFile img {
    width: 100%;
  }

  .address {
    font-size: 13px;
    margin-top: 460px;
    margin-left: 460px;
    width: 220px;
    position: absolute;
    z-index: 99;
    color: #f5d074;
    line-height: 25px;
  }

  /*服务网点和地址的样式*/
  .address .ress {
    display: inline-block;
    width: 84%;
    /* margin-left: 60px;
    margin-top: -25px; */
    position: absolute;
    left: 60px;
    top: 2px;
    /* margin: -25px 0 0 60px; */
    /* font-size: 10px; */
  }

  .address > p {
    margin: 0;
    /*height: 50px;*/
    position: relative;
    line-height: 25px;
  }

  /*.address{*/
  /*font-size: 13px;*/
  /*margin-top: 280px;margin-left: 280px; width: 220px;*/
  /*position:absolute;z-index:99;*/
  /*color: #f5d074;*/
  /*line-height: 25px;*/
  /*}*/
  .code {
    margin-top: 289px;
    margin-left: 125px;
    width: 100px;
    position: absolute;
    z-index: 99;
    line-height: 30px;
  }

  .logo {
    margin-top: 400px;
    margin-left: 235px;
    width: 30px;
    position: absolute;
    z-index: 99;
    line-height: 30px;
  }

  /*.el-dialog__body {*/
  /*padding: 0px 0px;*/
  /*color: #606266;*/
  /*font-size: 14px;*/
  /*}*/
</style>
