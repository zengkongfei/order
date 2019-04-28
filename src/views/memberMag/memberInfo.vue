<template>
<div class="table memberInfoWrap">
    <div class="container">
        <div class="addSearch">
            <el-form ref="plan" :model="plan" :inline="true" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="会员编号：" >
                            <el-input v-model="plan.memberCode" placeholder="请输入会员编号"  @keyup.native="memberCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系方式：" >
                            <el-input v-model="plan.contactWay" placeholder="请输入会员联系方式"  @keyup.native="contactWay"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="网点编号：" >
                            <el-input v-model="plan.dealerCode" placeholder="请输入网点编号" @keyup.native="dealerCode"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="网点名称：" >
                            <el-input v-model="plan.dealerName" placeholder="请输入网点名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
            <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
        </div>
        <el-table :data="tableData" border :header-cell-style="{background:'rgba(250,250,250,1)'}" :default-sort="{prop: 'createdDate', order: 'descending'}" empty-text="暂无数据" @sort-change='sortChange' height='600px'>
            <el-table-column prop="memberCode" label="会员编号"  />
            <el-table-column prop="contactWay" label="联系方式" />         
            <el-table-column label="可用积分">
                <template slot-scope="scope">
                    <span>{{scope.row.memberIntegral}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="dealerCode" label="网点编号" />
            <el-table-column prop="dealerName" label="网点名称" />
            <el-table-column prop="province" label="注册地（省）" />
            <el-table-column prop="city" label="注册地（市）" />
            <el-table-column prop="county" label="注册地（县）" />
            <el-table-column prop="createdDate" label="注册时间" width="150px" sortable="custom" />
            <el-table-column label="下级会员" >
                <template slot-scope="scope">
                    <el-button type="text" @click="handleLast(scope.$index, scope.row)">查看
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column label="会员是否激活" width="150" align="left">
              <template slot-scope="scope">
                <span>{{ scope.row.isActivation === 0 ? '否' : '是' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="控制" >
                <template slot-scope="scope">
                    <el-button type="text"  v-if="scope.row.isActivation === 1"  @click="getMemberInfo(scope.row)">查看会员</el-button>
                    <el-button type="text" v-if="scope.row.isActivation === 0"  @click="activation(scope.row)">激活</el-button>
                </template>
            </el-table-column>
        </el-table>
        <paging-query :page="page" @change="getData" />

        <!--下级会员-->
        <el-dialog
            :visible.sync="dotDialogVisible"
            width="932px" class="dotDialog">
            <div class="d-h-box">
                <div class="d-h">
                    <span></span>
                    <span>下级会员</span>
                    <span></span>
                </div>
                <i class="el-icon-close d-h-close-icon" @click="closeLast"></i>
            </div>
            <div class="d-search clearfix" >
                <div class="left">
                    <el-form :inline="true" :model="form" class="demo-form-inline">
                        <el-row type="flex" class="row-bg">
                            <el-col :span="12" style="text-align: left">
                            <el-form-item label="会员编号：">
                                <el-input v-model="form.memberCode" placeholder="请输入会员编号" class="myInput-four"
                                        @keyup.native="memberCode1"></el-input>
                            </el-form-item>
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                            <el-form-item label="联系方式：">
                                <el-input v-model="form.contactWay" placeholder="请输入联系方式" class="myInput-four"
                                        @keyup.native="contactWay1"></el-input>
                            </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row type="flex" class="row-bg">
                            <el-col :span="12" style="text-align: left">
                            <el-form-item label="网点编号：">
                                <el-input v-model="form.dealerCode" placeholder="请输入网点编号" class="myInput-four"
                                        @keyup.native="dealerCode1"  ></el-input>
                            </el-form-item>
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                            <el-form-item label="网点名称：">
                                <el-input v-model="form.dealerName" placeholder="请输入网点名称" class="myInput-four"
                                        ></el-input>
                            </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div class="right seach-positon" >
                    <el-button type="primary" icon="search" @click="lastSeach" style="float:right">查询</el-button>
                </div>
            </div>
            <el-table :data="listRecommend" border height="334" v-show="noListPhoto" >
                <el-table-column prop="memberCode" label="会员编号" width="150">
                </el-table-column>
                <el-table-column prop="contactWay" label="联系方式" width="150">
                </el-table-column>
                <el-table-column prop="dealerCode" label="网点编号" width="150">
                </el-table-column>
                <el-table-column prop="dealerName" label="网点名称" width="150">
                </el-table-column>
                <el-table-column prop="province" label="注册地（省）" width="150">
                </el-table-column>
                <el-table-column prop="city" label="注册地（市）" width="150">
                </el-table-column>
                <el-table-column prop="county" label="注册地（县）" width="150">
                </el-table-column>
                <!-- 增加    注册时间 -->
                <el-table-column prop="createdDate" label="注册时间"  width="200">
                </el-table-column>
                <el-table-column label="积分余额" width="150">
                    <template slot-scope="scope">
                    <span> {{scope.row.memberIntegral ? scope.row.memberIntegral : 0}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <paging-query :page="pageTwo" @change="getRecommendByPage"  v-show="noListPhoto" class="memberPage"/>

            <div class="noPhoto" v-show="!noListPhoto">
                <img src="../../assets/images/noList.png" alt="logo" class="mt50">
                <div class="fontStyle mt20">您暂无下级会员</div>
                <div class="fontStyle mt10">赶紧去发展您的下级会员吧</div>
            </div>       
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="closeLast">确 定</el-button>
                <el-button @click="closeLast">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</div>
</template>

<script>
import {
    memberList,
    listRecommendByPage
} from '../../js/vipmanagement'
import PagingQuery from '../../components/pagingQuery'
import {
    getuserInfo,
    setuserInfo,
    removeuserInfo
} from '../../utils/session.js'
export default {
    name: 'Basetable',
    components: {
        PagingQuery
    },
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
            plan: {
                contactWay: '',
                chargePhone: '',
                dealerId: '',
                memberCode: '',
                dealerCode: '',
                dealerName: ''
            },
            rules: {
                name: [{
                    required: true,
                    message: '请输入姓名',
                    trigger: 'blur'
                }]
            },
            // total: 0,
            page: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                pageTotals: 0,
                orderBy: 'm.created_date desc'
            },
            //下级会员
            listRecommend:[],
            dotDialogVisible:false,
            lastMemberId: '',
            form: {
                memberCode: '',
                contactWay: '',
                dealerCode:'',
                dealerName:'',
                chargePhone:getuserInfo('phone'),
                dealerId: '',
            },
            pageTwo: {
                total: 0,
                pageTotals: 0,
                pageNum: 1,
                pageSize: 10,
            },
            noListPhoto:false,
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
        sortChange(column, prop, order) {
            if (column.order == 'ascending') {
                this.page.orderBy = 'm.created_date'
                this.getData()
            }
            if (column.order == 'descending') {
                this.page.orderBy = 'm.created_date desc'
                this.getData()
            }
        },
        // 分页导航
        handleCurrentChange(val) {
            this.page.pageNum = val
            this.getData()
        },
        //查看会员跳转
        getMemberInfo(row){
                 console.log("zkf",row)
                  this.$router.push({
                path: '/memberMag/getMemberActivation/' + row.memberId
            })
        },
        //激活
        activation(row){
                 console.log("zp",row)
                  this.$router.push({
                path: '/memberMag/activation',
                query: {
                    contactWay: row.contactWay,
                    memberCode: row.memberCode,
                    memberId: row.memberId
                }
            })
        },

        memberCode() {
            this.plan.memberCode = this.plan.memberCode.replace(/[^0-9a-zA-Z]+$/, '')
        },
        contactWay() {
            this.plan.contactWay = this.plan.contactWay.replace(/[^0-9]*$/, '')
        },
        dealerCode(){
            this.plan.dealerCode = this.plan.dealerCode.replace(/[^0-9a-zA-Z]+$/, '')
        },
        memberCode1() {
            this.form.memberCode = this.form.memberCode.replace(/[^0-9a-zA-Z]+$/, '')
        },
        contactWay1() {
            this.form.contactWay = this.form.contactWay.replace(/[^0-9]*$/, '')
        },
        dealerCode1(){
            this.form.dealerCode = this.form.dealerCode.replace(/[^0-9a-zA-Z]+$/, '')
        },
        
        getData() {
            this.plan.page = this.page
            this.plan.chargePhone = getuserInfo('phone')
            memberList(this.plan).then(res => {
                this.tableData = res.datas
                this.page.total = res.total
                this.page.pageNum = res.pageNum
                this.page.pageTotals = res.pageTotals
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
        },
        //关闭弹框
        closeLast(){
            this.form.memberCode = ''
            this.form.contactWay = ''
            this.form.dealerCode = ''
            this.form.dealerName = ''
            this.dotDialogVisible = false
        },
        //点击下级会员
        handleLast(index, row){
            this.lastMemberId = row.memberId
            this.dotDialogVisible = true
            this.getRecommendByPage()
        },
        getRecommendByPage() {
            this.form.page = this.pageTwo
            this.form.memberId =this.lastMemberId
            listRecommendByPage(this.form).then(res => {     
                this.listRecommend = res.datas
                if(!!this.listRecommend.length&&this.listRecommend.length != 0){
                    this.noListPhoto = true
                }else{
                    this.noListPhoto = false
                }
                this.pageTwo.total = res.total
                this.pageTwo.pageTotals = res.pageTotals
            })
        },
        //查询
        lastSeach() {
            this.pageTwo.total = 0
            this.pageTwo.pageTotals = 0
            this.pageTwo.pageNum = 1
            this.getRecommendByPage()
        },
    }
};
</script>

<style>
.memberInfoWrap .addSearch .el-form--inline .el-form-item__content {
    width: 80%;
}
</style>
<style scoped>
.memberInfoWrap .container {
    padding: 24px 32px 0 32px;
    background: #FFF;
    min-width: 1560px;
    margin: 0;
    min-height: 900px;
    overflow: auto;
}
.noPhoto{
    width:932px;
    height:334px;
    text-align:center;
}
.fontStyle{
    font-size:14px;
    color:#666;
}
.memberPage {
    padding: 24px 20px 20px;
 }
</style>
