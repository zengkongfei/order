<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/> -->
    <breadcrumb />
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <div class="zh-set">
          <img src="../../../assets/images/Group@2x.png" class="user-avatar">
          <span class="set">账户设置</span>
        </div>
        <!-- <i class="el-icon-caret-bottom"/> -->
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            <div class="ltimg">
              <img :src="chargePhoto">
            </div>
            <div class="rgbot">
              <h1 class="titext">{{ chargeName }}</h1>
              <p class="infotex"> 负责人</p>
              <p class="loietx">{{ chargePhone }}</p>
            </div>
          </el-dropdown-item>
        </router-link>
        <span class="botlogout" style="display:block;" @click="logout"><img src="../../../assets/images/top_images/Group 3.png">注销</span>

      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { getUserInfo } from '../../../js/userInfo.js'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      chargeName: '',
      chargePhoto: '',
      chargePhone: ''
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  created() {
    this.getuser()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    getuser() {
      getUserInfo().then(res => {
        console.log('res', res)
        this.chargePhoto = res.datas.chargePhoto
        this.chargeName = res.datas.chargeName
        this.chargePhone = res.datas.chargePhone
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb[data-v-b50ef614] {
    line-height: 80px
}
</style><style lang="scss" scoped>
.navbar {
    height: 80px;
    line-height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
    border-radius: 0px !important;

    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }

    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }

    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;

        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            line-height: initial;

            .zh-set {

                margin-top: 28px;
                .user-avatar {
                    width: 16px;
                    height: 16px;
                     vertical-align: middle
                }
            }

            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
.ltimg{ width:72px; height:100px; float: left; overflow: hidden; margin-right: 12px;}
.ltimg img{ width: 100%; height: 100%; overflow: hidden;}
.rgbot{  float: left; width:99px; height: 106px;}
  .titext{width:100%;
    text-overflow:ellipsis;
    white-space : normal nowrap;
    font-size:16px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:10px;}
  .infotex{width:84px;
    height:17px;
    font-size:12px;
    font-weight:400;
    color:rgba(76,172,255,1);
    line-height:17px;
    text-overflow:ellipsis;
    white-space : normal nowrap;
  }
  .loietx{width:95px;
    height:17px;
    font-size:12px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:17px;
     margin-top:38px;
  }
.el-dropdown-menu__item{height:auto; border-bottom:solid 1px #D9D9D9; padding: 0;margin:24px; margin-bottom: 0px; padding-bottom: 18px; display: inline-table}
.el-dropdown-menu__item:hover{ background: #FFF;}
  .botlogout{ margin:12px 24px;font-size:16px;font-weight:400;color:rgba(51,51,51,1); display: block; text-align: left; cursor: pointer;
    }
  .botlogout img{ width: 14px; height: 14px; margin-right: 12px;}
</style>
<style>
  .user-dropdown{ width: 242px; height: 200px; background:rgba(255,255,255,1);
    box-shadow:0px 1px 4px 0px rgba(0,0,0,0.3);
    border-radius:4px;
    border:1px solid rgba(0,130,240,1);}
  .el-popper[x-placement^=bottom] .popper__arrow{border-bottom-color: #0082F0;}

</style>

</style>

