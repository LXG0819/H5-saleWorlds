<template>
    <div class="golden_imageText">
        <mt-header fixed title="发图文">
            <mt-button  slot="left" @click="$root.goBack()"><img src="@/assets/img/common_nav-fanhui_nor.png" /></mt-button>
        </mt-header>
        <div class="from_goldenText">
           <div class="from_title">
               <span>标题</span>
               <input type="text" placeholder="请输入标题">
           </div>
           <div class="from_category">
               <span>标题</span>
               <div class="category" @click="CategoryClick()">
                   请选择类别
                   <img src="@/assets/img/icon_btn_right.png" alt="">
               </div>
           </div>
           <div class="image_tetx_content">
               <p>内容</p>
               <textarea placeholder="请输入内容" name="" id="" cols="30" rows="5"></textarea>
               <ul>
                   <li>
                        <div></div>
                   </li>
               </ul>
           </div>
        </div>
        <footer> 提交</footer>
        <mt-popup  class="popup_show"  v-show="Display==true" position="bottom">
            <div class="popup_title">
                <span @click="CategoryReturn">取消</span>
                <span @click="accomplishClick()">完成</span>
                <mt-popup
                    :style="{display:'block'}"
                    v-model="popupVisible"

                    position="bottom">
                    ...
                </mt-popup>
            </div>
        </mt-popup>
        <mt-actionsheet
            :actions="actions"
            :method="actionsheet()"
            closeOnClickModal='true'
            cancelText="取消"
            v-model="sheetVisible">
        </mt-actionsheet>
        <div class="popupVisible"  v-show="Display==true" @click="CategoryReturn"></div>
    </div>
</template>
<style lang="less" scoped>
.golden_imageText{
    text-align: left;
    padding-top: 0.44rem;
    font-size: 0.14rem;
    color: #666666;
    background: #ebebeb;
}
.from_goldenText{
    overflow-y: scroll;

}
.from_title{
    padding: 0 0.12rem;
    background: #fff;
    overflow: hidden;
    border-bottom: 1px solid rgba(203, 207, 214, 0.5);
    span{
        height: 100%;
        line-height: 0.43rem;

    }
    input{
        text-align: right;
        border: none;
        color: #9b9b9b;
        padding: 0.12rem 0;
        width: 2.5rem;
        float: right;
        height: 0.4rem;
    }

}
.from_category{
    padding: 0 0.12rem;
    background: #fff;
    margin-bottom: 0.1rem;
    overflow: hidden;
     span{
        height: 100%;
        line-height: .43rem;
    }
    .category{
        text-align: right;
        border: none;
        color: #666;
        padding: .12rem 0;
        width: 2.5rem;
        float: right;
        height: .4rem;
        line-height: .16rem;
        img{
            width: .05rem;
            height: 0.1rem;
        }
    }
}
footer{
    position: fixed;
    width: 100%;
    right: 0;
    left: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    background: #F44848;
    height: 0.5rem;
    line-height: 0.5rem;

}
.popup_show{
    z-index: 5;
    background: #fff;
    height: 2rem;
    width: 100%;
    .popup_title{
        padding:0 0.15rem;
        
        span{
            height: 0.36rem;
            line-height: 0.36rem;
        }
        span:nth-child(2){
            height: 0.36rem;
            line-height: 0.36rem;
            color: #F44848;
            float: right;
        }
    }
}
.image_tetx_content{
    padding: 8px 0;
    background: #fff;
    p{
        padding: 0 0.15rem 0.08rem 0.15rem;

    }
    textarea{
        padding: 0 0.15rem;
        border: none;
        border-bottom: 1px solid rgba(203, 207, 214, 0.5);
        width: 100%;
    }
    ul{
        padding: 0 0.15rem;
        margin-top: 8px;
        overflow: hidden;
        li{
            float: left;
            margin: 0.05rem 0.06rem 0 0;
            div{
                width: 0.86rem;
                height: 0.86rem;
                background: url(../../assets/img/door-picture.png) center no-repeat;
                padding: 0.28rem;
                background-size: 0.38rem;
                border: 1px dashed #C7C7CC;
            }
        }
    }
}
.popupVisible{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 4;
}
</style>

<script>
export default {
    data(){
        return{
            Display:false,//
            sheetVisible:false,//
            actions:["拍照","从相册中选择"]
        }
    },
    methods:{
        //选择类别
        CategoryClick(){
            this.Display=true
        },
        //取消
        CategoryReturn(){
            this.Display=false
        },
        //完成
        accomplishClick(){
            this.Display=false
        },
        //
        actionsheet(){
            console.log("111")
            this.sheetVisible=true
        },

    }
}
</script>
