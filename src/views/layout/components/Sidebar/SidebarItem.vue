<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper" id="menu-wrapper">

    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item v-if="onlyOneChild" :icon="onlyOneChild.icon||item.icon" :title="onlyOneChild.name"/>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else :index="resolvePath(item.path)" id="el-submenu">
      <template slot="title">
        <item v-if="item.name" :icon="item.icon" :title="item.name"/>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"/>
        <app-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)" active-text-color="red">
            <span class="dot-box"></span>
            <item v-if="child" :icon="child.icon" :title="child.name"/>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
  import path from 'path'
  import {isExternal} from '@/utils'
  import Item from './Item'
  import AppLink from './Link'

  export default {
    name: 'SidebarItem',
    components: {Item, AppLink},
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children, parent) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })

        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (this.isExternalLink(routePath)) {
          return routePath
        }
        return path.resolve(this.basePath, routePath)
      },
      isExternalLink(routePath) {
        return isExternal(routePath)
      }
    }
  }
</script>
<style>
/* .menu-wrapper  .is-active{
    background: yellow;
  }*/
 #menu-wrapper #el-submenu .el-menu .router-link-exact-active .is-active {
    background-color: #0082F0 !important;
  }
  .menu-wrapper .is-active .dot-box {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 4px;
    margin-right:7px;
  }
</style>
<style scoped>
  .menu-wrapper {
    background: #262A37;
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item {
    min-width: 230px !important;
    color: #FFF;
    height: 50px;
    line-height: 50px;
    font-size: 16px !important;
  }

  .el-menu-item * {
    vertical-align: middle;
    color: #FFF;
    font-size: 16px;
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item:focus {
   /* background-color: #0082F0 !important*/
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item:link {
   /* background-color: #0082F0 !important;*/
  }

  #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title[data-v-3ece4f7e], #app .sidebar-container .el-submenu .el-menu-item {
    text-align: center;
  }

  .active {
    background-color: #0082F0 ;
    width: 100%;
    display: block;
    height: 50px;
    line-height: 50px;
  }

  .el-submenu__title span {
    font-size: 16px !important;
  }
</style>
<style>
  #app .sidebar-container {
    width: 230px !important;
  }

  #app .main-container {
    margin-left: 230px;
  }

  .el-submenu__title {
    background: rgba(49, 67, 88, 1);
  }

  .el-submenu__title:hover {
    background-color: #3E5E84 ;
  }

  #app .el-menu-item, .el-submenu__title {
    height: 60px;
    line-height: 60px;
    background: #314358 ;
  }

</style>
