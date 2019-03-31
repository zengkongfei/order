<template>
  <div id="aptiucon" class="aptitudeWrap">
    <div class="container">
      <div class="table" >
        <div class="addSearch">
          <el-form ref="plan" :model="condition" :inline="true" label-width="120">
            <el-row>
              <el-col :span="8">
                <el-form-item label="网点编号：" style="float: left;margin-left: 5%">
                  <el-input v-model="condition.dealerCode" placeholder="请输入网点编号" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="网点名称:" style="float: left;margin-left: 5%">
                  <el-input v-model="condition.dealerName" placeholder="请输入网点名称" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="网点联系方式:" style="float: right;margin-left: 5%">
                  <el-input v-model="condition.chargePhone" placeholder="请输入网点联系方式" class="inptxt"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="负责人姓名:" style="float: right;margin-right: 0%">
                  <el-input v-model="condition.chargeName" placeholder="请输入负责人姓名" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人姓名:" style="float: left;margin-right: 15%">
                  <el-input v-model="condition.legalName" placeholder="请输入法人姓名" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="招商经理:" style="float:right">
                  <el-input v-model="condition.leasingManager" placeholder="请输入招商经理" class="inptxt"/>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册地(省):" style="float: left;margin-right: 28%">
                  <el-input v-model="condition.province" placeholder="请选择注册地(省)" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册地(市):" style="float: left;margin-right: 15%">
                  <el-input v-model="condition.city" placeholder="请选择注册地(市)" class="inptxt"/>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="注册地(区):" style="float: right;">
                  <el-input v-model="condition.county" placeholder="请选择注册地(区)" class="inptxt"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="form-search" style="min-width:1560px">
          <el-button v-if="isadd" type="primary" icon="search" @click="handAdd">新增</el-button>
          <el-button v-if="isquery" type="primary" icon="search" @click="handSeach">查询</el-button>
          <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
        </div>
        <div class="tabel-info" style="min-width:1560px">
          <el-table :data="tableData" :header-cell-style="{background:'rgba(250,250,250,1)'}">
            <el-table-column prop="dealerCode" label="网点编号" width="150" />
            <el-table-column prop="dealerName" label="网点名称" width="200" />
            <el-table-column prop="creditCode" label="统一社会信用代码" width="200" />
            <el-table-column prop="legalName" label="法人姓名" width="150" />
            <el-table-column label="法人身份证号" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="showLegalCard(scope.$index, scope.row)">
                  {{ scope.row.legalCard }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="chargeName" label="负责人姓名" width="150" />
            <el-table-column label="负责人性别" width="150" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.chargeSex == 0 ? '男' : '女' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="chargePhone" label="负责人联系方式" width="150" />
            <el-table-column label="负责人照片" width="150" align="left">
              <template slot-scope="scope">
                <el-button type="text" @click="showChargePhoto(scope.$index, scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="province" label="注册地（省）" width="150" />
            <el-table-column prop="city" label="注册地（市）" width="150" />
            <el-table-column prop="county" label="注册地（县）" width="150" />
            <el-table-column prop="detailedAddress" label="详细地址" width="250" />
            <el-table-column label="网点证照" width="150" align="left">
              <template slot-scope="scope">
                <el-button type="text" @click="showNetworkPhoto(scope.$index, scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="网点二维码" align="left" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="showQRcode(scope.$index, scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="leasingManagerName" label="招商经理" width="150" />
            <el-table-column v-if="isedit" label="控制" align="left" width="150">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.dealerStatus === 1 ? false : true" type="text" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <paging-query :page="page" @change="getData" />

        <!--身份证-->
        <el-dialog :visible.sync="dialogVisibleCard" title="法人身份证" width="30%">
          <template>
            <div class="img-box">
              <div><img :src="card.legalFrontView" alt=""></div>
              <div><img :src="card.legalBackView" alt=""></div>
            </div>
            <p class="p-text">{{ card.legalCard }}</p>
            <span slot="footer" class="dialog-footer"/>
          </template>
        </el-dialog>
        <!--负责人照片-->
        <el-dialog :visible.sync="dialogVisibleChargePhoto" title="负责人照片" width="248px" height="415px">
          <template>
            <div id="zhaopianbox">
              <img :src="urlCharge" alt="">
            </div>
            <p class="p-text-one"><span>{{ nameCharge }}</span><span>{{ numberCharge }}</span></p>
            <span slot="footer" class="dialog-footer"/>
          </template>
        </el-dialog>
        <!--网点证照-->
        <el-dialog :visible.sync="dialogVisibleNetworkPhoto" title="网点证照" width="932px" height="1102px">
          <div class="clearfix imgWrap">
            <div class="img-box-left left">
              <!--<viewer :images="signImages">
      <img v-for="src in signImages" :src="src" :key="src">
    </viewer>-->
              <img :src="urlListFirst" alt="">

            </div>
            <div class="img-box-right right">
              <div v-for="(item,index) in urlList" :key="item.imageUrl" class="img-box-right-item" @click="changeImgUrl(index)">
                <img :src="item.imageUrl" alt="" >
                <div v-if="imgShow !== index" class="img-cover"/>
              </div>
            </div>
          </div>
          <div class="left-footer">
            <span slot="footer" class="dialog-footer" left>
              <span>{{ urlListDesc }}</span>
              <span>{{ licenceNumber }}</span>
              <!--<span><img src="../../assets/images/dealer/big-icon.png" alt=""></span>-->
              <!--<span><img src="../../assets/images/dealer/small-icon.png" alt=""></span>-->
              <!--<span><img src="../../assets/images/dealer/right-icon.png" alt=""></span>-->
              <!--<span><img src="../../assets/images/dealer/left-icon.png" alt=""></span>-->
            </span>
          </div>

        </el-dialog>
        <!--网点二维码-->
        <el-dialog :visible.sync="dialogVisibleQRcode" title="网点二维码" width="445px" height="535px">
          <div class="img-box-one">
            <img :src="this.QR" alt="">
          </div>
          <p class="p-text-one"><span>网点编号：</span><span>{{ dealerCode }}</span></p>
          <span slot="footer" class="dialog-footer"/>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  dealerList
} from '../../js/employee'
// import {
//   getRoles
// } from '@/utils/auth'
// import {
//   isContanis
// } from '../../utils/index.js'
export default {
  name: 'Basetable',
  data() {
    return {
      isadd: false,
      isedit: false,
      isquery: false,
      signImages: [],
      imgShow: 0,
      QR: '',
      byId: '',
      urlListDesc: '',
      licenceNumber: '',
      urlListFirst: '',
      urlList: [],
      urlListId: '',
      dialogVisibleQRcode: false,
      dialogVisibleNetworkPhoto: false,
      dialogVisibleChargePhoto: false,
      dialogVisibleCard: false,
      cityId: '',
      cityList: [],
      provinceList: [],
      tableData: [],
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      dialogVisible: false,
      status: 1,
      input: '',
      name: '',
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
      rules: {
        name: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }]
      },
      page: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        orderBy: 'last_modified_date desc'
      },
      dealerCode: '',
      urlCharge: '',
      nameCharge: '',
      numberCharge: '',
      card: {
        legalFrontView: '',
        legalFrontView: '',
        legalCard: ''
      },
      NetworkPhoto: {
        businessLicenseView: ''
      }
    }
  },
  computed: {
    data() {
      return this.tableData
    }
  },
  created() {
    this.getData()
    this.getProvince()
    // const array = JSON.parse(getRoles())
    // this.isadd = isContanis(array, 'add')
    // this.isedit = isContanis(array, 'edit')
    // this.isquery = isContanis(array, 'query')
  },
  methods: {
    provingDealerCode() {
      this.plan.dealerCode = this.plan.dealerCode.replace(/[^0-9A-Za-z]+/, '')
    },
    provingDealerName() {
      // this. plan.dealerName = this. plan.dealerName.replace(/[^\u4E00-\u9FA5]/g,'')
    },
    provingChargeName() {
      this.plan.chargeName = this.plan.chargeName.replace(/[^\u4E00-\u9FA5]/g, '')
    },
    provingManagerName() {
      // this. plan.leasingManagerName = this. plan.leasingManagerName.replace(/[^\u4E00-\u9FA5]/g,'')
    },
    // handleSizeChange(val) {
    //   this.page.pageSize = val
    //   this.getData()
    //   console.log(`每页 ${val} 条`)
    // },
    // handleCurrentChange(val) {
    //   this.page.pageNum = val
    //   this.getData()
    //   console.log(`当前页: ${val}`)
    // },
    changeImgUrl(index) {
      this.urlListFirst = this.urlList[index].imageUrl
      this.urlListDesc = this.urlList[index].imageDesc
      this.imgShow = index
      this.signImages = [this.urlList[index].imageUrl]
    },
    showQRcode(index, row) {
      this.dealerCode = row.dealerCode
      this.dialogVisibleQRcode = true
      this.QR = row.qrCode
      //console.log(this.QR, '二维码')
    },
    showNetworkPhoto(index, row) {
      this.dialogVisibleNetworkPhoto = true
      this.NetworkPhoto.businessLicenseView = row.businessLicenseView
      this.urlListId = row.id
      this.byId = row.id
      this.licenceNumber = row.dealerCode
      getVoucherImage(this.urlListId).then(res => {
        //console.log(res, '网点-数据')
        this.urlList = res.datas
        this.urlListFirst = res.datas[0].imageUrl
        this.urlListDesc = res.datas[0].imageDesc
        this.signImages = [res.datas[0].imageUrl]
      })
    },
    showChargePhoto(index, row) {
      this.dialogVisibleChargePhoto = true
      //console.log(row)
      this.urlCharge = row.chargePhoto
      this.nameCharge = row.chargeName
      this.numberCharge = row.dealerCode
    },
    showLegalCard(index, row) {
      this.dialogVisibleCard = true
      this.card.legalBackView = row.legalBackView
      this.card.legalFrontView = row.legalFrontView
      this.card.legalCard = row.legalCard
    },
    getCity() {
      this.plan.city = ''
      const params = {
        areaType: 2,
        parentId: this.plan.province
      }
      getArea(params).then(res => {
        //console.log(res, '市')
        this.cityList = res.datas
      })
    },
    getData() {
      this.plan.page = this.page
      dealerList(this.plan).then(res => {
        this.tableData = res.datas
        this.page.total = res.total
        //console.log(res, 'table数据')
      }).catch(error => {
        this.$message.error(error + '')
      })
    },
    handleEdit(index, row) {
      this.idx = index
      this.id = row.id
      //console.log(row.id)
      this.$router.push({
        path: '/branch/brabnEdit/' + row.id
      })
    },
    // 查询
    handSeach() {
      //console.log(this.plan, 'plan')
      this.getData()
    },
    getProvince() {
      const params = {
        areaType: 1,
        parentId: '0000'
      }
      getArea(params).then(res => {
        //console.log(res, '省')
        this.provinceList = res.datas
      })
    },
    // 刷新
    handFlush() {
      this.plan.chargeName = ''
      this.plan.city = ''
      this.plan.dealerCode = ''
      this.plan.dealerName = ''
      this.plan.leasingManagerName = ''
      this.plan.province = ''
      this.getData()
    },
    // 新增
    handAdd(row) {
      this.$router.push('/branch/branAdd')
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
    margin-bottom: 7px;
  }

  .form-search {
    padding-top: 4px;
    margin-bottom: 24px;
  }

  .form-search .el-button--primary {
    height: 32px;
    width: 60px;
    line-height: 0;
    position: relative;
    background-color: #0082F0;
  }

  .form-search .el-button--primary span {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  .page {
    margin-top: 32px;
    float: right;
    margin-right: 24px;
  }

  .el-table thead {
    color: #333333;
  }

  .has-gutter {
    background-color: #ccc;
  }
</style><style scoped>

  .imgWrap {
    /*border-top: 1px solid rgba(217, 217, 217, 1);*/
    padding-top: 24px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .img-box-left {
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

  .img-box-left>img {
    align-items: center;
    /* height: 504px;*/
    max-width: 670px;
    max-height: 504px;
  }

  .img-box-right {
    height: 504px;
    overflow: auto;
  }

  .img-box-right-item {
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

  .img-box-right-item>img {
    max-width: 180px;
    max-height: 135px;
  }

  .img-box-right-item>.img-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51, 51, 51, 0.5);
    border-radius: 4px;
  }

  .p-text-one {
    text-align: center;
  }

  .p-text-one>span:nth-child(1) {
    margin-right: 10px;
  }

  .img-box-one {
    text-align: center;
    height: 400px;
    width: 400px;
    margin-top: 24px;
  }

  .img-box {
    padding-top: 24px;
    height: 270px;
  }

  .img-box-one>img {
    width: 400px;
    height: 400px;

  }

  .p-text {
    text-align: center;
    clear: left;
    padding-top: 22px;
  }

  .img-box {
    display: flex;
  }

  .img-box>div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(238, 238, 238, 1);
    width: 430px;
    height: 270px;
  }

  .img-box>div>img {
    width: 100%;
    max-height: 270px;
    max-width: 430px;
  }

  .img-box>div:nth-child(1) {
    text-align: left;
    margin-right: 10px;
  }

  .img-box>div:nth-child(2) {
    text-align: right;
  }

  li,
  ul {
    list-style-type: none;
  }

  .handle-box {
    margin-bottom: 20px;
  }

  .el-pagination {
    text-align: right;
    margin: 20px 0;
  }

  .left-footer {
    text-align: left;
    padding: 20px 0;
  }

  .left-footer>span>span:nth-child(1) {
    margin-right: 32px;
  }

  .left-footer>span>span:nth-child(2) {
    margin-right: 240px;
  }

  .left-footer>span>span:nth-child(3) {
    margin-right: 32px;
  }

  .left-footer>span>span:nth-child(4) {
    margin-right: 32px;
  }

  .left-footer>span>span:nth-child(5) {
    margin-right: 32px;
  }

  .container {
    padding: 24px;
    background-color: #F0F2F5;
    overflow: hidden;
  }

  .aptitudeWrap .table {
    padding: 24px 32px 0 32px;
    border-radius: 2px;
    min-height: 900px;
    background-color: #fff;
    overflow:auto;
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

  #zhaopianbox img {
    max-width: 100%;
    max-height: 100%;

  }

  .el-button+.el-button {
    margin-left: 3px;
  }
</style><style>
  .aptitudeWrap .el-dialog__header {
    padding: 0 24px;
    height: 54px;
    border-bottom: solid 1px #D9D9D9;
    line-height: 54px;
  }

  .aptitudeWrap .el-dialog__footer {
    padding-bottom: 0
  }

  .aptitudeWrap .el-dialog__body {
    font-size: 14px;
    color: #333333;
    padding: 0 24px;
  }

  .aptitudeWrap .el-dialog__title {
    color: #333333;
    font-size: 16px;
  }
  #aptiucon .myInput{ width: 100%}
  /*调整样式*/
  #aptiucon .el-form--inline .el-form-item{margin:0;width:100%}
  #aptiucon .el-form--inline .el-form-item__content{width: 85%;}
  .addSearch .el-form-item{ margin-bottom:16px;}
  #aptiucon .el-form-item__label{ padding: 0; }
  #aptiucon  .el-input__inner{ height: 32px; line-height: 32px;}
  #aptiucon .el-form-item {
    margin-bottom:16px;
  }
  #aptiucon label {
    font-weight:normal;
  }
  /*调整样式*/
  .inptxt{width:300px; height: 32px; line-height: 32px;}
  .handle-box{ clear: left;}
  .container{ padding: 0 24px ;}
</style>
