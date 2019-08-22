<template>
<div class="articleDatails">
    <mt-header fixed title="销傲天下">
      <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
    </mt-header>
    <div class="articleDatails_content">
        <header>{{DetailData.taTtile}}</header>
        <div class="cinten_footer"  >
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
                {{DetailData.selfScore}}分
            </span>
            <span>
                <img src="@/assets/img/eye.png" alt="">
                {{DetailData.taCount}}
            </span>
            <span>{{DetailData.taCreateDate}}</span>
        </div>
        <div class="conetnt_list" >
            {{DetailData.taContent}}
        </div>
        <div class="footer_content">
            <ul>
                <li>
                    <img src="@/assets/img/comment.png" alt="">
                    评分
                </li>
                <li>
                    <img src="@/assets/img/examine.png" alt="">
                    考试
                </li>
                <li>
                    <img src="@/assets/img/praise.png" alt="">
                    点赞
                </li>
            </ul>
        </div>
        <div class="recommend_list">
            <h3>相关文章推荐</h3>
            <ul>
                <li v-for="(item,index) in ArticleData" :key="index"
                 >
                    {{item.taTtile}}
                </li>
            </ul>
        </div>
        <div class="comment_list">
            <div class="comment_title">
                <div @click="CommentShow=false">
                   <p :class="CommentShow==false?'Comment':''">评论</p>
                    <span>{{DiscListData.discCount}}</span> 
                </div>
                <div @click="CommentShow=true">
                    <p  :class="CommentShow==true?'Comment':''">点赞</p>
                    <span>{{DiscListData.appreCount}}</span>
                </div>
            </div>
            <div class="comment_content">        
                <div class="comment" v-show="CommentShow==false" >
                    <ul>
                        <li v-for="(item,index) in DiscListData.volist" :key="index">
                            <div class="comment_img fl">
                                <img src="@/assets/img/praise.png" alt="">
                            </div>
                            <div class="comment_Datails">
                                <div class="comment_name">
                                    {{item.tadName}}
                                    
                                    <span>{{item.appreCount}}
                                    <img src="@/assets/img/praise.png" alt="">
                                    </span>
                                </div>
                                <p>{{item.tadContent}}</p>
                                <div class="comment_timer">
                                    <span>{{item.commentDate}}</span>
                                    <span>回复</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                </div>
                <div class="like" v-show="CommentShow==true">
                    <ul>
                        <li>
                            <img src="@/assets/img/praise.png" alt="">
                            <span></span>
                            <span></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="footer_comment">
        <textarea name="" id="" cols="30"  :rows="rows"  placeholder="写评论..."   @blur="comment"  @focus="commentClick" ></textarea>
        <div class="footer_like" v-show="isShow==false">
            <img src="@/assets/img/praise.png" alt="">
            <img src="@/assets/img/praise.png" alt="">
            <img src="@/assets/img/praise.png" alt="">
        </div>
        <button v-show="isShow==true" >发布</button>
    </div>
</div>
</template>

<style lang="less" scoped>
.articleDatails_content{padding-top: 0.44rem;}
.fl{float: left;}
.fr{float: right;}
.articleDatails{
    background: #E8E8E8;
    text-align: left;
    font-size: 0.16rem;

}
header{
    font-size: 0.16rem;
    color: #000000;
    line-height: 0.26rem;
    background: #fff;
    padding: 0.13rem 0.15rem 0.08rem;
}
.conetnt_list{
    background: #fff;
    padding: 0.2rem 0.15rem;

}
.footer_content{
    margin-bottom: 0.15rem;
    overflow: hidden;
    background: #fff;
    ul{
        border-top: 1px solid  #D2D5DB;
        overflow: hidden;
        padding: 0.13rem 0.12rem 0.13rem 0.19rem;
        li{
            border: 1px solid #d6d6d6;
            font-size: 0.14rem;
            text-align: center;
            border-radius: 0.23rem;
            width: .96rem;
            height: 0.32rem;
            line-height: 0.32rem;
            color: #666666;
            float: left;
            img{
                width: 0.16rem;
                height: 0.16rem;
            }
            
        }
        li:nth-child(2){
            margin: 0 0.25rem;
        }
        li:nth-child(3){
            float: right;
        }
    }

}
.cinten_footer{
    padding: 0 0.15rem ;
    height: .16rem;
    line-height: 0.16rem;
    font-size: 0.11rem;
    background: #fff;
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
.recommend_list{
    margin-bottom: 0.15rem;
    background: #fff;
    h3{
        font-size: 0.16rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border-bottom: 1px solid  #D2D5DB;
        padding: 0 0.15rem;
        color: #000;
        font-weight: 600;}
    ul li{
        padding: 0.10rem 0.15rem 0.20rem;
        width: 100%;
        font-size: 0.14rem;
        color: #666666;
    }
}
.comment_list{
    background: #fff;
    overflow: hidden;
    .comment_title{
        border-bottom: 1px solid  #D2D5DB;
        overflow: hidden;
        div{
            min-width: .7rem;
            float: left;
            height: 0.4rem;
            margin: 0 0.15rem 0 .3rem;    
            p{
                display: inline-block;
                color: #000;
                height: 0.4rem;
                line-height: 0.4rem;
                font-weight: bold;
                font-size: .16rem;
                &.Comment{
                    color: #F44848;
                    border-bottom: .03rem solid #F44848;
                }
            }
           
        }
    }
    .comment_content{
        padding:  0.15rem;
        .comment_img{
            width: 0.38rem;
            height: 1rem;
            img{
                width: 0.33rem;
                height: 0.38rem;
                border-radius: 0.19rem;

            }
        }
        .comment_Datails{
            .comment_name{
                font-size: 0.16rem;
                padding: 0.1rem;
                font-weight: 600;
                span{
                    float: right;
                    font-size: 0.12rem;
                    padding-right: 0.08rem;
                    font-weight: 400;
                    img{
                        width: 0.2rem;
                        float: right;
                        height: 0.2rem;
                    }
                   
                }
                
            }
            .comment_timer{
                span{
                    font-size: 0.11rem;
                    color: #979797;
                    margin-right: 0.08rem;
                }
                span:nth-child(2){
                    width: 0.16rem;
                    height: 0.16rem;
                    padding: 0 0.1rem;
                    color: #F44848;
                    font-size: 0.11rem;
                    border: 1px solid #f44848;
                    background: #fff3f3;
                    border-radius: 0.23rem;
                }
            }
        }
    }
    
}
.like{
    ul{
        li{
            img{
                width: 0.33rem;
                height: 0.38rem;
                border-radius: 0.19rem;
            }
            span:nth-child(1){
                float: left;
                width: 1rem;
                margin-left: .09rem;
                margin-top: .1rem;
                color: #000000;
                font-size: .14rem;
            }
            span:nth-child(2){
                float: right;
                width: 1.5rem;
                font-size: .12rem;
                margin-top: .11rem;
                color: #666666;
                text-align: right;
            }
        }
    }
}
.footer_comment{
    display: flex;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.1rem 0.15rem;
    textarea{
        flex: 1;
        padding: 0 0.1rem;
        line-height: 0.32rem;
        border: none;
        background: #F4F4F4;
        border-radius: 23px;
    }
    .footer_like{
        flex: 1;
        text-align: center;
        height: 0.32rem;
        line-height: 0.32rem;
        img{
            margin-right: 0.3rem;
            flex: 1;
            width: 0.25rem;
            height: 0.25rem;
        }
        img:nth-child(3){
            flex: 1;
            float: right;
            margin-right: 0;
        }
         img:nth-child(2){
            flex: 1;

        }
    }
    button{
        border: none;
        background: #fff;
        
    }

}

</style>

<script>
export default {
    data(){
        return{
            isShow:false,//
            rows:1,//
             offset:1,//
            length:10,//
            CommentShow:false,//点赞评论
            DetailData:[],//详情数据
            ArticleData:[],//推荐数据
            DiscListData:[],//评论点赞数据

        }
    },
    created(){
        this.queryArticleDetail()
        this.queryArticleDiscList()
        this.queryTagArticleList()
    },
    methods:{
        //
        comment(){
            this.isShow=false  //
            this.rows=1
        },
        //footer评论
        commentClick(){
            this.isShow=true  //
            this.rows=3 //
        },
        // 查询文章详情
        queryArticleDetail() {
            this.$request({
                    api: this.$config.api.queryArticleDetail,
                    data: {
                        userId:'muj',
                        articleId:this.$route.query.taId,
                        tmpId:this.$route.query.tmpId,
                    }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                   this.DetailData = res.result
                
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
        //文章评论列表
        queryArticleDiscList() {
            this.$request({
                    api: this.$config.api.queryArticleDiscList,
                    data: {
                        userId:'muj',
                        articleId:this.$route.query.taId,
                        pageNumber:this.offset,
                        rowCount:this.length,
                    }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.DiscListData = res.result
                
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
        //  获取相关文章推荐
        queryTagArticleList() {
            this.$request({
                    api: this.$config.api.queryTagArticleList,
                    data: {
                        userId:'muj',
                        taTtile:'',
                        pageNumber:1,
                        tagId:2,
                    }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.ArticleData = res.result
                
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
    }
}
</script>
