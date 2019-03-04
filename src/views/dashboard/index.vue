<template>
  <div class="dashboard-container">
    <div class="conmiddle">
      <img src="../../assets/images/top_images/dashboard.png">
    <!--<div class="dashboard-back">-->
    <!--</div>-->
    <!-- <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-back {
    z-index: -999;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background:url(../../assets/images/top_images/dashboard.png) no-repeat 75px 167px;
    background-size: 100% auto;
  }
  &-conmiddle{
    background: #F0F2F5;
  }

}
.dashboard-back{
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background:url(../../assets/images/top_images/dashboard.png) no-repeat 75px 167px;
  background-size: 100% auto;
}
section.app-main{
  background: #F0F2F5;
  padding: 24px;
  position: relative;
  display: inline-block;
  height: 100%;
   width: 100%;
}
.conmiddle{ margin: 24px;margin-bottom: 0; background: #FFF; height:auto; display: inline-table; width: 100%;
  min-height:733px; padding: 167px 75px;}
.conmiddle img{width: 100%; height: auto;}
.footer{ text-align: center;margin: 36px 0; color: #000000; font-size: 12px;font-weight:400;}
</style>
<style>
 #app .main-container{ background: #F0F2F5;}

</style>