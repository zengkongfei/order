<template>
  <div class="plateEditWrap">
    <div class="table" id="platebox">
      <div class="adittit save-btn"> 
        <div style="width: 1136px; margin: 0 auto;background: white;border-radius: 0;">
          <img src="../../assets/images/top_images/logo.png">
          <p>编辑库存</p>
          <el-button type="primary" @click="submitEdit('itemForm')">保存</el-button>
        </div>
      </div>
      <div style="background: white">
        <div class="container" style="width:1136px;margin:0 auto">
          <!--新增提示框-->
          <div title="修改" style="width: 900px; margin: 0 auto; padding-top: 20px;">
            <el-form ref="form" :model="form" :rules="rules">
              <div>
                 <el-form-item label="商品编号:" label-width="100px">
                <span>{{ form.number }}</span>
              </el-form-item>
              <el-form-item label="商品名称:"  label-width="100px">
                <span>{{ form.name }}</span>
              </el-form-item>
               
                 <el-form-item prop="totalInventory" label="总库存量:" label-width="100px" class="plateint">
                  <el-input v-model="form.totalInventory" placeholder="请输入总库存量" @change="getOccupiedInventory"   />
                </el-form-item>
                <el-form-item prop="occupiedInventory" label="可用库存:" label-width="100px" class="plateint" >
                  <el-input v-model="form.occupiedInventory" placeholder="请输入可用库存" :disabled='true'/>
                </el-form-item>
               <el-form-item prop="lockedInventory" label="锁定数量:" label-width="100px" class="plateint" >
                  <el-input v-model="form.lockedInventory" placeholder="请输入锁定数量" :disabled='true' />
                </el-form-item>
               
                
              </div>
            </el-form>

          </div>
        </div>
      </div>

    </div>
  </div>

</template>


<script>
import {
   updateInventory,
   getInventoryById
} from '../../js/indent'
export default {
  name:'indent',

  data(){
       var checkTotalInventory = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('库存数量不能为空'))
        } else {
          if (value < this.form.lockedInventory) {
            callback(new Error('库存数量需大于等于锁定数量'))
          }
          callback()
        }
      }
    return{
         rules:{
      totalInventory:[
                   { required: true, validator: checkTotalInventory, trigger: 'blur' },
                  { type:'number', message: '只能输入数字', trigger: 'change' },
                ],
        },
      form:{
        name:'',
        lockedInventory:'',
        totalInventory:'',
        number:'',
        occupiedInventory:''

      },
      itemForm:{
        totalInventory:0,
        occupiedInventory:0,
        id:''
      },
      
    
    }
   
  },
  created(){
      this. getDataById();
      

  },
  methods:{
    //修改
    submitEdit(itemForm ){
        
          this.$refs['form'].validate((valid)=>{
          if(valid){
            this.itemForm.id = this.$route.params.id
            this.itemForm.lockedInventory = this.form.lockedInventory
            this.itemForm.totalInventory = this.form.totalInventory
            updateInventory(this.itemForm).then(res=>{
            this.$message.success(res.msg)
            this.$router.push("/indent/shoplist")
                })
          }else{
              return false
          }

          })
    },

//  获取可用数量
      getOccupiedInventory() {
       this.form.occupiedInventory = this.form.totalInventory - this.form.lockedInventory
      },

//根据id查详细信息

    getDataById(){
       const id = this.$route.params.id
      getInventoryById(id).then(res=>{
            if (res && res.datas) {
        this.form.lockedInventory=res.datas.lockedInventory
        this.form.name=res.datas.name
        this.form.totalInventory=res.datas.totalInventory
        this.form.number=res.datas.number
        this.form.occupiedInventory=res.datas.occupiedInventory
            }

      }).catch(error=>{
        this.$message.error(error+'')
})

    }

  }
}
</script>

<style scoped>
li,
ul {
    list-style-type: none;
}

.handle-box {
    margin-bottom: 20px;
}

.pagination {
    text-align: right;
    margin: 20px 0;
}

.avatar-uploader .el-upload,
.avatar-uploader-icon {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.el-upload {
    width: 90%;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 685px;
    height: 252px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    max-width: 685px;
    max-height: 252px;
    display: block;
}

.avatar-uploader-icon {
    width: 685px;
}

.pixtext {
    height: 18px;
    line-height: 18px;
    margin: 0;
    padding: 0;
    text-align: left;
    color: #999999;
    position: absolute;
    bottom: -10px;
    left: 0;
}

.container {
    background: #FFF;
    width: 100%;
    margin: 0;
    height: 100%;
    min-height: 700px;
}

.plateEditWrap .table {
    background-color: #F0F2F5;
    width: 100%;
    overflow: auto;
}

.addSearch {}

.handle-box .el-button {
    height: 32px;
    width: 60px;
    line-height: 0px;
    position: relative;

}

.container .handle-box .el-button--primary span {
    position: absolute;
    top: 15px;
    left: 0px;
}

.page {
    text-align: right;
    margin-top: 32px;
    margin-right: 24px;
}

.footer {
    text-align: center;
    margin: 36px 0;
    color: #000000;
    font-size: 12px;
}

.addSearch .el-input {
    height: 32px;
    width: 300%;
}

.warpbox {
    margin: 0 auto;
    width: 750px;
}

.adittit {
    background: #FFF;
    height: 80px;
    text-align: center;
    line-height: 80px;
    margin-bottom: 24px;
}

.adittit p {
    color: #000000;
    font-size: 16px;
}

.adittit img {
    float: left;
    width: 120px;
    height: 40px;
    margin-top: 20px;
}

.adittit .el-button {
    float: right;
    margin-top: -70px;
}

.warpbox {
    padding-top: 30px;
}

.warpbox .el-input,
.warpbox .el-select {
    width: 150%;
}

.el-form-item__label {
    font-size: 14px;
    color: #EF434F
}

.el-upload {
    position: relative;
}

.zhezhao {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 685px;
    position: absolute;
    bottom: 0px;
    left: 0;
    left: 0;
    z-index: 999;
    border-radius: 0 0 4px 4px
}

.zhezhao img {
    margin: -4px auto;
}
</style><style>
.plateint input.el-input__inner {
    width: 685px;
}

.plateint textarea.el-textarea__inner {
    width: 685px;
}

.plateint i.avatar-uploader-icon {
    width: 685px;
    line-height: 252px;
}

.handle-box .el-button {
    height: 32px;
    width: 60px;
    line-height: 0px;
    position: relative;

}

.container .handle-box .el-button--primary span {
    position: absolute;
    top: 15px;
    left: 15px;
}

#platebox .avatar-uploader .el-upload {
    width: 685px;
    height: 252px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(238, 238, 238, 1);
    border-radius: 4px;
    position: relative;
}

#platebox .el-input__inner {
    height: 32px;
    line-height: 32px;
}

#platebox .el-form-item {
    margin-bottom: 16px;
}

#platebox .el-form-item__label {
    padding: 0;
    padding-right: 6px;
}
</style><style>
.save-btn .el-button--primary {
    height: 32px;
    width: 60px;
    line-height: 0;
    position: relative;
    background-color: #0082F0;
}

.save-btn .el-button--primary span {
    position: absolute;
    top: 15px;
    left: 15px;
}

.save-btn {
    height: 80px;
    width: 100%;
    background-color: #fff;
    position: relative;
    border-radius: 4px;
    /* margin-bottom: 24px; */
}
</style>
