<template>
    <div class="Mine_Collect">
        <mt-header fixed title="我的收藏">
            <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
        </mt-header>
        <search></search>
        <div class="collect_content">
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
                <div class="Collect_List">
                    <ul>
                        <li v-for="(item,index) in myCollectionData" :key="index">
                            <div class="commen_Datails" v-if="item.articleType=='article'">
                                <div class="Datails_hader">
                                    <p>{{item.articleTitle}}</p>
                                    <div class="footer_Datails">
                                        <span>
                                            {{item.articleLabel}}
                                            <img src="@/assets/img/jf-right-icon.png" alt="">
                                        </span>
                                        <span>{{item.articleDate}}</span>
                                    </div>
                                </div>
                                <div class="Img">
                                    <img :src="item.articleImage" alt="">
                                </div>
                                
                            </div>
                            <div class="collect_video" v-else-if="item.articleType=='ideal'">
                                <p>{{item.articleTitle}}</p>
                                <div class="video">
                                    <video :src="item.articleVideo"
                                     :preload="item.articleImage"
                                     controls="controls"
                                     ></video>
                                </div>
                                <div class="footer_Datails">
                                    <span>
                                        {{item.articleLabel}}
                                        <img src="@/assets/img/jf-right-icon.png" alt="">
                                    </span>
                                    <span>{{item.articleDate}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <p class="NoData">没有更多数据</p>
                </div>
            </scroller>
        </div>
    </div>
</template>
<style lang="less" scoped>
.Mine_Collect{
    background: #f4f4f4;
    padding-top: 0.44rem;
    position: relative;
}
.collect_content{
    background: #f4f4f4;
    position: absolute;
    top:0.94rem;
    left: 0;
    right: 0;
    bottom: 0;
}
.Collect_List{
    background: #fff;
}
.commen_Datails{
    border-radius: 0.06rem;
    position: relative;
    background: #fff;
    .Datails_hader{
        padding: .12rem 0 .21rem 0;
        margin:0 0.2rem;
        text-align: left;
        border-bottom: 1px solid #e8e8e8;
        p{
            font-size: 0.14rem;
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
    .Img{
        position: absolute;
        top: .12rem;
        right: .21rem;
        width: 1.13rem;
        height: .84rem;
        img{
            width: 100%;
            height: 100%;

        }
    }
}
.collect_video{
    margin:0 0.2rem;
    padding: .12rem 0 .21rem 0;
    text-align: left;
    border-bottom: 1px solid #e8e8e8;
    p{
        font-size: 0.14rem;
        margin-bottom: 0.15rem;
    }
    .video{
        width: 100%;
        height: 1.78rem;
        margin-bottom: .08rem;
        video{
            height: 100%;
            width: 100%;
        }
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
.NoData{
    position: absolute;
    bottom: -0.3rem;
    left: 0;
    text-align: center;
    width: 100%;
    font-size: .12rem;
    color: #666666;
}
</style>
<script>
import Search from '@/components/Search/index.vue'

export default {
    components:{
        Search
    },
    data(){
        return{
            myCollectionData:[],//
            page:1,//
            size:10,
            searchName:'',//搜索名称
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
        /**
         * 请求数据
         * @param loadMore { Boolean } 是否是 重置数据
         * @param done { Function } 上下拉 完毕 函数
        */
        async getTdata(loadMore) {
            if (!loadMore) {
                this.page = 1
                this.alreadyExamData=[]
            }
            await this.myCollection()
        },
        // 获取我的收藏
        myCollection() {
            this.$request({
                api: this.$config.api.myCollection,
                data: {
                    userId:'muj',
                    page:this.page,
                    size:this.size,
                    searchName:this.searchName,//搜索名称
                }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                    this.myCollectionData = res.result
                
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
        this.getTdata()
    }
}
</script>