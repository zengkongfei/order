<template>
  <div class="orderForGoodsInfo" id="editstd">
    <div class="table">
      <div class="container">
        <div class="logoTitle save-btn">
          <div class="logoTitleWrap">
            <img src="../../images/top_images/logo.png">
            <p>订单详情</p>
            <div class="buttons">
              <el-button type="primary" v-if="stu===1||stu===2" @click="DeclarationForm(3)">报单</el-button>
              <el-button type="primary" v-if="stu===1||stu===2" @click="DeclarationForm(7)">关闭</el-button>
              <el-button type="primary" v-if="stu===6" @click="DeclarationForm(6)">确认收货</el-button>
              <!-- 订单状态:1-待确认 2-审核不通过 3-已确认 4-已审核 5-已发货 6-已签收 7-已关闭 -->
            </div>
          </div>
        </div>
        <div class="content">
          <div class="content-table">
            <el-form ref="form">
              <el-form-item label="订单编号:">
                <span>{{ form.number }}</span>
              </el-form-item>
              <el-form-item label="订单总金额:">
                <span>
                  ￥
                  <span>{{ form.totalAmount }}</span>
                </span>
              </el-form-item>
              <el-form-item label="订单状态:">
                <span>{{status }}</span>
              </el-form-item>
              <el-form-item label="下单时间:" label-width="80">
                <span>{{form.createdDate }}</span>
              </el-form-item>
              <el-form-item label="订单商品项数:">
                <span>{{form.count }}</span>
              </el-form-item>
              <!-- <el-form-item label="订单方式:">
                <span>1111</span>
              </el-form-item> -->
              <el-form-item label="收货人:">
                <span> {{ form.consignee }}</span>
              </el-form-item>
              <el-form-item label="收货地址:">
                <span>{{ form.ddress }}</span>
              </el-form-item>
              <!-- <el-form-item label="运费:">
                <span>
                  ￥
                  <span>2222</span>
                </span>
              </el-form-item> -->
              <el-form-item label="会员编号:">
                <span>{{ form.memberCode }}</span>
              </el-form-item>
              <el-form-item label="收货人电话:">
                <span>{{ form.mobile }}</span>
              </el-form-item>
              <!-- <el-form-item label="货运方式:">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="订单备注:">
                <span>{{ form.orderNotes }}</span>
              </el-form-item>
              <el-form-item label="下单网点:" style="margin-right:33.59%;">
                <span>{{ form.dealerName }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="catGoods">
            <el-tabs v-model="myItem" type="card" @tab-click="handleClick">
              <el-tab-pane label="商品详情" name="first">
                <!-- 商品详情列表 -->
                <el-table :data="items" border height="334"  >
                <el-table-column type="index"  label="序号" width="150">
                </el-table-column>
                <el-table-column prop="mainImage" label="商品图片" width="150">
                  <template slot-scope="scope">
                    <img :src="scope.row.mainImage" width="86px" height="86px" alt="" />
                  </template>
                </el-table-column>
                <el-table-column prop="itemNumber" label="商品编号" width="150">
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="150">
                </el-table-column>
                <el-table-column prop="realPrice" label="零售价" width="150">
                </el-table-column>
                <el-table-column prop="number" label="商品数量" width="150">
                </el-table-column>
                <el-table-column prop="amount" label="金额" width="150">
                </el-table-column>
              </el-table>
              </el-tab-pane>
              <el-tab-pane label="订单日志" name="second">
                <!-- 订单日志列表 -->
              <el-table :data="itemLogs" border height="334" >
                  <el-table-column type="index" label="序号" width="150">
                  </el-table-column>
                  <el-table-column prop="createdDate" label="时间" width="150">
                  </el-table-column>
                  <el-table-column prop="createdBy" label="操作人" width="150">
                  </el-table-column> 
                  <el-table-column prop="logNotes" label="说明" width="150">
                  </el-table-column>
              </el-table> 
              </el-tab-pane>
            </el-tabs> 
            </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import {getOrderById,updateOrderStatus} from '@/js/indentInfo'

export default {
  data() {
    return {
      form: {
          consignee: '',//收货人
          count: '',//商品项数
          createdDate: '',//订单日期
          dealerName: '',//下单网点
          ddress: '',//收货地址
          id: '',//订单id
          memberCode: '',//会员编号
          mobile: '',//收货人电话
          number: '',//订单编号
          orderNotes: '',//订单备注
          totalAmount: '',//总金额
         
      },
      items: [],
      itemLogs: [],
      myItem: 'first',
      stu: '',
      status: '',
      id: 'fe24a2ac-e287-417d-a6ea-6096b1ef9d29', // this.$route.query.id 
      itemForm: {
        id:'',
        status: ''
      }
    }
  },

  created() {
    this.getOrder()//调用获取订单信息
  },

  methods:{
    //点击标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getOrder() {
      //获取订单信息
        getOrderById(this.id).then(res => {
          console.log("订单信息",res.datas)
          if (res && res.datas) {
            this.form.consignee = res.datas.consignee//收货人
            this.form.count = res.datas.count//商品项数
            this.form.createdDate = res.datas.createdDate//下单时间
            this.form.dealerName = res.datas.dealerName//下单网点
            this.form.ddress = res.datas.ddress//收货地址
            this.form.id = res.datas.id//订单id
            this.itemForm.id = res.datas.id
            this.form.memberCode = res.datas.memberCode//会员编号
            this.form.mobile = res.datas.mobile//收货人手机号
            this.form.number = res.datas.number//订单编号
            this.form.orderNotes = res.datas.orderNotes//订单编号
            this.stu = res.datas.status//订单状态
            this.form.totalAmount = res.datas.totalAmount//订单总金额
            this.form.orderNotes = res.datas.orderNotes//订单备注
            this.items = res.datas.items  //商品详情
            this.itemLogs = res.datas.itemLogs //订单日志
          }
        }).catch(error => {
          this.$message.error(error + '')
        })
    },
    // 报单
    DeclarationForm(item) {
      if(item === 3) {
        this.itemForm.status = 3
      }
      if(item === 7) {
        this.itemForm.status = 7
      }
      if(item === 6) {
        this.itemForm.status = 6
      }
      updateOrderStatus(this.itemForm)
        .then(res => {
          this.$message.success(res.msg)
          this.$router.push("/indent/indentlist");
        })
        .catch(error => {
          this.$message.error(error + "");
      })
    }
  },
  watch:{
    stu(val) {
      switch (val) {
        case 1:
          this.status = '待确认'
          break;
        case 2:
          this.status = '审核不通过'
          break;
        case 3:
          this.status = '已确认'
          break;
        case 4:
          this.status = '已审核'
          break;
        case 5:
          this.status = '已发货'
          break;
        case 6:
          this.status = '已签收'
          break;
        case 7:
          this.status = '已关闭'
          break;
      }
    }
  }
}
</script>
    <style scoped>
.content {
  background-color: #fff;
  margin-top: 24px;
  width: 100%;
  padding-top: 69px;
}
.content-table,
.catGoods {
  width: 1136px;
  margin: 0 auto;
}
.el-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.el-form-item {
  width: 33%;
}

.content-table >>> .el-form-item__content span {
  font-size: 14px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.content-table >>> .el-select {
  width: 302px;
}

/* 分类按钮 */
.catGoods >>> .el-tabs__header {
  border: 1px solid transparent;
}
.catGoods >>> .el-tabs__nav {
  border-bottom: 1px solid #e4e7ed;
}
</style>
<style>
.orderForGoodsInfo .el-form-item__label {
  padding-right: 12px;
}

#select-type .el-select input {
  width: 640px;
}

.orderForGoodsInfo .container {
  overflow: auto;
  min-width: 1136px;
}

.orderForGoodsInfo .operation-dialog > i {
  color: white;
}

.orderForGoodsInfo .operation-dialog {
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

.orderForGoodsInfo .logoTitle {
  background: #fff;
  height: 80px;
  /* padding: 0 200px;*/
  text-align: center;
  line-height: 80px;
  margin-bottom: 24px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}

.orderForGoodsInfo .logoTitleWrap {
  width: 1136px;
  margin: 0 auto;
}

.orderForGoodsInfo .logoTitle p {
  color: #000000;
  font-size: 16px;
}

.orderForGoodsInfo .logoTitle img {
  float: left;
  width: 120px;
  height: 40px;
  margin-top: 20px;
}

.orderForGoodsInfo .logoTitle .el-button {
  float: right;
  margin-top: -70px;
}
</style>
<style scoped>
/* 按钮组 */
.buttons {
  display: flex;
  float: right;
}
.buttons .el-button--primary {
  height: 32px;
  padding: 0;
  padding: 9px 16px;
  background-color: #0082f0;
}
</style>


