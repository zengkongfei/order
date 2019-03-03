<template>
  <div class="table">
    <div class="container">
      <div class="addSearch">
        <el-form ref="plan" :model="condition" :inline="true" label-width="120">
          <el-row>
            <el-col :span="8">
              <el-form-item label="网点编号:" style="float: right;margin-right: 28%">
                <el-input v-model="condition.dealerCode" placeholder="请输入网点编号" class="inptxt"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网点名称:" style="float: right;margin-right: 15%">
                <el-input v-model="condition.dealerName" placeholder="请输入网点名称" class="inptxt"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="网点联系方式:" style="float: right;">
                <el-input v-model="condition.chargePhone" placeholder="请输入网点联系方式" class="inptxt"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="负责人姓名:" style="float: right;margin-right: 28%">
                <el-input v-model="condition.chargeName" placeholder="请输入负责人姓名" class="inptxt"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="法人姓名:" style="float: right;margin-right: 15%">
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
              <el-form-item label="注册地(省):" style="float: right;margin-right: 28%">
                <el-input v-model="condition.province" placeholder="请选择注册地(省)" class="inptxt"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注册地(市):" style="float: right;margin-right: 15%">
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
      <div class="handle-box">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
      <el-table :data="tableData" :header-cell-style="{background:'rgba(250,250,250,1)'}" empty-text="暂无数据" >
        <el-table-column prop="dealerCode" label="网点编号" width="150"/>
        <el-table-column prop="dealerName" label="网点名称" width="150"/>
        <el-table-column prop="creditCode" label="统一社会信用代码" width="150"/>
        <el-table-column prop="legalName" label="法人姓名" width="80"/>
        <el-table-column label="法人身份证号" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="showLegalCard(scope.$index, scope.row)">
              {{ scope.row.legalCard }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="chargeName" label="负责人姓名" width="90"/>
        <el-table-column label="负责人性别" width="90" align="left">
          <template slot-scope="scope">
            <span>{{ scope.row.chargeSex == 0 ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chargePhone" label="网点联系方式" width="120"/>
        <el-table-column label="负责人照片" width="90" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="showChargePhoto(scope.$index, scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="注册地（省）" width="120"/>
        <el-table-column prop="city" label="注册地（市）" width="120"/>
        <el-table-column prop="county" label="注册地（县）" width="120"/>
        <el-table-column prop="detailedAddress" label="详细地址" width="100"/>
        <el-table-column label="网点证照" width="80" align="left">
          <template slot-scope="scope">
            <el-button type="text" @click="showNetworkPhoto(scope.$index, scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="leasingManager" label="招商经理" width="80"/>
        <el-table-column prop="createTime" label="创建时间" width="100"/><i class="el-dialog__close el-icon el-icon-close"/>
        <el-table-column label="网点二维码" align="left" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="showQRcode(scope.$index, scope.row)">
              查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--身份证-->
      <el-dialog :visible.sync="dialogVisibleCard" title="法人身份证" width="30%">
        <template>
          <div class="img-box">
            <div><img :src="card.legalFrontView" alt="" ></div>
            <div><img :src="card.legalBackView" alt="" ></div>
          </div>
          <p class="p-text">{{ card.legalCard }}</p>
          <span slot="footer" class="dialog-footer"/>
        </template>
      </el-dialog>
      <!--负责人照片-->
      <el-dialog :visible.sync="dialogVisibleChargePhoto" title="负责人照片" width="248px" height="415px">
        <template>
          <div id="zhaopianbox">
            <img :src="chargePhoto.chargeUrl" alt="" style="width: 200px; height: 280px;">
          </div>
          <p class="p-text-one"><span>{{ chargePhoto.chargeName }}</span><span>{{ chargePhoto.dealerCode }}</span></p>
          <span slot="footer" class="dialog-footer"/>
        </template>
      </el-dialog>
      <!--网点证照-->
      <el-dialog :visible.sync="dialogVisibleNetworkPhoto" title="网点证照" width="932px" height="1102px">
        <div class="clearfix imgWrap">
          <div class="img-box-left left">
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
            <span><img src="../../assets/images/dealer/big-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/small-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/right-icon.png" alt=""></span>
            <span><img src="../../assets/images/dealer/left-icon.png" alt=""></span>
          </span>
        </div>
      </el-dialog>
      <!--网点二维码-->
      <el-dialog id="qr" :visible.sync="dialogVisibleQRcode" width="554px" height="535px" style="display: none">
        <div class="address">
          <p><span id="site">服务网点:<span id="siteName" class="ress">{{ dealerName }}</span></span>
          </p>
          <p><span id="address" >地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:<span id="addressContent" class="ress">{{ dealerAddress }}</span></span>
          </p>
        </div>
        <div class="code">
          <img id="code" :src="QR" width="160px">
        </div>
        <div class="logo">
          <img id="logo" src="../../images/logo.jpg" width="30px">
        </div>
        <div class="picFile">
          <img src="../../images/pic.png">
        </div>
      </el-dialog>
      <div id="pagination" class="pagination">
        <el-pagination
          :total="total"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import { shopInfoList, getLicencesList, getQrCode } from '../../js/shopInfo'
export default {
  name: 'Basetable',
  data() {
    return {
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

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 10
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
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getData()
    },
    // 显示二维码
    showQRcode(index, row) {
      this.dealerCode = row.dealerCode
      this.dialogVisibleQRcode = true
      this.plan.content = process.env.BASE_DOWN_API + '?dealerCode=' + this.dealerCode
      this.plan.dealerId = row.dealerId
      // 获取证照信息列表
      getQrCode(this.plan).then(res => {
        this.QR = res.datas.qrCode
        this.dealerAddress = res.datas.dealerAddress
        this.dealerName = res.datas.dealerName
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
        alert(res.total)
        this.total = res.total
        // if (res.total === 0) {
        //   document.getElementById('pagination').style.setProperty('display', 'none', 'important')
        // }
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
    }
  }
}

</script>

<style scoped>
   li, ul {list-style-type: none;}
  .handle-box {margin-bottom: 20px;}
  .table {margin: 20px;}
  .inptxt{width:300px; height: 32px; line-height: 32px;}
  .handle-box{ clear: left;}
  .container{ padding: 0 24px ;}
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
   .picFile {
     width: 100%;
     height: 385px;
     margin-bottom: 20px;
     overflow: hidden;
   }
   .picFile img {
     width: 100%;
   }
   .address {
     font-size: 13px;
     margin-top: 264px;
     margin-left: 280px;
     width: 220px;
     position: absolute;
     z-index: 99;
     color: #f5d074;
     line-height: 25px;
   }
   /*服务网点和地址的样式*/
   .address .ress {
     display: inline-block;
     width:84%;
     /* margin-left: 60px;
     margin-top: -25px; */
     position: absolute;
     left:60px;
     top:2px;
     /* margin: -25px 0 0 60px; */
     /* font-size: 10px; */
   }
   .address >p{
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
     margin-top: 172px;
     margin-left: 72px;
     width: 100px;
     position: absolute;
     z-index: 99;
     line-height: 30px;
   }
   .logo {
     margin-top: 240px;
     margin-left: 143px;
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
