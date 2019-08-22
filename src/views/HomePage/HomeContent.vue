<template>
    <div class="content_list">
        <div class="Child_tags">
            <div class="Childtags_list" v-for="(item,index) in tagList.tagList" :key="index">
                {{item.tmName}}
            </div>
        </div>
        <div class="content_Datails" :style="{display:'block'}">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
                 <ul>
                     <li v-for="(item,index) in ContentData " :key="index">
                        <div class="content_title" :class="item.imgulrid=='Y'?'IMGnone':''" >{{item.title}}</div>
                        <div class="content_img">
                            <img :src="item.taPage" alt="">
                        </div>
                        <div class="video_content">
                            <p>{{item.taTtile}}</p>
                            <div class="video_list">
                                <video :src="item.taContent" :poster="item.taPage"
                                controls preload="none" ></video>

                            </div>
                        </div>
                        <div class="cinten_footer" :class="item.imgulrid=='Y'?'IMGnone':''" >
                            <span>
                                <img src="@/assets/img/fire.png" alt="">
                                精华
                            </span>
                            <span>
                                <img src="@/assets/img/top.png" alt="">
                                置顶
                            </span>
                            <span>
                                <img src="@/assets/img/graded.png" alt="">
                                {{item.taScore}}分
                            </span>
                            <span>
                                <img src="@/assets/img/eye.png" alt="">
                                {{item.taCreateDate}}
                            </span>
                            <span></span>
                        </div>
                        
                     </li>
                 </ul>
            </scroller>
        </div>
        <!-- <div class="golden_Idea">
            <ul>
                <li>
                    <div class="golden_header">
                        <img src="@/assets/img/no_data.png" alt="">
                        <h3>张天财</h3>
                        <p>22223333</p>
                    </div>
                    <div class="golden_Idea_title">
                        <h2></h2>
                        <div class="golden_idea_content">
                            <p></p>
                            <span>全文</span>
                        </div>
                    </div>
                    <div class="img_list">
                        <div class="item_img">

                        </div>
                    </div>
                    <div class="golden_footer">
                        <ul>
                            <li>
                                <img src="@/assets/img/eye.png" alt="">
                                精华
                            </li>
                            <li>
                                <img src="@/assets/img/message.png" alt="">
                                精华
                            </li>
                            <li>
                                <img src="@/assets/img/like.png" alt="">
                                精华
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div> -->
        <div class="content_none" v-show="isShow==true" >
            <img src="@/assets/img/no_data.png" alt="" >
            <p>该标签下还没有对应文章</p>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content_list{
    position: fixed;
    left: 0;
    top: 1.34rem;
    bottom: .5rem;
    right: 0;
    overflow: hidden;
    border-top: 0.01rem solid rgba(210, 213, 219, 0.5);
}
.golden_Idea{
    font-size: 0.14rem;
    text-align: left;
    color: #666666;
    letter-spacing: 0;
    margin-bottom: 0.1rem;
    .golden_header{
        font-size: 0.11rem;
        color: #979797;
        padding: 0 0.15rem;
        padding-bottom: 0.12rem;
        
        h3{
            font-size: 0.14rem;
            color: #000000;
        }
        img{
            height: 0.4rem;
            width: 0.4rem;
            float: left;
            border-radius: 0.2rem;
        }
    }
    .golden_Idea_title{
        padding: 0 0.15rem;
        border-bottom: 1px solid #D2D5DB;
        h2{
            font-size: 0.16rem;
            color: #000000;
        }
        .golden_idea_content{
            height: 0.64rem;
            font-size: 0.14rem;
            color: #666666;
            p{

            }
            span{
                font-size: 0.14rem;
                color: #001E1E;
            }
        }
        .img_list{
            .item_img{
                width: 1.14rem;
                height: 1.15rem;
                margin-right: 0.04rem;
                img{
                    widows: 100%;
                    height: 100%;
                }
            }

        }
        
    }
    .golden_footer{
        
        ul{
            overflow: hidden;
            display: flex;
            text-align: center;
            li{
                flex: 1;
                float: left;
                height: 0.4rem;
                line-height: 0.4rem;
                img{
                    height: 0.15rem;
                    width: 0.20rem;
                }
            }
        }
    }
}




.content_Datails{
    position: relative;
    height: 100%;
    width: 100%;
    ul{
        overflow: auto;
        li{
           margin: 0 0.15rem;
           padding: 0.12rem 0;
           width: auto;
           border-bottom: 1px solid #D2D5DB;
           text-align: left;
           overflow: hidden;
        }
   }
}
.content_title{
    font-size: 0.16rem;
    color: #000000;
    letter-spacing: 0;
    padding:0 0.1rem 0.15rem 0;
    &.IMGnone{
        width: 70%;
        float: left;
    }
}

.cinten_footer{
    height: .16rem;
    line-height: 0.16rem;
    font-size: 0.11rem;
    span{
        font-size: 0.11rem;
        color: #979797;
        line-height: 0.16rem;
        img{
            height: 0.1rem;
            width: 0.1rem;
        }
    }
    span:nth-child(1),span:nth-child(2){
        color: #F44848;
    }
    &.IMGnone{
        width: 70%;
        float: left;
    }
}
.content_img{
    float: right;
    width: 30%;
    img{
        width:100%;
        height: 0.84rem;
    }
}
.Child_tags{
    padding:0 0.15rem;
    width: auto;
    overflow: hidden;
    background: #F4F4F4;
    .Childtags_list{
        background: #FFFFFF;
        border-radius: 0.23rem;
        float: left;
        width: 0.72rem;
        height: 0.28rem;
        margin:0.06rem 0.19rem 0 0;
        line-height: 0.28rem;
        font-size: 0.13rem;
        color: #9B9B9B
    }
    div:nth-child(4){
        margin:0.06rem 0;
    }
}
.content_none{
    padding-top: 1.2rem ;
    color: #666;
    p{
        margin: 0.06rem 0;
    }
}
.video_list{
    width: 100%;
    height: 2rem;
}
</style>


<script>

import { Loadmore } from 'mint-ui';

export default {
    props:{
        tagList: {
            default: true
        },
    },
    data(){
        return{
            isShow:false,//
            ContentData:[],//
        }
    },
    created() {
       this.Taglist=this.tagList.tagList
    },
    methods:{
        /**
         * 下拉刷新
         */
        refresh() {
          console.log("refresh");
          this.$refs.my_scroller.finishPullToRefresh();
        },

        /**
         * 上拉获取
         */
        infinite(done) {
        console.log("infinite");
        },
        // 获取模块标签文章
        queryTagArticleList() {
            this.$request({
                api: this.$config.api.queryTagArticleList,
                data: {
                    pageNumber:  1,
                    userId:"muj",
                    tagId:this.tagList.tmId
                }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.ContentData = res.result
                
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
        this.queryTagArticleList()
    }
}
</script>

