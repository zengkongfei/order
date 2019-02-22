<template>
  <div class="table">
    <div class="container">
      <div class="addSearch">
        <el-form ref="plan" :model="plan" :inline="true" label-width="150">
          <el-row>
            <el-col :span="12">
              <el-form-item label="会员编号" style="float: left;">
                <el-input v-model="plan.memberCode" placeholder="请输入会员编号" class="inptxt"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系方式" style="float: right;">
                <el-input v-model="plan.contactWay" placeholder="请输入会员联系方式" class="inptxt"/>
              </el-form-item>
            </el-col>
          </el-row>




        </el-form>
      </div>
      <div class="handle-box">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
      <el-table :data="tableData" border empty-text="暂无数据" >
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
          :total="total"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>

  </div>
</template>

<script>
import { memberList } from '../../js/vipmanagement'
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
      name: '',
      total: '',
      plan: {
        contactWay: '',
        dealerId: '',
        memberCode: ''
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
        this.tableData = res.datas
        this.total = res.total
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
      this.plan.contactWay = ''
      this.plan.dealerId = ''
      this.plan.memberCode = ''
      this.getData()
    }
  }
}

</script>

<style scoped>
  li, ul {list-style-type: none;}
 .handle-box {margin-bottom: 20px;}
.table {margin: 20px;}  .el-pagination {text-align: right;margin: 20px 0;}
  .contactWay{
    margin-left: 68%;
  }
  .inptxt{width:684px;}
  .handle-box{ clear: left;}
</style>
