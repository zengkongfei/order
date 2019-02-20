<template>
  <div class="table">
    <div id="container" class="container">
      <div class="address">
        <p>
          <span id="site">服务网点:
          <span id="siteName" class="ress">{{ dealerName }}</span></span>
        </p>
        <p>
          <span id="address" >地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址:
          <span id="addressContent" class="ress">{{ dealerAddress }}</span></span>
        </p>
      </div>
      <div class="code">
        <img id="code" :src="dataURL" width="160px">
      </div>
      <div class="logo">
        <img id="logo" src="../../images/logo.jpg" width="30px">
      </div>
      <div class="picFile">
        <img src="../../images/pic.png">
      </div>
    </div>
    <div align="center">
      <el-button
        class="button"
        type="primary"
        style="text-align:center;width: 554px"
        @click="createPicture()"
      >保存二维码</el-button>
    </div>
  </div>
</template>

<script>
import * as html2canvas from 'html2canvas'
import { getDealerInfo, getQrCode } from '../../js/vipmanagement'
import { BASE_API } from '../../../config/prod.env'
export default {
  name: 'Table',
  data() {
    return {
      dataURL: '',
      dealerCode: '',
      dealerName: '',
      dealerAddress: '',
      plan: {
        content: ''
      }
    }
  },
  created() {
    getDealerInfo()
      .then(res => {
        this.dealerName = res.datas.dealerName
        this.dealerAddress = res.datas.detailedAddress
        this.dealerCode = res.datas.dealerCode
        this.plan.content = BASE_API + '?dealerCode=' + this.dealerCode
        getQrCode(this.plan)
          .then(res => {
            this.dataURL = res.msg
          })
          .catch(error => {
            this.$message.error(error + '')
          })
        document.getElementById('addressContent').style.setProperty('width', '180px', 'important')
        if (this.dealerAddress.length > 36) {
          document.getElementById('site').style.setProperty('font-size', '11px', 'important')
          document.getElementById('siteName').style.setProperty('font-size', '11px', 'important')
          document.getElementById('address').style.setProperty('font-size', '11px', 'important')
          document.getElementById('addressContent').style.setProperty('font-size', '11px', 'important')
        }
      })
      .catch(error => {
        this.$message.error(error + '')
      })
  },
  methods: {
    createPicture: function() {
      html2canvas(document.getElementById('container'), {
        useCORS: true,
        logging: true
      }).then(canvas => {
        this.imgmap = canvas.toDataURL()
        console.log(999, this.imgmap)
        if (window.navigator.msSaveOrOpenBlob) {
          var bstr = atob(this.imgmap.split(',')[1])
          var n = bstr.length
          var u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          var blob = new Blob([u8arr])
          window.navigator.msSaveOrOpenBlob(blob, 'popularize' + '.' + 'png')
        } else {
          // 这里就按照chrome等新版浏览器来处理
          const a = document.createElement('a')
          a.href = this.imgmap
          a.setAttribute('download', 'popularize')
          a.click()
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 20px auto;
  width: 554px;
}
.picFile {
  width: 100%;
  height: 385px;
  margin-bottom: 20px;
  overflow: hidden;
}
.picFile img {
  width: 100%;
}
.el-button {
  width: 100%;
}
.address {
  font-size: 13px;
  margin-top: 264px;
  margin-left: 280px;
  width: 220px;
  position: absolute;
  z-index: 99;
  color: #f5d074;
  line-height: 25px;
}
/*服务网点和地址的样式*/
.address .ress {
   display: inline-block;
   width:84%;
   /* margin-left: 60px;
   margin-top: -25px; */
   position: absolute;
   left:60px;
   top:2px;
   /* margin: -25px 0 0 60px; */
   /* font-size: 10px; */
}
.address >p{
  margin: 0;
  /*height: 50px;*/
  position: relative;
  line-height: 25px;
}
/*.address{*/
  /*font-size: 13px;*/
  /*margin-top: 280px;margin-left: 280px; width: 220px;*/
  /*position:absolute;z-index:99;*/
  /*color: #f5d074;*/
  /*line-height: 25px;*/
/*}*/
.code {
  margin-top: 172px;
  margin-left: 72px;
  width: 100px;
  position: absolute;
  z-index: 99;
  line-height: 30px;
}
.logo {
  margin-top: 240px;
  margin-left: 143px;
  width: 30px;
  position: absolute;
  z-index: 99;
  line-height: 30px;
}
</style>
