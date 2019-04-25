<template>
<div class="table memberInfoWrap">
    <div class="container">
        <div class="addSearch">
            <el-form ref="plan" :model="plan" :inline="true" label-width="100px">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="订单编号：" >
                            <el-input v-model="plan.number" placeholder="请输入订单编号"  @keyup.native="number"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货人：" >
                            <el-input v-model="plan.consignee" placeholder="请输入收货人"  />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货人电话：" >
                            <el-input v-model="plan.mobile" placeholder="请输入收货人电话"  @keyup.native="mobile"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="下单时间：" >
                            <el-date-picker
                                v-model="plan.createdDateBefore"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>   
                            <el-date-picker
                                v-model="plan.createdDateAfter"
                                type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd">
                            </el-date-picker>   
                        </el-form-item>               
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="handle-box">
            <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
            <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
            <el-button type="primary" icon="search" @click="warrantymore" v-show="plan.status == 1">批量报单</el-button>
        </div>
        <div class="articleTab">
            <el-tabs  @tab-click="handleClick" type="card" v-model="plan.status" >
                <el-tab-pane v-for="item in blockList" :key="item.value" :label="item.blockName" :name="item.value" ></el-tab-pane>
            </el-tabs>
        </div>
        <el-table  :data="tableData" border :header-cell-style="{background:'rgba(250,250,250,1)'}" 
        :default-sort="{prop: 'createdDate', order: 'descending'}" empty-text="暂无数据" @sort-change='sortChange' height='600px' 
         @selection-change="handleSelectChangeLeft" >
            <el-table-column   type="selection" width="55" />           
            <el-table-column prop="number" label="订单编号"  />
            <el-table-column prop="consignee" label="收货人" />   
            <el-table-column prop="address" label="收货地址" />       
            <el-table-column prop="mobile" label="收货人电话" />

            <!-- <el-table-column prop="dealerName" label="货运方式" /> -->

            <el-table-column prop="totalAmount" label="订单总金额" />
            <el-table-column prop="status" label="订单状态" />          
            <el-table-column prop="createdDate" label="下单时间" width="150px" sortable="custom" />
            <el-table-column prop="count" label="订单商品项数" />
            <el-table-column prop="orderNotes" label="订单备注" />
            <el-table-column prop="memberCode" label="会员编号" />
            <el-table-column prop="dealerName" label="下单网点" />
            <el-table-column label="控制" width="250px" align="center">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleDetail()" >详情
                    </el-button>
                    <el-button v-show="scope.row.status == 1 || scope.row.status == 2" type="text" @click="warranty(scope.row.id,3,'报单')" >报单
                    </el-button>
                    <el-button v-show="scope.row.status == 1 || scope.row.status == 2" type="text" @click="warranty(scope.row.id,7,'关闭')" >关闭
                    </el-button>
                    <el-button v-show="scope.row.status == 5" type="text" @click="warranty(scope.row.id,6,'确认收货')" >确认收货
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <paging-query :page="page" @change="getData" />
        <!--会员信息-->
        <el-dialog title="会员信息" :visible.sync="dialogVisibleInformation" width="412px" height="415px">
        <template>
            <ul class="information-box">
            <li>会员编号：{{this.information.memberCode}}</li>
            <li>联系方式：{{this.information.contactWay}}</li>
            <li>网点编号：{{this.information.dealerCode}}</li>
            <li>网点名称：{{this.information.dealerName}}</li>
            <li>注册地(省)：{{this.information.province}}</li>
            <li>注册地(市)：{{this.information.city}}</li>
            <li>注册地(县)：{{this.information.county}}</li>
            <li>注册时间：{{this.information.createdDate}}</li>
            </ul>
            <span slot="footer" class="dialog-footer"></span>
        </template>
        </el-dialog>
        
    </div>
</div>
</template>

<script>
import {
    getOrderPage,
    updateOrderStatus,
    updateOrderListStatus,
    getMemberInfo
} from '../../js/indent'
import PagingQuery from '../../components/pagingQuery'
export default {
    name: 'indent',
    components: {
        PagingQuery
    },
    data() {
        return {
            multipleSelection:[],
            dialogVisibleInformation:false,
            blockList: [
                {blockName: "待确认", value: '1'},
                {blockName: "待审核", value: '3'},
                {blockName: "待发货", value: '4'},
                {blockName: "待收货", value: '5'},
                {blockName: "已签收", value: '6'},
                {blockName: "已关闭", value: '7'},
                {blockName: "全部", value: '0'}
            ],
            information:{
                memberCode:"",
                contactWay:"",
                dealerCode:"",
                dealerName:"",
                province:"",
                city:"",
                county:"",
                createdDate:"",
            },
            tableData: [],                   
            plan: {
                consignee: "",
                createdDateAfter: "",
                createdDateBefore: "",
                mobile: "",
                number: "",
                status: "1"
            },           
            // total: 0,
            page: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                pageTotals: 0,
                orderBy: 'a.created_date desc'
            },
            
        }
    },
    created() {
        this.getData()
    },
    methods: {
        handleSelectChangeLeft(rows){
            this.multipleSelection = rows
        },
        handleDetail(a){
            console.log(a)
        },
        //查看会员信息
        checkInformation(row) {
            this.dialogVisibleInformation = true
            getMemberInfo(row.memberCode).then(res => {
                this.information = res.datas
            })
        },
        warrantymore(){
            let params = []
            if(this.multipleSelection == []){

            }else{
                for(let i in this.multipleSelection){
                    params.push({
                        id:this.multipleSelection[i].id,
                        status:3
                    })
                }
            }

            updateOrderListStatus(params).then(res => {
                this.$message.success(res.msg)
                this.getData()
            })
            .catch(error => {
                this.$message.error(error + '')
            })      
        },
        handleClick() {
            this.getData() 
        },
        warranty(id,status,title){
            this.$confirm('确认' + title , '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let params = {
                    id: id,
                    status: status
                }
                updateOrderStatus(params).then(res => {
                    this.$message.success(res.msg)
                    this.getData()
                })
                .catch(error => {
                    this.$message.error(error + '')
                })      
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改！'
                });
            }); 
        },  
        sortChange(column, prop, order) {
            if (column.order == 'ascending') {
                this.page.orderBy = 'a.created_date'
                this.getData()
            }
            if (column.order == 'descending') {
                this.page.orderBy = 'a.created_date desc'
                this.getData()
            }
        },
        number() {
            this.plan.number = this.plan.number.replace(/[^0-9a-zA-Z]+$/, '')
        },
        mobile() {
            this.plan.mobile = this.plan.mobile.replace(/[^0-9]*$/, '')
        },
        
        getData() {
            this.plan.page = this.page
            let params = this.plan
            params.status = Number(this.plan.status) 
            getOrderPage(params).then(res => {
                this.tableData = res.datas
            })
            .catch(error => {
                this.$message.error(error + '')
            })
        },
       
        // 查询
        handSeach() {
            this.getData()
        },
        // 刷新
        handFlush() {
            this.plan.contactWay = ''
            this.plan.dealerId = ''
            this.plan.memberCode = ''
            this.plan.dealerCode = ''
            this.plan.dealerName = ''
            this.getData()
        },
    }
};
</script>

<style>
.memberInfoWrap .addSearch .el-form--inline .el-form-item__content {
    width: 65%;
}
.articleTab{
    margin-bottom:10px;
}
.articleTab .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border:none;
}
.articleTab .el-tabs--card>.el-tabs__header{
    border-bottom:none;
}
.articleTab .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left:none;
}
.articleTab .el-tabs__item.is-active{
    background-color:#EDF8FE;
    border-radius:5px;
}
.articleTab .el-tabs__item{
    padding:0 30px;
}
.articleTab .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2){
    padding-left:30px;
}
.articleTab .el-tabs--top.el-tabs--card .el-tabs__item:last-child{
    padding-right:30px;
}
.articleTab .el-tabs__header{
    margin:0px;
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
