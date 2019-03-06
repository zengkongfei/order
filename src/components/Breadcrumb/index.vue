<template>
<div class="app-breadcrumb">
    <span>{{msg}}</span>
</div>
</template>

<script>
export default {
    data() {
        return {
            msg: '',
        }
    },
   created(){
     let massage = localStorage.getItem('msg')
     if(massage){
       this.msg = massage
       
     }else{
        this.msg = ''
     }
   },
    watch: {
        $route(to, from) {
          localStorage.setItem('msg',to.name)
              this.msg = to.name
        }
    },
}

</script>

<style lang="scss" scoped>
.app-breadcrumb {
    display: inline-block;
    font-size: 16px;
    line-height: 50px;
    margin-left: 26px;
    margin-top: 14px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
