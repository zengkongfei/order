<template>
<div class="page-one">
    <el-pagination background  @size-change="onChangeSize" @current-change="onChangePage" :page-size="page.pageSize" layout="total,prev, pager, next, jumper" :total=total>
    </el-pagination>
</div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['page'],
    computed: {
        total() {
            return this.page.total;
        },
        //检测是否获取到无数据
        initBack() {
            return this.page.total / this.page.pageSize < this.page.pageNum;
        },
    },
    watch: {
        total() {
            // 存在记录但未获取到数据时, 重新请求
            if (this.initBack) {
                this.page.pageNum -= 1;
                this.$emit('change');
            }
        },
    },
    methods: {
        // 每页条数
        onChangeSize(pageSize) {
            this.pager.pageSize = pageSize;
            this.$emit('change');
        },
        // 翻页
        onChangePage(pageNum) {
            this.page.pageNum = pageNum;
            this.$emit('change');
        }
    }
}

</script>

<style>
.page-one {
    margin-top: 24px;
    float: right;
    margin-right: 24px;
  margin-bottom: 58px;
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
.el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #0082F0;}
.el-pagination.is-background .el-pager li:not(.disabled).active{ border: none 0;}
</style>
