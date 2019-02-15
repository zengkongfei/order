<template>
  <div class="table">
    <div id="container" class="container">
      <div class="address">
        服务网点：{{ dealerName }} <br>
        地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：{{ dealerAddress }}
      </div>
      <div class="code">
        <img id="code" :src="dataURL" width="160px" >
      </div>
      <div class="logo">
        <img id="logo" src="../../images/logo.jpg" width="30px" >
      </div>
      <div class="picFile">
        <img src="../../images/pic.png">
      </div>
    </div>
    <div align="center"><el-button class="button " type="primary" style="text-align:center;width: 554px" @click="createPicture()">保存二维码</el-button></div>

  </div>
</template>

<script>
import * as html2canvas from 'html2canvas'
import { getDealerInfo, getQrCode } from '../../js/vipmanagement'
export default {
  name: 'Table',
  data() {
    return {
      dataURL: '',
      dealerCode: '',
      dealerName: '',
      dealerAddress: '',
      plan: {
        content: 'http://192.168.30.190:4004/?dealerCode=' + this.dealerCode
      }
    }
  },
  created() {
    getDealerInfo().then(res => {
      this.dealerName = res.datas.dealerName
      this.dealerAddress = res.datas.detailedAddress
    }).catch(error => {
      this.$message.error(error + '')
    })
    getQrCode(this.plan).then(res => {
      this.dataURL = res.msg
    }).catch(error => {
      this.$message.error(error + '')
    })
  },
  methods: {
    createPicture: function() {
      html2canvas(document.getElementById('container'), { useCORS: true, logging: true }).then(canvas => {
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
.container{ margin: 20px  auto; width: 554px;}
.picFile{ width: 100%; height: 385px; margin-bottom: 20px; overflow: hidden;}
.picFile img{ width: 100%;}
.el-button{ width: 100%;}
.address{
  font-size: 13px;
  margin-top: 280px;margin-left: 280px; width: 220px;
  position:absolute;z-index:99;
  color: #f5d074;
  line-height: 25px;
}
.code{
  margin-top: 172px;margin-left: 72px; width: 100px;
  position:absolute;z-index:99;
  line-height: 30px;
}
.logo{
  margin-top: 240px;margin-left: 143px; width: 30px;
  position:absolute;z-index:99;
  line-height: 30px;
}
</style>
