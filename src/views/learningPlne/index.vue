<template>
  <div id="saleList">
    <mt-header fixed title="学习计划">
      <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
    </mt-header>
    <div class="salelist_content">
      <div class="course_sale">
        <ul>
          <li :class="courseStype==false?'course_list':''" @click="CourseShow()">必学课程</li>
          <li :class="courseStype==true?'course_list':''"  @click="CourseShow()">选学课程</li>
        </ul>
      </div>
    </div>
    <learn-course v-show="courseStype==false"></learn-course>
    <elective v-show="courseStype==true"></elective>
    <tabber ></tabber>
  </div>
</template>

<style lang="less" scoped>
/* !important; */
.saleList{
  position: relative;
  overflow: hidden;
  background: #e8e8e8;
}
.salelist_content{
  padding-top: 0.44rem;
}
.course_sale{
  border-bottom: 1px solid rgba(210,213,219, .5);
  ul{
    display: flex;
    padding: 0.15rem 0.35rem;
    li{
      flex: 1;
      height: 0.35rem;
      line-height: 0.35rem;
      border: 1px solid #e8e8e8;
      font-size: 0.14rem;
      border-radius: 0.16rem;
      &.course_list{
        background: #F44848;
        color: #fff;
      }
    }
    li:nth-child(1){
      border-radius: 0.16rem 0 0 0.16rem;
    }
    li:nth-child(2){
      border-radius: 0 0.16rem  0.16rem 0;

    }
    
  }
}
  
</style>

<script>

import tabber from '@/components/tabbar/index.vue'
import LearnCourse from './LearnCourse.vue'//必学
import elective from './elective.vue'//选学


export default {
  components:{
    tabber,
    LearnCourse,
    elective,

  },
  data(){
    return{
      courseStype:false,//
    }
  },
  methods:{
    CourseShow(){
      if(this.courseStype==true){
        this.courseStype=false
      }else{
        this.courseStype=true
      }
      
    },
  },
  mounted(){

  }
}
</script>