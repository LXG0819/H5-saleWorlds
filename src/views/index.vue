<template>
  <div id="saleList">
    <mt-header fixed title="销傲天下">
      <mt-button  slot="left"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
    </mt-header>
    <div class="sale_seation">
      <div class="nav_tabber">
        <div class="Page_list">
          <div class="tab_container">
              <mt-navbar class="page-part"  v-model="selected" >
                <mt-tab-item  id="000"  >推荐</mt-tab-item>
                <mt-tab-item   v-for="(item,inedx) in mylabels"  :id="item.tmId" :key="inedx" @click.native="TagList(item)" >{{item.tmName}}</mt-tab-item>
              </mt-navbar>
          </div>
        </div>
        <div class="nav_img" @click="LabelEdit()">
          <img src="@/assets/img/navigation.png" alt="">
        </div>
      </div>
      <Search></Search>
      <home-content :tagList="tagList"></home-content>
    </div>
    <div class="golden_iden_img">
      <img src="@/assets/img/jindianzi.png" v-show="goldenisShow==false" alt="" @click="goldenisShowimg()">
      <div class="golden_iden_Imglist"  v-show="goldenisShow==true">
          <p>发图文</p>
          <img src="@/assets/img/jindianzi.png" alt="" @click="imagesText()">
          <p>小视频</p>
          <img src="@/assets/img/jindianzi.png" alt="">
          <img src="@/assets/img/close.png" alt="" @click="goldenisSHOW()">
          <p>发语音</p>
          <img src="@/assets/img/jindianzi.png" alt="">
      </div>
    </div>
    <div class="golden_iden_return" v-show="goldenisShow==true" @click="goldenisSHOW()"></div>
    <tabber ></tabber>
  </div>
</template>

<style lang="less" scoped>
/* !important; */
  .sale_seation{
    padding-top: 0.44rem;
    height: 100%;
    width: 100%;
  }
.nav_tabber{
  float: right;
  overflow: hidden;
  border-bottom: 1px solid #CBCFD6;
  .nav_img{
    height: 0.4rem;
    width: 0.4rem;
    background: #fff;
    box-shadow: -0.02rem 0 0.02rem 0 #E8E8E8;
    float: right;
    text-align: center;
    img{
       height: 0.4rem;
       width: 0.4rem;
       padding: 0.1rem;
       
    }
  }
}
::-webkit-scrollbar{
    height: 0;
}
.Page_list{
    overflow: hidden;
    width: 3.35rem;
    float: left;
    font-size: 0.12rem
}
.tab_container{
    overflow-y: auto;
}
.page-part{
    color: #000000;
    font-size: 0.14rem;
    height: 0.4rem;
    text-align: center;
    display: block;
    width: max-content;
}
.mint-navbar {
    .mint-tab-item{
        height: 0.4rem;
        padding: 0.12rem 0;
        float: left;
        line-height: 0.4rem;
        font-size: 0.14rem;
        font-weight: 600;
        margin: 0 0.22rem;
        flex: 0;
    }
    .mint-tab-item.is-selected{
        border-bottom: 0.03rem solid #F44848;
        color: #F44848;
    }
}
.golden_iden_img{
  img{
    position: fixed;
    width: 0.8rem;
    border-radius: 0.4rem;
    height: 0.8rem;
    right: 0.2rem;
    bottom: 0.7rem;
    z-index: 3;
  }
  .golden_iden_Imglist{
    p:nth-child(1){
      position: absolute;
      display: inline-block;
      right: 1.35rem;
      color: #fff;
      bottom: 1.75rem;
      z-index: 5;
    }
    img:nth-child(2){
      position: fixed;
      width: 0.8rem;
      border-radius: 40px;
      height: 0.8rem;
      right: 0.6rem;
      bottom: 1.40rem;
      z-index: 5;
    }
    p:nth-child(3){
      position: absolute;
      display: inline-block;
      right: 1.95rem;
      color: #fff;
      bottom: 1.05rem;
      z-index: 5;
    }
    img:nth-child(4){
      position: fixed;
      width: 0.8rem;
      border-radius: 0.4rem;
      height: 0.8rem;
      right: 1.2rem;
      bottom: 0.7rem;
      z-index: 5;
    }
    img:nth-child(5){
      position: fixed;
      width: 0.6rem;
      border-radius: 0.4rem;
      height: 0.6rem;
      right: 0.2rem;
      bottom: 0.85rem;
      z-index: 5;
    }
    p:nth-child(6){
      position: absolute;
      display: inline-block;
      right: 1.35rem;
      color: #fff;
      bottom: 0.45rem;
      z-index: 5;
    }
    img:nth-child(7){
      position: fixed;
      width: 0.8rem;
      border-radius: 0.4rem;
      height: 0.8rem;
      right: 0.6rem;
      bottom: 0.1rem;
      z-index: 5;
    }
  }
}
.golden_iden_return{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
}
</style>

<script>

import tabber from '@/components/tabbar/index.vue'
import Search from '@/components/Search/index.vue'
import HomeContent from './HomePage/HomeContent.vue'



export default {
  components:{
    tabber,
    Search,
    HomeContent
  },
  data(){
    return{
      selected:"000",
      mylabels: [], // 我的频道标签
      tagList:[],//
      goldenisShow:false,//

    }
  },
  created() {
        this.getMyLabels()
        //this.getAllLabels()
  },
  methods:{
    //编辑标签
    LabelEdit(){
      this.$router.push({
        path:'/Home/labeledit',
        query:{

        }
      })
    },
    TagList(item){
      console.log(item)
      this.tagList=item
    },
    //取消金点子
    goldenisSHOW(){
      this.goldenisShow=false
    },
    //编辑金点子
    goldenisShowimg(){
      this.goldenisShow=true
    },
    //发图文
    imagesText(){
      this.$router.push({
        path:'/articleDatails',
        query:{

        }
      })
    },
    // 获取我的频道标签
    getMyLabels() {
      this.$request({
          api: this.$config.api.queryUserTagList,
          data: {
          userId:'muj'
          }
      }).then(res => {
          if (res.code === 0 && res.msg === 'success') {
          this.mylabels = res.result
          
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
    /**
     * 查询评论的点赞列表
     */
    // queryArticleDiscAppreList(pageNumber, fn) {
    //   this.$request({
    //     api: this.$config.api.queryArticleDiscAppreList,
    //     data: {
    //       pageNumber,
    //       discId: this.id,
    //       rowCount: 20,
    //     }
    //   }).then(res => {
    //     if (res.code === 0 && res.msg === 'success') {
    //       this.total = res.result.totalAppre
    //       const volist = res.result.volist ? res.result.volist : []
    //       this.isMore = volist.length === 20
    //       this.list = [...this.list, ...volist]
    //     } else {
    //       Toast({
    //         message: res.msg,
    //         duration: 3000
    //       });
    //     }
    //     if (fn) { fn() }
    //   }).catch(err => {
    //     if (fn) { fn() }
    //     Toast({
    //       message: err,
    //       duration: 3000
    //     });
    //   })
    // },

  }
}
</script>
