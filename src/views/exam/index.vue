<template>
    <div class="eaxm_Datails">
        <mt-header fixed title="考试">
            <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
        </mt-header>
        <div class="eaxm_contentDatails">
            <div class="eaxm_title">
                <h3>标题标题标题</h3>
            </div>
            <div class="eaxm_listDatails">
                <ul>
                    <li>
                        <p>考试总分</p>
                        <span>100</span>分
                    </li>
                    <li>
                        <p>考试时长</p>
                    <span>10</span>分钟
                    </li>
                    <li>
                        <p>及格分数</p>
                        <span>60</span>分
                    </li>
                    <li>
                        <p>可考次数</p>
                        <span>3</span>次
                    </li>
                </ul>
            </div>
            <div class="eaxm_listcontent">
                <ul>
                    <li >
                        <div class="eaxm_topic">
                            <div class="imgred"></div>
                            <h3>题目</h3>
                            <span>(单选)</span>
                        </div>
                        <div class="riden_option">
                            <mt-radio
                                align="left"
                                title=""
                                v-model="Radiovalue"
                                :options="options">
                            </mt-radio>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer_content">
            <ul>
                <li>
                    <img src="@/assets/img/examtime@2x.png" alt="">
                    <span>08</span>分<span>15</span>秒
                </li>
                <li @click="modelShowClick">
                    提交试卷
                </li>
                
            </ul>
        </div>
        <div class="model_box" v-show="modelShow==true">
            <div class="submit_exam"  v-show="modelShow==22">
                <span></span>
                <ul>
                    <li  @click="modelShow=true">继续作答</li>
                    <li  @click="modelShowsubmit" >确定</li>
                </ul>
            </div>
            <div class="exam_pass">
                <div class="exam_Passimg"></div>
                <div class="eaxm_sbumit">
                    <p>考试已通过</p>
                    <h2>90分</h2>
                    <span>本次考试共10题，</span>
                </div>
                <ul>
                    <li  @click="modelShow=true">继续作答</li>
                    <li  @click="modelShowsubmit" >确定</li>
                </ul>
            </div>
        </div>
        <div class="model_show" v-show="modelShow==true" @click="modelShow=false" ></div>
    </div>
</template>
<style lang="less" scoped>
.eaxm_Datails{
    position: relative;
    text-align: left;
}
.eaxm_contentDatails{
    padding-top: 0.44rem;
}
.eaxm_title{
    padding: 0.15rem;
    background: url(../../assets/img/exam@2.png) no-repeat 0 0;
    color: #fff;
    height: 1.5rem;
    h3{
        width: 100%;
        text-align: left;
        font-size: 0.16rem;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
.eaxm_listDatails{
    padding: 0.25rem;
    font-size: 0.14rem;
    overflow: hidden;
    color: #666;
    position: absolute;
    top: 0.88rem;
    background: #fff;
    z-index: 6;
    right: 0.1rem;
    left: 0.1rem;
    border-radius: 0.05rem;
    box-shadow: 0px 2px 2px #ccc;
    width: 3.55rem;
    ul{
        display: flex;
        li{
            flex: 1;
            border-right: 1px solid #e8e8e8;
            padding: 0 0.15rem; 
            span{
                color: red;
            }
        }
        li:nth-child(4){
            border: none;
        }
    }
}
.eaxm_listcontent{
    padding-top: 0.45rem;
    ul{
        li{
            padding: 0.25rem 0.15rem 0 0.15rem;

            .eaxm_topic{
                overflow: hidden;
               
                height: 0.22rem;
                line-height: 0.22rem;
                .imgred{
                    width: 0.1rem;
                    height: 0.1rem;
                    
                    float: left;
                    background: red;
                    border-radius: 0.5rem;
                    
                }
                h3{
                    font-size: 0.16rem;
                    font-weight: 600;
                    font-size:16px;
                    color: #000;
                    float: left;
                }
                span{
                    font-size: 14px;
                    float: left;
                    color: #666;
                }
            }
        }
    }
}
.riden_option{
    font-size: 0.14rem;
    color: #666;
    text-align: left;
}

.footer_content{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.10);
    background: #fff;

    ul{
        display: flex;
        
        li:nth-child(1){
            flex: 3;
            height: 0.5rem;
            line-height: 0.5rem;
            color: #666;
            font-size: 0.14rem;
            padding: 0 0.15rem;
            span{
                color: #F44848;
            }
            img{
                width: 0.2rem;
                height:0.2rem;
            }
        }
        li:nth-child(2){
            text-align: center;
            flex: 1;
            background: #F44848;
            height: 0.5rem;
            line-height: 0.5rem;
            box-shadow: 0 -2px 8px 0 rgba(0,0,0,0.10);
            font-size: 0.14rem;
            color: #fff;

        }
    }
}
.model_show{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    z-index: 10;
}
.model_box{
    width: 3rem;
    position: fixed;
    top: 35%;
    right: 10%;
    z-index: 11;
    background: #FFFFFF;
    border: 1px solid #979797;
    border-radius: 0.15rem;
    .submit_exam{
        padding: 0.3rem 0.15rem;
        font-size: 0.14rem;
        color: #000;
        span{
            color: #F44848;
        }

    }
    ul{
        display: flex;
        border-top: 1px solid #e8e8e8;
        li{
            color: #000;
            
            text-align: center;
            height: 0.4rem;
            line-height: 0.4rem;
            flex: 1;
            font-size: 0.14rem;
        }
        li:nth-child(2){
            color: #F44848;
            border-left: 1px solid #e8e8e8;
        }
    }
}
.exam_pass{
    .exam_Passimg{
        background-image: url("../..//assets/img/examSucceed@2x.png")  ;
        background-size: 3rem 1rem;
        height: 1rem;
    }
    .exam_Failimg{
        background-image: url("../..//assets/img/examFailed@2x.png")  ;
        background-size: 3rem 1rem;
        height: 1rem;
    }
    .eaxm_sbumit{
        padding: 0.25rem;
        text-align: center;
        p{
            font-size: 0.14rem;
            color: #F44848;
        }
        h2{
            font-size: 0.16rem;
            color: #F44848;
            font-weight: 600;
        }
        span{
            color: #666;
            font-size: 0.14rem;
        }
    }
}

</style>

<script>
export default {
    data(){
        return{
            options:['选项A', '选项B', '选项C'],//
            modelShow:false,//
            Radiovalue:'',//
        }
    },
    methods:{
        modelShowClick(){
            console.log(this.modelShow)
            this.modelShow=true
            console.log(this.modelShow)
        },
        //
        modelShowsubmit(){

        }
    }
}
</script>


