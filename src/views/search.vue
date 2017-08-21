<template>
    <div class="searchBox">
        <header class="header">
            <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" placeholder="请输入您要购买的商品" v-model.trim="search_shop">
            </div>
            <span @click="seach()">搜索</span>
        </header>
        <div class="main">
            <div class="con">
                <div class="now"><p>最近搜索</p>
                    <img src="../img/remo.png" alt=""></div>
                <div class="resultBox">
                    <p class="result" v-if="flag">暂无搜索结果</p>
                    <ul v-if="!flag">
                        <li v-for="i in shop_arr" @click="shop_search(i)"><span>{{i}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="history">
                <p>大家都在搜</p>
                <ul>
                    <li><span>粽子</span></li>
                    <li><span>锅巴</span></li>
                    <li><span>酱</span></li>
                    <li><span>小吃</span></li>
                    <li><span>零食</span></li>
                    <li><span>干果</span></li>
                    <li><span>特产</span></li>
                    <li><span>油</span></li>
                    <li><span>大米</span></li>
                    <li><span>面粉</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                search_shop:"",
                shop_arr:[],
                flag:true
            }
        },
        name:"seach",
        created(){
            if( window.localStorage.getItem("local_shop")){
                this.$store.commit("local_data",JSON.parse(window.localStorage.getItem("local_shop")))
            }
            if(window.localStorage.getItem("shop_history")){
                this.flag=false;
                this.shop_arr=window.localStorage.getItem("shop_history").split(",")
            }
        },
        methods:{
            seach(){
                if(this.search_shop!=""){
                    if(this.shop_arr.indexOf(this.search_shop)==-1){
                        this.shop_arr.push(this.search_shop)
                        window.localStorage.setItem("shop_history",this.shop_arr)
                    }

                    this.shop_arr=[]

                    this.$router.push("/ranking/"+this.search_shop)
                }else{
                    alert("请输入您要搜索的物品")
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .searchBox{
        width:100%;
        height:100%;
        background: #fff;
        .header{
            width:100%;
            background: #fff;
            border-bottom: 1px solid #ccc;
            height:1rem;
            display:flex;
            font-size:.32rem;
            padding:0 .2rem;
            .search{
                -webkit-flex:8;
                text-indent: .3rem;
                height:.76rem;
                background:#f5f5f5;
                border-radius: 10px;
                margin-top:.07rem;
                line-height:.76rem;
                input{
                    width:100%;
                    height:100%;
                    border:0;
                    outline: none;
                    background:none;
                }
            }
            span{
                -webkit-flex:1;
                line-height:1rem;
                text-align: right;

            }
        }
    }

    .now{
        width:100%;
        height: .95rem;
        display:flex;
        padding:0 .2rem;
        -webkit-justify-content:space-between;
        font-size: .32rem;
        line-height: .95rem;
        color: #666666;
        img{
            width: .34rem;
            height: .33rem;
            margin-top:.3rem;
        }



    }
    .resultBox{
        width:100%;
        padding:0 .4rem;
        font-size:.32rem;
        color:#666;
        ul{
            display:flex;
            flex-flow:wrap;
            li{
                margin-top: 10px;
                width:25%;
                span{
                    border: 1px solid #ccc;
                    color: #666666;
                    padding: .1rem .2rem;
                    font-size: .34rem;
                    border-radius: 5px;
                    display: inline-block;
                }
            }
        }
    }

    .history{
        padding:0 .25rem;
        p{
            font-size: .32rem;
            line-height: .95rem;
            color: #666666;
        }
        width:100%;

        ul{
            display:flex;
            flex-flow:wrap;
            li{
                margin-top: 10px;
                width:25%;
                span{
                    border: 1px solid #ccc;
                    color: #666666;
                    padding: .1rem .2rem;
                    font-size: .34rem;
                    border-radius: 5px;
                    display: inline-block;
                }
            }
        }
    }
</style>
