<template>
<div class="footer_tab">
  <ul>
    <li @click="FooterRouter(1)" :class="tabberData==1?'Home':''">首页</li>
    <li  @click="FooterRouter(2)" :class="tabberData==2?'learningPlne':''">学习计划</li>
    <li  @click="FooterRouter(3)" :class="tabberData==3?'Mine':''">我的</li>
  </ul>
</div>

</template>

<style lang="less" scoped>
.footer_tab{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.10);
  ul{
    display: flex;
    overflow: hidden;
    li{
      flex:1;
      float: left;
      height: 0.5rem;
      font-size: 0.1rem;
      color: #A09696;
      padding-top: 0.3rem;
      letter-spacing: 0.2px;
      text-align: center;
      background-repeat: no-repeat;
      background-size:0.2rem;
      background-position: 0.53rem 0.1rem;
    }
    li:nth-child(1){
      background-image: url(../../assets/img/index.png);
      &.Home{
        color: #C53A3A;
        background-image: url(../../assets/img/index_red.png);
      }
    }
    li:nth-child(2){
      background-image: url(../../assets/img/plan.png);
      &.learningPlne{
        color: #C53A3A;
        background-image: url(../../assets/img/plan_red.png);
      }
    }
    li:nth-child(3){
      background-image: url(../../assets/img/my.png);
      &.Mine{
        color: #C53A3A;
        background-image: url(../../assets/img/my_red.png);
      }
    }
  }
}
</style>

<script>

import 'mint-ui/lib/style.css'


export default {
    data(){
        return{
          tabberData:1,

        }
    },
    methods:{
      FooterRouter(selected){
        this.tabberData=selected
        if(selected==1){
          this.selected=1
          this.$router.push({
            path:'/',
            query:{

            }
          })
         
        }else if(selected==2){      
          this.$router.push({
            path:'/learningPlne',
            query:{
              
            }
          })
           
        }else if(selected==3){
          this.$router.push({
            path:'/Mine',
            query:{
              
            }
          })
         
        }
        
      }
    },
    mounted(){

            
       
    },
    
}
</script>

