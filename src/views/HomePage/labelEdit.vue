<template>
    <div class="label_edit">
        <div class="label_conseting">
            <div class="label_edit_header">
                <img src="@/assets/img/close.png" alt="" @click="GoBackClick()">
            </div>
            <div class="label_mineMode">
                <div class="label_title">
                    我的频道
                    <span>点击进入我的模块</span>
                    <button @click="CompileClick()">{{CompileData==false?'编辑':'完成'}}</button>
                </div>
                <div class="label_seation">
                    <!-- <div class="label_list" v-for="(item,index) in mylabels" :key="index">{{item.name}}</div> -->
                    <div class="label_list" v-for="(item,index) in mylabels" :key="index" >
                        {{item.tmName}}
                        <img src="@/assets/img/delete.png" alt="" v-show="CompileData== true">
                    </div>
                </div>
            </div>
            <div class="label_recommend">
                <div class="label_title">
                     模块推荐
                    <span>点击添加模块</span>
                </div>
                <div class="label_Mode">
                    <div class="Mode_list" v-for="(item,index) in labels" :key="index" > <span>+</span>{{item.tmName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.label_edit{
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #C53A3A;
    .label_conseting{
        z-index: 2;
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 0 0.2rem;
        border-top-left-radius: 0.1rem;
        border-top-right-radius: 0.1rem;
        .label_edit_header{
            padding: 0.15rem 0 ;
            text-align: left;
            img{
                width: 0.2rem;
                height: 0.2rem;
            }   
        }
        .label_mineMode{
            .label_title{
                font-size: 0.16rem;
                color: #000000;
                text-align: left;
                span{
                    font-size: 0.13rem;
                    color: #9B9B9B;
                }
                button{
                    border: 1px solid #F44848;
                    border-radius: 0.15rem;
                    float: right;
                    color: #C53A3A;
                    background: #fff;
                    width: 0.48rem;
                    height: 0.24rem;
                    font-size: 0.14rem;
                }
            }
            .label_seation{
                padding: 0.15rem 0;
                overflow: hidden;
                .label_list{
                    padding:  0 0.06rem ;
                    position: relative;
                    font-size: 0.14rem;
                    width: 0.78rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    background: #EBEBEB;
                    border-radius: 0.04rem;
                    margin:  0.05rem;
                    float: left;
                    img{
                        width: 0.2rem;
                        height: 0.2rem;
                        position: absolute;
                        top:-0.1rem;
                        right: -0.1rem;

                    }


                }
            }

        }
        .label_recommend{
            .label_title{
                text-align: left;
                font-size: 0.16rem;
                color: #000000;
                text-align: left;
                 span{
                    font-size: 0.13rem;
                    color: #9B9B9B;
                }
            }
            .label_Mode{
                padding: 0.15rem 0;
                overflow: hidden;
                .Mode_list{
                    height: 0.4rem;
                    width: 0.78rem;
                    font-size: 0.14rem;
                    float: left;
                    line-height: 0.4rem;
                    border: 1px solid #D6D6D6;
                    border-radius: 0.04rem;
                    color: 0.14rem;
                    margin: 0.11rem;
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
            CompileData:false,//
            
            allLabels: [], // 全部标签
            mylabels: [], // 我的频道标签
            labels: [], // 过滤我的频道标签的剩下的全部标签

        }
    },
    created() {
        this.getMyLabels()
        this.querySysLevelTagList()
        //this.getAllLabels()
    },
    methods:{
        //返回
        GoBackClick(){
            this.$router.go(-1)
        },
        CompileClick(){
            if(this.CompileData== true ){
                this.CompileData= false //
            }else{
                this.CompileData= true //
            }
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
            if (this.allLabels.length > 0) {
                this.labels = this.allLabels.filter(label => !this.mylabels.find(item => item.tmId === label.tmId))
            }
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
        // 获取频道所有标签
        querySysLevelTagList() {
        this.$request({
            api: this.$config.api.querySysLevelTagList,
            data: {}
            }).then(res => {
                if (res.code === 0 && res.msg === 'success') {
                this.allLabels = res.result

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
        
        // 判断标签是否已经存在我的频道里
        isExist(tmId) {
            return !this.mylabels.find(item => item.tmId === tmId)
        },

        linkTo(label) {
            if (this.isEditStatus) { return }
            this.updateLabel(label)
            this.$router.push('/')
        },
    },
    mounted(){

    }
}
</script>
