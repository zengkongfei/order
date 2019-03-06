<template>
  <div class="table memberInfoWrap">
    <div class="container">
      <div class="addSearch">
        <el-form ref="plan" :model="plan" :inline="true" label-width="85px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="会员编号：" style="float: left;">
                <el-input v-model="plan.memberCode" placeholder="请输入会员编号" class=""/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式：" style="float: right;">
                <el-input v-model="plan.contactWay" placeholder="请输入会员联系方式" class=""/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="网点编号：" style="float: left;">
                <el-input v-model="plan.dealerCode" placeholder="请输入网点编号" class=""/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="网点名称：" style="float: right;">
                <el-input v-model="plan.dealerName" placeholder="请输入网点名称" class=""/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="handle-box">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{background:'rgba(250,250,250,1)'}"
        :default-sort = "{prop: 'registerTime', order: 'descending'}"
        empty-text="暂无数据"
      >
        <el-table-column prop="memberCode" label="会员编号" width="200"/>
        <el-table-column prop="contactWay" label="联系方式" width="200"/>
        <el-table-column prop="dealerCode" label="网点编号"/>
        <el-table-column prop="dealerName" label="网点名称"/>
        <el-table-column prop="province" label="注册地（省）"/>
        <el-table-column prop="city" label="注册地（市）"/>
        <el-table-column prop="county" label="注册地（县）"/>
        <el-table-column prop="createdDate" sortable label="注册时间"/>
      </el-table>
      <paging-query :page="page" @change="getData"/>
    </div>
  </div>
</template>
<script>
import { memberList } from '../../js/vipmanagement'
import PagingQuery from '../../components/pagingQuery'
import {
    getUserInfo
} from '../../js/userInfo.js'
export default {
  name: 'Basetable',
  components: {
    PagingQuery
  },
  data() {
    return {
      phone: '',
      tableData: [],
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      dialogVisible: false,
      status: 1,
      input: '',
      value: [],
      options: [
        {
          value: []
        }
      ],
      name: '',

      plan: {
        contactWay: '',
        chargePhone: '',
        dealerId: '',
        memberCode: '',
        dealerCode: '',
        dealerName: ''
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
      },
      // total: 0,
      page: {
        total: 0,
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
    this.getUserInfo()
    this.getData()
  },
  methods: {
    getuser() {
            getUserInfo().then(res => {
                console.log('res', res)
                this.phone = res.datas.chargePhone
            })
        },
    // 分页导航
    handleCurrentChange(val) {
      this.page.pageNum = val
      this.getData()
    },
    getData() {
      this.plan.page = this.page
      this.plan.chargePhone = this.phone
      console.log(this.plan)
      memberList(this.plan)
        .then(res => {
          this.tableData = res.datas
          this.page.total = res.total
          this.page.pageNum = res.pageNum
          console.log('res',res)
        })
        .catch(error => {
          this.$message.error(error + '')
        })
    },
    // 查询
    handSeach() {
      this.getData()
    },
    // select
    handleChange() {},
    // 刷新
    handFlush() {
      this.plan.contactWay = ''
      this.plan.dealerId = ''
      this.plan.memberCode = ''
      this.plan.dealerCode = ''
      this.plan.dealerName = ''
      this.getData()
    }
  }
};
</script>
<style>
  .table{
    padding: 24px;
    padding-bottom: 0;
    background-color: #F0F2F5;
    overflow: auto;
  }
  .app-main{
    background-color: #F0F2F5;
  }
  .memberInfoWrap .handle-box{
    margin-bottom:24px;
  }
  .memberInfoWrap .handle-box .el-button{
    height: 32px;
    width: 60px;
    line-height: 0px;
    position: relative;
    background-color: #0082F0;
    padding:0;
  }
  .memberInfoWrap .addSearch .el-form--inline .el-form-item__content{
    width:88%;
  }
 .memberInfoWrap .addSearch .el-input__inner{
   line-height: 32px;
   height:32px;
  }
  .memberInfoWrap .addSearch .el-form--inline .el-form-item__content{
    line-height: 32px;
  }
  .memberInfoWrap .addSearch .el-form-item__label{
    line-height: 32px;
  }
  .memberInfoWrap .addSearch .el-form-item{
    margin:0 0 24px 0;
    width:100%;
  }
</style>
<style scoped>
li,
ul {
  list-style-type: none;
}
.handle-box {
  margin-bottom: 20px;
}
.container{
  padding: 24px 32px 0 32px;
  background: #FFF;
  min-width: 1560px;
  margin: 0;
  min-height: 900px;
  overflow: auto;
}
.el-pagination {
  text-align: right;
  margin: 20px 0;
}
.contactWay {
  margin-left: 68%;
}
.inptxt {
  width: 684px;
  height: 32px;
  line-height: 32px;
}
.handle-box {
  clear: left;
}

</style>
