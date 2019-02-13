<template>
  <div class="table">
    <div class="container">
      <div class="addSearch">
        <el-form ref="plan" :model="plan" :inline="true" label-width="150">
          <el-form-item label="会员编号">
            <el-input v-model="plan.memberCode" placeholder="请输入会员编号"/>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="plan.contactPhone" placeholder="请输入会员联系方式"/>
          </el-form-item>
        </el-form>
      </div>
      <div class="handle-box">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
      <el-table :data="tableData" border>
        <el-table-column prop="memberCode" label="会员编号" width="200"/>
        <el-table-column prop="contactWay" label="联系方式" width="200"/>
        <el-table-column prop="dealerCode" label="网点编号" />
        <el-table-column prop="dealerName" label="网点名称" />
        <el-table-column prop="province" label="注册地（省）" />
        <el-table-column prop="city" label="注册地（市）" />
        <el-table-column prop="county" label="注册地（县）"/>
      </el-table>
      <div class="pagination">
        <el-pagination
          :total="1000"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>

  </div>
</template>

<script>
//import { dealerList, dealerAreas } from '../../js/employee'
import {memberList, vipInfoList} from '../../js/vipmanagement'
export default {
  name: 'Basetable',
  data() {
    return {
      tableData: [],
      cur_page: 1,
      editVisible: false,
      delVisible: false,
      dialogVisible: false,
      status: 1,      input: '',
      value: [],
      options: [{
        value: [],
      }],
      name: '',
      plan: {
        contactPhone: "",
        dealerId: "018ee962-eab6-4313-9354-0d5eb3370d12",
        memberCode: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
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
    getData() {
      this.plan.page = this.page
      console.log(this.plan)
      memberList(this.plan).then(res => {
        this.tableData=res.datas
        console.log(res.data)
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

    }
  }
}

</script>

<style scoped>
  li, ul {list-style-type: none;}
 .handle-box {margin-bottom: 20px;}
.table {margin: 20px;}  .el-pagination {text-align: right;margin: 20px 0;}
</style>
