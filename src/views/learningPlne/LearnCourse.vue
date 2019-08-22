<template>
    <div class="Learn_Course">
        <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" >
            <div class="Course_Datails">
                <ul>
                    <li v-for="(item,index) in CourseListData" :key="index" @click="artucleDatails(item)">
                        <div class="Learnlist_img" v-show="item.taPage">
                            <img :src="item.taPage" alt="">
                        </div>
                        <div class="Learnlist_content">
                            <h3>{{item.taTtile}}</h3>
                            <div class="Learnlist_label">
                                <p>{{item.tmName}}</p>
                            </div>
                            <div class="Learnlist_footer">
                                <span>{{item.taScore}}评分</span>
                                <span>{{item.taCount  | courseTaCount}}阅读量</span>
                                <span>{{item.taCreateDate  | courseTime}}</span>
                            </div>
                        </div>
                        <div class="study_state">
                            <p v-if="item.tacCompl < 100">{{item.tacCompl | courseProgress}}</p>
                            
                        </div>
                    </li>
                </ul>
            </div>
        </scroller>
    </div>
</template>

<style lang="less" scoped>
/* !important; */
.Learn_Course{
    position: absolute;
    width: 100%;
    top: 1.10rem;
    bottom: 0.48rem;
    overflow: hidden;
    background: #fff;
    text-align: left;
}

.Learn_Course{
    ul{
        overflow: auto;
        padding: 0.15rem;
        li{
            overflow: hidden;
            justify-content: space-between;
            padding: .12rem 0 .09rem 0;
            border-bottom: 1px solid rgba(210,213,219, .5);
            .Learnlist_img{
                width: 1.14rem;
                height: 0.74rem;
                float: left;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .Learnlist_content{ 
                padding-left: .12rem;
                width: 1.58rem;
                min-height: .72rem; 
                float: left;
                h3{
                    font-size: 0.16rem;
                    color: #000000;
                    overflow: hidden;
                    max-height: 0.46rem;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                }
                .Learnlist_label{
                    text-align: left;
                    p{
                        display: inline-block;
                        padding: 0px 4px;
                        border: 1px solid #F44848;
                        border-radius: 0.10rem;
                        color: #F44848;
                        font-size: 0.09rem;
                    }
                }
                .Learnlist_footer{
                   
                    span{
                        font-size:0.11rem;
                        color: #979797;
                    }
                    
                }
            }
           .study_state{
               text-align: center;
                width: .66rem;
                min-height: .72rem;
                border-radius: .23rem;
                background: #FFFFFF;
                float: right;
                color: #F44848;
                p{
                    font-size: 0.14rem;
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
            offset:1,//
            length:10,//
            CourseListData:[],//
        }
    },
    created() {
        this.queryUserCourseList()
        //this.getAllLabels()
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
        // 获取我的频道标签
        queryUserCourseList() {
            this.$request({
                    api: this.$config.api.queryUserCourseList,
                    data: {
                        userId:'muj',
                        type:'Y',
                        offset:this.offset,
                        length:this.length,
                    }
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.CourseListData = res.result
                
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
        //文章详情
        artucleDatails(item){
            this.$router.push({
                path:'/articleDatails',
                query:{
                    taId:item.taId,
                    tmpId:item.tmpId
                }
            })
        },
    },
    mounted(){

    }
}
</script>