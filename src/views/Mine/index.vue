<template>
  <div class="Mine">
    <mt-header fixed title="我的" >
      <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
    </mt-header>
    <div class="Mine_listDatalis">
      <div class="Mine_name">
        <div class="name_img">
          <img src="@/assets/img/common_nav-fanhui_nor.png" alt="">
        </div>
        <div class="name_lsit">
           <h2>{{Mydata.userName}}</h2>
           <p>{{Mydata.position}}</p>
        </div>
      </div>
      <div class="Mine_content">
        <div class="content_title">我的内容</div>
        <div class="Mine_contentList">
          <ul>
            <li @click="MycommentClick">
              <img src="@/assets/img/my_comment.png" alt="" >
              <p>评论</p>
              <span>{{Mydata.commentTotal}}条</span>
            </li>
            <li @click="MycollectClick">
              <img src="@/assets/img/my_collect.png" alt="">
              <p>收藏</p>
              <span>{{Mydata.collectionTotal}}条</span>
            </li>
            <li @click="MyexamClick">
              <img src="@/assets/img/my_examination.png" alt="">
              <p>考试</p>
              <span>{{Mydata.examinationTotal}}条</span>
            </li>
            <li @click="MybrowsingClick">
              <img src="@/assets/img/my_browsing_history.png" alt="">
              <p>浏览历史</p>
              <span>{{Mydata.browsingHistoryTotal}}条</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="study_achievement">
        <div class="content_title">学习成就</div>
        <div class="Mine_contentList">
          <ul>
            <li @click="MydataClick">
              <img src="@/assets/img/my_data.png" alt="">
              <p>数据</p>
              <span>{{Mydata.dataTotal}}小时</span>
            </li>
            <li @click="MybrowsingClick">
              <img src="@/assets/img/my_medal.png" alt="">
              <p>勋章</p>
              <span>{{Mydata.medalTotal}}枚</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="help_center">
        <img src="@/assets/img/my_help_center.png" alt="">
        <p>帮助中心</p>
        <img src="@/assets/img/icon_btn_right2.png" alt="">
      </div>
    </div>
    <tabber ></tabber>
  </div>
</template>

<style lang="less" scoped>
/* !important; */
.Mine{
  background: #e8e8e8;
}
.Mine_listDatalis{
  padding-top: 0.44rem;
  
  position: relative;
}
.Mine_name{
  background-image: url("../../assets/img/exam@2.png");
  background-size: 100%;
  z-index: 0;
  width: 100%;
  height: 1.5rem;
  overflow: hidden;
  padding: 0.25rem 0.15rem;
  .name_img{
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    float: left;
    img{
      width: 100%;
      height: 100%;

    }
  }
  .name_lsit{
    text-align: left;
    h2{
      margin-left: 0.55rem;
      color: #fff;
    }
    p{
      color: #fff;
      margin-left: 0.55rem;
      font-size: 0.10rem;
    }
  }
}
.Mine_content,.study_achievement,.help_center{
  margin: 0 0.15rem;
  z-index: 1; 
  background: #fff;
}
.Mine_content{
  margin-top: -.55rem;
  margin-bottom: 0.15rem;
  border-radius: 6px;

}
.study_achievement{
  margin-bottom: 0.15rem;
  border-radius: 6px;
}
.content_title{
  padding: 0.1rem 0.15rem;
  color: #000;
  font-size: 0.16rem;
  text-align: left;
  border-bottom: 1px solid #e8e8e8;
}
.Mine_contentList{
    ul{
      padding: 0.1rem 0.15rem;
      overflow: hidden;
      li{
        float: left;
        padding: 0.1rem 0.16rem;
        text-align: center;
        img{
          width: 0.24rem;
          height: 0.24rem;
        }
        p{
          font-size: 0.12rem;
          color: #000;

        }
        span{
          font-size: 10px;
          color: #949494;
        }
      }
    }
}
.help_center{
  overflow: hidden;
  border-radius: 6px;
  text-align: left;
  padding: 0.15rem 0.1rem;
  img:nth-child(1){
    float: left;
    width: 0.24rem;
    height: 0.24rem;
    margin: 0.1rem 0.1rem 0 0;
  }
  p{
    float: left;
    font-size: 0.16rem;
    color: #000;
    margin: 0.1rem 0.1rem 0 0;
  }
  img:nth-child(3){
    float: right;
    width: 0.2rem;
    height: 0.4rem;
  }
}
</style>

<script>

import tabber from '@/components/tabbar/index.vue'




export default {
  components:{
    tabber,

  },
  data(){
    return{
      Mydata:[],//
    }
  },
  methods:{
    //浏览历史
    MybrowsingClick(){
      this.$router.push({
        path:'/Mybrowsing',
        query:{

        }
      })
    },
    //我的收藏
    MycollectClick(){
       this.$router.push({
        path:'/Mycollect',
        query:{

        }
      })
    },
    //我的评论
    MycommentClick(){
       this.$router.push({
        path:'/Mycomment',
        query:{

        }
      })
    },
    //我的考试
    MyexamClick(){
       this.$router.push({
        path:'/Myexam',
        query:{

        }
      })
    },
    //我的数据
    MydataClick(){
       this.$router.push({
        path:'/Mydata',
        query:{

        }
      })
    },
    //我的勋章
    MymedalClick(){
       this.$router.push({
        path:'/Home/labeledit',
        query:{

        }
      })
    },
    // 获取我的信息
    myHomepage() {
      this.$request({
          api: this.$config.api.myHomepage,
          data: {
             userId:'muj'
          }
      }).then(res => {
          if (res.code === 0 && res.msg === 'success') {
          this.Mydata = res.result
          
          } else {
          Toast({
              message: res.msg,
              duration: 3000
          });
          }
      }).catch(err => {
          Toast({
          message: err,
          duration: 3000
          });
      })
    },
    

  },
  mounted(){
    this.myHomepage()
  }
}
</script>