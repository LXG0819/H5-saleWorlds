<template>
    <div class="exam_MineData">
        <mt-header fixed title="我的考试">
            <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
        </mt-header>
        <div class="history_listdatails">
            <div class="exam_schedule">
                <div class="schedule">
                    <div class="schedyle_Data">
                        <img src="@/assets/img/fabulous.png" :style="{left:(percentage*0.029)+'rem'}" alt="">
                        <img src="@/assets/img/circular.png" :style="{left:(percentage*0.030)+'rem'}" alt="">
                        <span :style="{left:(percentage*0.03)+'rem'}">{{percentage}}%</span>
                        <div class="schedyle_Datails" :style="{width:percentage+'%'}"></div>
                    </div>
                </div>
                <p>已考{{examComData.examsTakenNum}}节/共{{examComData.examinationsNum}}节</p>
            </div>
            <div class="exam_list">
                <ul>
                    <li @click="Examscroller=true" :class="Examscroller==true?'ExamList':''">待考试列表</li>
                    <li @click="Examscroller=false" :class="Examscroller==false?'ExamList':''">已考试列表</li>
                </ul>
            </div>
            <div class="eaxm_scroller" v-show="Examscroller==true">
                <scroller :on-infinite="infinite" 
                    :on-refresh = "refresh" 
                    class="history_scroller"
                    ref="my_scroller">
                    <div class="Totext_list" v-for="(item,index) in waitExamData" :key="index">
                        <p>
                            {{item.tmpModelsName}}
                            <img src="@/assets/img/jf-right-icon.png" alt="">
                        </p>
                        <div class="footer_button">
                            <img :src="item.articleImg" alt="">
                            <h1>{{item.articleTitle}}</h1>
                            <button>开始考试</button>
                        </div>
                    </div>
                    <p class="noData">没有更多数据</p>
                </scroller>
            </div>
            <have-text v-show="Examscroller==false"></have-text>
        </div>
    </div>
</template>
<style lang="less" scoped>
.exam_MineData{
    background: #f4f4f4;
}
.history_listdatails{
    padding: 0.54rem 0.1rem;
    background: #f4f4f4;
    text-align: left;
}
.history_scroller{
    padding:0 0.1rem;
    .Totext_list{
        background: #fff;
        
        p{
            max-width: 40%;
            display: inline-block;
            font-size: .12rem;
            color: #666666;
            height: .17rem;
            margin-bottom: .05rem;
            img{
                width: .1rem;
                height: .17rem;
            }
        }
       
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
.exam_schedule{
    width: 100%;
    padding: .53rem .14rem .19rem .1rem;
    background: #fff;
    margin: 0.1rem 0;
    border-radius: .06rem;
    border: 1px solid rgba(203, 207, 214, 0.5);
    P{
        margin-top: 0.3rem;
        font-size: .18rem;
        text-align: right;
        color: rgba(0, 0, 0 , 0.5);
    }
    .schedule{
        .schedyle_Data{
            position: relative;
            border: 1px solid #04AEFD;
            padding: 0.01rem;
            border-radius: .1rem;
            img:nth-child(1){
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
                top: -0.4rem;
                left: -0.1rem;
                /* max-left:3.0rem;
                min-left:-0.1rem 
                3.08*/
            }
            img:nth-child(2){
                position: absolute;
                width: 0.28rem;
                height: 0.28rem;
                top: -0.03rem;
                left: -0.04rem;
                /* max-left:3.04rem;
                min-left:-0.04rem
                3.08 */
            }
            span{
                font-size: .18rem;
                color: #F44848;
                position: absolute;
                height: 0.4rem;
                top: 0.2rem;
                left: 0rem;
            }
            .schedyle_Datails{
                background: linear-gradient(90deg, #59E4FF 0%, #04AEFD 100%);
                height: 0.2rem;
                border-radius: .1rem;
                width: 100%;
            }
        }
    }
}
.exam_list{
    background: #fff;
    ul{
        overflow: hidden;
        li{
            float: left;
            color: #000;
            font-size: .16rem;
            padding: 0.1rem;
            &.ExamList{
                color: #F44848;
                border-bottom: 1px solid #f44848;
            }
        }
        li:nth-child(2){
            margin-left: 0.44rem;
        }
        
    }
}
.eaxm_scroller{
    position: fixed;
    top: 2.68rem;
    left: 0;
    right: 0;
    bottom: 0;

}


</style>
<script>
import HaveText from './HaveText.vue'
export default {
    components:{
        HaveText
    },
     data(){
        return{
            Examscroller:false,//
            page:10,//
            size:1,
            examComData:[],//考试完成率
            percentage:0,//
            waitExamData:[],//获取我的待考试列表

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
        // 获取我的待考试列表
        waitExamination() {
            this.$request({
                api: this.$config.api.waitExamination,
                data: {
                    userId:'muj',
                    page:this.page,
                    size:this.size,
                }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                    res.result = res.result ? res.result : []
                    this.waitExamData = [...this.waitExamData, ...res.result]
                    
                } else {
                    this.$messagebox.alert(res.msg ? res.msg : '请求出现错误')
                }
            })
        },
        // 获取我的考试完成率
        async examinationCompletionRate() {
            await this.$request({
                api: this.$config.api.examinationCompletionRate,
                data: {
                    userId:'muj',
                }
            }).then((result) => {
                if (result.code == 0 ) {
                   this.examComData=result.result[0]
                   this.percentage = (this.examComData.examsTakenNum/this.examComData.examinationsNum)*100
                } else {
                  this.$messagebox.alert(result.msg ? result.msg : '请求出现错误')
                }
            })
        },
         /**
         * 请求数据
         * @param loadMore { Boolean } 是否是 重置数据
         * @param done { Function } 上下拉 完毕 函数
        */
        async getTdata(loadMore) {
            if (!loadMore) {
                this.page = 1
                this.waitExamData=[]
            }
            await this.waitExamination()
        },
    },
    mounted(){
        this.examinationCompletionRate()
        this.getTdata()
    }
}
</script>