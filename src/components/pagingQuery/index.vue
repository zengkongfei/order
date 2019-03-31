<template>
<div class="page-one clearfix" style="width:100%">
     <p class="pageWord">
        <span style="margin-right:5px;">第{{ page.pageNum }}页</span><span>共{{ page.pageTotals ? page.pageTotals : 0}}页</span>
        <span style="margin-left:15px;">显示条数：</span>
        <el-select v-model="value" placeholder="请选择" @change="changePageNum" style="width:80px">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </p>
        
     <el-pagination background layout="prev, pager, next, jumper" @size-change="onChangeSize" :page-size="page.pageSize" :total=total style="float:right" @current-change="onChangePage" />
      <p class="total-box">共{{page.total}}项</p>
 </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['page'],
    data(){
        return{
            options: [{
                value: 10,
                label: '10'
            }, {
                value: 20,
                label: '20'
            }, {
                value: 30,
                label: '30'
            }],
            value: this.page.pageSize
        }
    },
    computed: {
        total() {
            return this.page.total
        },
        // 检测是否获取到无数据
        initBack() {
            return this.page.total / this.page.pageSize < this.page.pageNum
        }
    },
    watch: {
        total() {
            // 存在记录但未获取到数据时, 重新请求
            if (this.initBack) {
                this.page.pageNum = 1
                this.$emit('change')
            }
        }
    },
    methods: {
        // 每页条数
        onChangeSize(pageSize) {
            console.log(pageSize, 'pageSize')
            this.pager.pageSize = pageSize
            this.$emit('change')
        },
        // 翻页
        onChangePage(pageNum) {
            console.log(pageNum, 'pageNum')
            this.page.pageNum = pageNum
            this.$emit('change')
        },
        // 选择条数
        changePageNum(i){
            this.page.total = 0
            this.page.pageTotals = 0
            this.page.pageNum = 1
             this.page.pageSize = i
             this.$emit('change')
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
     margin-bottom: 1px;
 }

 .page-one {
     position: relative;
     padding: 24px 0 58px;
 }

 .page-one .el-pagination.is-background .el-pager li {
     height: 32px;
     width: 32px;
     line-height: 32px;
     font-size: 14px;
     border: 1px solid rgba(217, 217, 217, 1);
     border-radius: 4px !important;
     color: rgba(102, 102, 102, 1);
     font-weight: normal;
     background: rgba(255, 255, 255, 1);
 }

 .page-one .el-pagination .btn-prev,
 .page-one .el-pagination .btn-next {
     width: 32px;
     height: 32px;
     border: 1px solid rgba(217, 217, 217, 1);
     border-radius: 4px !important;
     background: rgba(255, 255, 255, 1);
 }

 .page-one .el-pagination span {
     line-height: 36px;
     font-size: 14px;
     font-family: PingFangSC-Regular;
     font-weight: 400;
     color: rgba(102, 102, 102, 1);
 }

 .el-pagination.is-background .el-pager li:not(.disabled).active {
     background-color: #0082F0;
 }

 .el-pagination.is-background .el-pager li:not(.disabled).active {
     border: none 0;
 }
 .el-pagination{
     float: right;
 }
 .total-box {
     padding-top: 12px;
     margin: 0;
     font-size: 14px;
     font-family: PingFangSC-Regular;
     font-weight: 400;
     color: rgba(102, 102, 102, 1);
     float: right;
 }
 .pageWord{
    margin: 0;
    float:left;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
 }
.pageWord .el-input--suffix .el-input__inner{
    height: 32px;
}
.pageWord .el-input__prefix, .el-input__suffix{
    top: 4px
}
</style>
