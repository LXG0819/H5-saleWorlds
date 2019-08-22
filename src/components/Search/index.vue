<template>
<div class="search">
    <div class="search_text">
        <div class="search_img">
            <img src="@/assets/img/search.png" alt="">
        </div>
        <input type="text" class="search_input"  v-model="searchText" :class="{search_show:isShow }"  @blur="isShow=false" @focus="isShow=true" :placeholder="placeholder" />
        <div class="search_detele" @click="searchDetele()">
           <img src="@/assets/img/delete.png" alt="">
        </div>
    </div>
    <div class="search_bottom" @click="searchButton()">
        <button :class="{show:isShow }"  >{{btnText}}</button>
    </div>


</div>
</template>
<style lang="less" scoped>
.search{
    height: 0.49rem;
    border-bottom: 1px solid #D2D5DB;
    background: #fff;
    overflow: hidden;
    padding: 0.09rem 0.15rem;
    .search_text{
        height: 0.32rem;
        background: #f4f4f4;
        font-size: 0.14rem;
        border-radius: 0.23rem;
        color: #9B9B9B;
        float: left;
        .search_img{
            width: 0.32rem;
            height: 0.32rem;
            padding: 0.06rem;
            float: left;
            img{
                width: 0.2rem;
                height: 0.2rem;
            }
        }
        .search_input{
            border: none;
            float: left;
            height: 0.32rem;
            width: 2.8rem;
            background: #f4f4f4;
            &.search_show{
                width: 1.8rem;
            }
        }
        .search_detele{
            width: 0.32rem;
            height: 0.32rem;
            padding: 0.06rem;
            float: right;
            img{
                width: 0.2rem;
                height: 0.2rem;
            }
        }
    }
    .search_bottom{
        float: right;
        button{
            border: none;
            background: #ff6363;
            color: #fff;
            border-radius: 0.05rem;
            padding: 0;
            width:0;
            height: 0.32rem;
            font-size: 0;
            &.show{
                width: 0.8rem;
                margin-left: 0.08rem;
                padding: 0 0.06rem;
                font-size: 0.14rem;
            }
        }
    }
}
</style>
<script>
export default {
    name: 'search',
    props: {
        placeholder: {
        type: String,
        default: '输入课程名称搜索'
        },
        btnText: {
        type: String,
        default: '搜索'
        }
    },
    data(){
        return{
            searchText:'',//
            isShow:false,//
        }
    },
    methods:{
        //
        searchDetele(){
            this.searchText=''
        },
        searchButton(){
            console.log("搜索了",this.searchText)
        },

    },
}
</script>




