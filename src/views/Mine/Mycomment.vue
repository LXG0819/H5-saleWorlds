<template>
    <div class="Mine_commen">
        <mt-header fixed title="我的评论">
            <mt-button  slot="left" @click.native="GoClick()">
                <img src="@/assets/img/common_nav-fanhui_nor.png" />
            </mt-button>
        </mt-header>
        <div class="Commen_list">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
                <div class="Commen_Datails">
                    <ul>
                        <li v-for=" (item,index) in CommenData" :key="index">
                            <div class="commen_title">
                                <div class="title_header">
                                    <img src="@/assets/img/my_comment.png" alt="">
                                    <h3>{{item.userName}}</h3>
                                    <p>{{item.commentsDate}}</p>
                                </div>
                                <p>{{item.commentsContent}}</p>
                            </div>
                            <div class="commen_Datails">
                                <div class="Datails_hader">
                                    <p>{{item.articleTitle}}</p>
                                    <div class="footer_Datails">
                                        <span>
                                            <img src="@/assets/img/my_comment.png" alt="">
                                            {{item.articleScore}}分
                                        </span>
                                        <span>
                                            <img src="@/assets/img/my_comment.png" alt="">
                                            {{item.articleBrowse}}
                                        </span>
                                        <span>
                                            {{item.articleDate}}
                                        </span>
                                    </div>
                                </div>
                                <div class="Commen_dataimg">
                                    <img :src="item.articleImage" alt="">
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </div>
            </scroller>
        </div>
        <!-- <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
        </scroller> -->
    </div>
</template>
<style lang="less" scoped>
.Mine_commen{
    background: #e8e8e8;
    position: relative;
}
.Commen_list{
    position: absolute;
    width: 100%;
    top: 0.44rem;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    text-align: left;
}
ul{
    background: #fff;
    overflow: auto;
    li{
        padding:0.15rem 0.1rem;
        margin-bottom: 0.1rem;
        .commen_title{
            text-align: left;
            .title_header{
                position: relative;
                padding-left: 0.44rem;
                margin-bottom: 0.06rem;
                img{
                    width: 0.38rem;
                    height: 0.38rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                h3{
                    font-size: .14rem;
                    color: #000000;
                }
                p{
                    color: #979797;
                    font-size: 0.11rem;
                }
            }
            p{
                color: #000;
                font-size: 0.16rem;
                margin-bottom: 0.08rem;
            }
        }
        .commen_Datails{
           border-radius: 0.06rem;
           position: relative;
           background: #e8e8e8;
           .Datails_hader{
                padding: .12rem 1.39rem .21rem .11rem;
                text-align: left;
                p{
                    font-size: 0.14rem;
                    min-height: .42rem;
                    margin-bottom: 0.15rem;
                }
               .footer_Datails{
                   span{
                       margin-left: 0.1rem;
                       font-size: 0.11rem;
                       color: #979797;
                       img{
                           width:0.11rem;
                           height: 0.11rem;
                       }
                   }
               }
           }
            .Commen_dataimg{
                position: absolute;
                top: .12rem;
                right: .21rem;
                width: 1.13rem;
                height: 0.84rem;
                img{
                   width: 100%;
                   height: 100%;
                }
            }
           
        }
    }
}
</style>
<script>
export default {
    data(){
        return{
            page:1,//
            size:10,//
            CommenData:[],//
        }
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
        //
        GoClick(){
            this.$router.go(-1)
            console.log('11123')
        },
        // 获取我的评论信息
        myComments() {
            this.$request({
                api: this.$config.api.myComments,
                data: {
                    userId:'muj',//
                    page:this.page,//
                    size:this.size,//
                }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.CommenData = res.result
                
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
        this.myComments()
    }
}
</script>