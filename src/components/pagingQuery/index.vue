<template>
<div class="page-one clearfix" style="width:100%">
  <p style="float:left;font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);"><span style="margin-right:5px;">第{{page.pageNum}}页</span><span>共{{total/page.pageSize<0?1:Math.ceil(total/page.pageSize)}}页</span></p>
    <el-pagination background  @size-change="onChangeSize" @current-change="onChangePage" :page-size="page.pageSize" layout="total,prev, pager, next, jumper" :total=total style="float:right">
    </el-pagination>
</div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['page'],
    computed: {
        total() {
            return this.page.total
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
          console.log(pageSize,'pageSize')
            this.pager.pageSize = pageSize;
            this.$emit('change');
        },
        // 翻页
        onChangePage(pageNum) {
            console.log(pageNum,'pageNum')
            this.page.pageNum = pageNum;
            this.$emit('change');
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
  padding:24px 0 58px;
   /* margin-top: 24px;
    float: right;
    margin-right: 24px;
  margin-left: 24px;
  margin-bottom: 58px;*/
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
