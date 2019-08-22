<template>
    <div class="eaxm_scroller" >
        <scroller :on-infinite="infinite" 
            :on-refresh = "refresh" 
            class="history_scroller"
            ref="my_scroller">
            <ul>
                <li v-for="(item,index) in alreadyExamData" :key="index">
                    <div class="Totext_list">
                        <h1>{{item.articleTitle}}</h1>
                        <div class="navber_title">
                            <span>{{item.tmpModelsName}}</span>
                            <span>交卷时间:{{item.confirmDate}}</span>
                        </div>
                        <div class="navber_label">
                           第{{item.countNum}}次考试
                            <span>{{item.pass=='N'?'不及格':'及格'}}</span>
                        </div>
                        <div class="exam_stat">
                            <div>
                                <p>得分</p>
                                <p>{{item.score}}</p>
                            </div>
                            <div>
                                <p>总题数</p>
                                <p>{{item.totalQuest}}</p>
                            </div>
                            <div>
                                <p>答对题数</p>
                                <p>{{item.trueQuest}}</p>
                            </div>
                            <div>
                                <p>用时</p>
                                <p>{{item.examinationTime}}秒</p>
                            </div>
                        </div>
                        <div class="exam_btn">
                            <button :class="item.examinationType=='Y'?'anew':''">重新考试</button>
                            <button :class="item.examinationType=='N'?'anew':''">查看答卷</button>
                        </div>
                    </div>
                </li>
            </ul>
            
            <p class="noData">没有更多数据</p>
        </scroller>
    </div>
</template>
<style lang="less" scoped>
.history_scroller{
    padding:0 0.1rem;
    .Totext_list{
        background: #fff;
        .footer_button{
            position: relative;
            padding-left: 1.26rem;
            text-align: right;
            min-height: .74rem;
            img{
                position: absolute;
                left: 0;
                top: 0;
                width: 1.14rem;
                height: .74rem;
            }
            h1{
                text-align: left;
                font-size: .15rem;
                padding: .05rem 0 .08rem .02rem;
                padding-top: .05rem;
                margin-bottom: .08rem;
                font-weight: 400;
                color: #000000;
            }
            button{
                border: none;
                background: #F44848;
                border-radius: .23rem;
                padding: .03rem .1rem;
                height: .24rem;
                text-align: center;
                font-size: .13rem;
                color: #FFFFFF;
            }
        }
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

.eaxm_scroller{
    position: fixed;
    top: 2.68rem;
    left: 0;
    right: 0;
    bottom: 0;
}
.history_scroller ul{
    li{
        text-align: left;
        padding: .06rem .15rem .15rem .1rem;
        background: #ffffff;
        border-bottom: 1px solid rgba(203, 207, 214, 0.5);
        border-top: 0;
        .Totext_list{
            h1{
                text-align: left;
                font-size: .15rem;
                padding: .05rem 0 .08rem .02rem;
                padding-top: .05rem;
                margin-bottom: .08rem;
                font-weight: 400;
                color: #000000;
            }
            .navber_title{
                font-size: .12rem;
                color: #666666;
                span:nth-child(1){
                    max-width: 40%;
                    display: inline-block;
                }
                span:nth-child(2){
                    float: right;
                }
            }
            .navber_label{
                font-size: .12rem;
                color: #F44848;
                margin-top: .07rem;
                margin-bottom: .11rem;
                span:nth-child(1){
                    display: inline-block;
                    padding: 0 .06rem;
                    font-size: .1rem;
                    color: #FFFFFF;
                    border-radius: .1rem;
                    background: #FFB000;
                    height: .14rem;
                    line-height: .14rem;
                    margin-left: .08rem;
                }
            }
            .exam_stat{
                margin-bottom: .15rem;
                box-shadow: 0 0 0.06rem 0 rgba(63, 6, 6, 0.1);
                border-radius: .05rem;
                padding: .11rem 0 .06rem;
                overflow: hidden;
                div{
                    text-align: center;
                    font-size: .12rem;
                    color: #666666;
                    float: left;
                    width: 25%;
                    p:nth-child(1){
                        color: #666;
                        font-size: .12rem;
                    }
                    p:nth-child(2){
                        color: #000000;
                        font-size: .14rem;
                    }
                }
            }
            .exam_btn{
                text-align: right;
                button{
                    min-width: .72rem;
                    height: .24rem;
                    line-height: .24rem;
                    padding: 0 .1rem;
                    font-size: .13rem;
                    color: #666666;
                    border: 1px solid rgba(214, 214, 214, 0.5);
                    text-align: center;
                    background: #ffffff;
                    border-radius: .23rem;
                    &.anew{
                        border-color: rgba(244, 72, 72, 0.5);
                        color: #F44848;
                        margin-left: .12rem;
                    }
                }
                
            }
        }
    }
}

</style>
<script>

export default {
    components:{

    },
     data(){
        return{
            alreadyExamData:[],//已考试数据
            page:1,//
            size:10,

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
            await this.alreadyExamination()
        },
        // 获取我的信息
        async alreadyExamination() {
            await this.$request({
                api: this.$config.api.alreadyExamination,
                data: {
                    userId:'muj',
                    size: this.size,
                    page: this.page,
                }
            }).then(res => {
                if (res.code == 0 ) {
                    res.result = res.result ? res.result : []
                    this.alreadyExamData = [...this.alreadyExamData, ...res.result]
                
                
                } else {
                    this.$messagebox.alert(result.msg ? result.msg : '请求出现错误')
                }
            })
        },
    },
    mounted(){
        this.getTdata()
    }
}
</script>