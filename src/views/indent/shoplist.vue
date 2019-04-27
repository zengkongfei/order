<template>
   <div class="table shopInfoListWrap">
    <div id="container" class="container">
      <div class="addSearch" style="width:100%">
        <el-form ref="form" :model="condition" :inline="true" label-width="105px">
          <el-row type="flex" class="row-bg">
              <el-form-item label="商品类别：" style="width:100%;margin-bottom:16px;">
                
                       <el-col :span="12" style="text-align: left" class="goods-class">
                      <el-select v-model="catNameOne" placeholder="请选择" @change="getCatNameTwoList()">
                        <el-option
                          v-for="(item, index) in getCatNameOneList"
                          :key="index"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      </el-col> 
                    <el-select v-model="catNameTwo" placeholder="请选择" :disabled="IscatNameTwo"
                                 @change="getCatNameThreeList">
                        <el-option
                          v-for="(item, index) in getCatNameTwoList"
                          :key="index"
                          :label="item.name"
                          :value="item">
                        </el-option>
                      </el-select>
                      <el-select v-model="catNameThree" placeholder="请选择" :disabled="IscatNameThree">
                        <el-option
                          v-for="(item, index) in getCatNameThreeList"
                          :key="index"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                      </el-select> 
                   
                  </el-form-item>
    
              <!-- <el-col :span="12">
              <el-form-item label="一级类目:" style="">
                <el-input v-model="condition.catNameOne" placeholder="一级类目"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级类目:" style="">
                <el-input v-model="condition.catNameTwo" placeholder="二级类目"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三级类目:" style="">
                <el-input v-model="condition.catNameThree" placeholder="三级类目"/>
              </el-form-item>
            </el-col> -->
            <el-col :span="12">
              <el-form-item label="商品编号:" style="">
                <el-input v-model="condition.number" placeholder="请输入商品编号"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品名称:" style="">
                <el-input v-model="condition.name" placeholder="请输入商品名称"/>
              </el-form-item>
            </el-col>
          </el-row>            
        </el-form>
        </div>
        <div class="handle-box" style="width:100%">
        <el-button type="primary" icon="search" @click="handSeach">查询</el-button>
        <el-button type="primary" icon="search" @click="handFlush">刷新</el-button>
      </div>
    <el-table  :data="tableData" border 
    :header-cell-style="{background:'rgba(250,250,250,1)'}" 
        :default-sort="{prop: 'createdDate', order: 'descending'}" empty-text="暂无数据"  height='600px' 
          class="tabel-info"  @sort-change='sortChange' >
               
            <el-table-column prop="number" label="商品编号"  width="150"/>
            <!-- <el-table-column prop="mainImage" label="商品图片" width="150"/>    -->
            <el-table-column label="商品图片" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showPhoto(scope.$index, scope.row)">
              查看
            </el-button>
            </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="200"/>       
            <el-table-column prop="catNameOne" label="一级类别" width="150"/>
            <el-table-column prop="catNameTwo" label="二级类别" width="150"/>  
            <el-table-column prop="catNameThree" label="三级类别"  width="150"/>
            <el-table-column prop="marketPrice" label="进货价" width="150"/>   
            <el-table-column prop="realPrice" label="售价" width="200"/>       
            <el-table-column prop="totalInventory" label="库存数量" width="150"/>
            <el-table-column prop="occupiedInventory" label="可用数量" width="150"/>  
            <el-table-column prop="lockedInventory" label="锁定数量" width="200"/>       
            <el-table-column prop="createdDate" label="创建时间" width="150"/>
            <el-table-column  label="控制" >
                    <template slot-scope="scope">
                        <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    </template>
            </el-table-column>
        </el-table>
      
      
         <el-dialog
        :visible.sync="dialogVisibleChargePhoto"
        title="商品照片"
        width="400px"
        height="400px"
        class="chargeNameDialog">
        <template>
          <div id="zhaopianbox">
            <img :src="mainImage.shopUrl" alt="" style="width: 360px; height: 400px;">
          </div>
          <p class="p-text-one"><span style="margin-right:24px">{{ mainImage.shopName }}</span><span>{{ mainImage.shopCode }}</span>
          </p>
          <span slot="footer" class="dialog-footer"/>
        </template>
      </el-dialog>

       <paging-query :page="page" @change="getData" />
      
      
      </div>
   </div>
</template>



<script>
import {
   getInventoryPage,
   categorys
} from '../../js/indent'
import PagingQuery from '../../components/pagingQuery'
export default {
   name:'indent',
    components:{
      PagingQuery
          },
   data(){
      return{
         form:{
            catNameOne:'',//一级类目
            catNameThree:'',//三级类目
            catNameTwo:'',//二级类目
            createdDate:'',//下单时间
            id:'',
            lockedInventory:'',//锁定数量
            mainImage:'',//商品图片
            marketPrice:'',//市场价
            name:'',//商品名称
            number:'',//商品编号
            occupiedInventory:'',//可用库存
            realPrice:'',//真是售价
            totalInventory:'',//总库存数
         },
         tableData:[],
        dialogVisibleChargePhoto: false,
       // 查询条件
         condition:{
            catNameOne:'',//一级类目
             catNameThree:'',//二级类目
            catNameTwo:'',//三级类目
            name:'',//商品名称
            number:'',//商品编号
                      },
             page: {
                total: 0,
                pageNum: 1,
                pageSize: 10,
                pageTotals: 0,
                orderBy: 'a.created_date desc'
            },
            mainImage:{
                shopUrl:'',
                shopCode:'',
                shopName:'',
            },
            id:this.$route.params.id,
            catNameOneList:[],
            catNameTwoList:[],
            catNameThreeList:[],
            // IscatNameOne:true,
            IscatNameTwo:true,
            IscatNameThree:true,
            catNameOne:{},
            catNameTwo:{},
            catNameThree:{},



      }
   },
   created(){
         this.getData()
         this.getCatNameOneList//调用获取一级类目方法
          this.getCatNameTwoList//调用获取二级类目方法
          this.getCatNameThreeList//调用获取三级类目方法
            },

   methods:{
     //获取一级类目
     getCatNameOneList(){
       categorys({parentId:'1111',itemCategoryType:1}).then(res=>{
          this.catNameOneList = res.datas
          console.logs('类目',this.catNameOneList)
       }).catch(error=>{
         this.$message.error(error+'')
       })

     },
     //获取二级类目
     getCatNameTwoList(){
       this.IscatNameTwo = flase,
       this.IscatNameThree = true,
       this.catNameTwo ='',
       this.catNameThree =''
       this.getCatNameTwoList = [],
       this.getCatNameThreeList = [],
       this.condition.catNameOne = this.catNameOne.name
       categorys({parentId:this.catNameOne.id,itemCategoryType:2 }).then(res=>{
         this.getCatNameTwoList =res.datas
       }).catch(error=>{
         this.$message.error(error+'')

       })

     },
     //获取三级类目
     getCatNameThreeList(){
       this.IscatNameThree = flase,
       this.getCatNameThreeList = [],
       this.condition.catNameThree =''
      categorys({parentId:this.catNameTwo.id,itemCategoryType:3 }).then(res=>{
         this.getCatNameThreeList =res.datas
       }).catch(error=>{
         this.$message.error(error+'')

       })

     },
       //获取列表信息
      getData(){
          
         this.condition.page=this.page
         getInventoryPage(this.condition).then(res=>{
            // console.log('商品信息',res.datas)
            this.tableData=res.datas
            console.log('0010101',this.tableData)
            this.page.pageTotals=res.pageTotals
            this.page.total=res.total
         }).catch(error=>{
            this.$message.error(error+'')

         })

         },
            //点击查询
            handSeach(){
            this.page.total= 0,
            this.page.pageNum= 1,
            this.page.pageSize= 10,
            this.page.pageTotals= 0,
            this.getData()  
            },
            //分页
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
             // 刷新
        handFlush() {
            this.condition.catNameOne= ''
            this.condition.catNameTwo=''
            this.condition.catNameThree=''
            this.condition.name= ''
            this.condition.number= ''
            this.page.total= 0,
            this.page.pageNum= 1,
            this.page.pageSize= 10,
            this.page.pageTotals= 0,
            this.getData()
        },
        //显示查看商品图片
        showPhoto(index, row) {
      this.dialogVisibleChargePhoto = true
      this.mainImage.shopUrl = row.mainImage
      this.mainImage.shopCode = row.shopCode
      this.mainImage.shopName = row.shopName

    },
    edit(row){
       
        this.form=row
        this.id=row.id
        // this.itemForm.id=row.id
        // this.itemForm.lockedInventory=row.lockedInventory
        // this.itemForm.totalInventory=row.totalInventory
        this.$router.push('/indent/getInventoryById/'+row.id)

    }
  }

}
</script>
<style>
.indentlistcss .addSearch .el-form--inline .el-form-item__content {
    width: 65%;
}
.indentlistcss .tabel-info .green {
    background: rgba(82, 196, 26, 1);
}

.indentlistcss .tabel-info .red {
    background: rgba(242, 99, 12, 1);
}

.indentlistcss .tabel-info .blue {
    background: rgba(0, 130, 240, 1);
}

.indentlistcss .i-spot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 3px;
    vertical-align: 3px;
    margin-right: 5px;
    background: #D1D5D8;
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
.information-box li {
    margin-bottom:20px;
}
.indentlistcss .container {
    padding: 24px 32px 0 32px;
    background: #FFF;
    /* min-width: 1560px; */
    min-width: 1300px;
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
