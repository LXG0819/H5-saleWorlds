<template>
    <div class="browsing_history">
        <mt-header fixed title="我的历史">
            <mt-button  slot="left " @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
        </mt-header>
        <div class="history_listdatails">
            <scroller :on-infinite="infinite" 
             :on-refresh = "refresh" 
             class="history_scroller"
             ref="my_scroller">
                <div class="history_content">
                    <ul>
                        <li v-for="(item,index) in BrowsingData" :key="index">
                            <div class="history_title" v-if="index == 0 || item.browseDate !== BrowsingData[index-1].browseDate">
                                <img src="@/assets/img/date-node.png" alt="" />
                                {{item.browseDate}}
                            </div>
                            <div class="history_datails">
                                <p>{{item.browseTime}}读了</p>
                                <h1>标题:{{item.browseTitle}}</h1>
                            </div>
                            <div class="history_line"></div>
                        </li>
                    </ul>
                    
                </div>
                <p class="noData">没有更多数据</p>
            </scroller>
        </div>
    </div>
</template>
<style lang="less" scoped>
.history_listdatails{
    padding-top: 0.44rem;
    background: #fff;
    text-align: left;
}
.history_scroller{
    padding-top: 0.44rem;
}
.history_content{
    position: relative;
    padding: 1px .16rem 0 .45rem;
    overflow: hidden;
    .history_title{
        position: relative;
        color: #000;
        height: 0.22rem;
        margin-bottom: .05rem;
        font-size: .16rem;
        margin-top: .12rem;
        img{
            position: absolute;
            top: 0.05rem;
            left: -0.25rem;
            width: 0.1rem;
            height: 0.1rem;
            z-index: 2;
        }
        
    }
    .history_datails{
        background: #f4f4f4;
        padding: 0.06rem 0.1rem 0.05rem 0.12rem;
       
        p{
            color: #979797;
            font-size: 0.11rem;
            margin-bottom: 0.05rem;
        }
        h1{
            font-size: 0.14rem;
            color: #000;
        }
    }
    .history_line{
        position: absolute;
        left: 0.25rem;
        background: #979797;
        top: 0.19rem;
        width: 1px;
        height: 100%;
        z-index: 1;
    }
    
}
.noData{
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
export default {
    data(){
        return{
            BrowsingData:[],//
            page:1,//
            size:20,
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
            this.$refs.my_scroller.finishInfinite(true)
            console.log("infinite");
        },
        // 获取我的信息
        browseHistory() {
            this.$request({
                api: this.$config.api.browseHistory,
                data: {
                    userId:'muj',
                    size: this.size,
                    page: this.page,
                }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.BrowsingData = res.result
                
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
        this.browseHistory()
    }
}
</script>