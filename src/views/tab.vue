<template>
    <div class="wrap">
        <header class="header">
            <span @click=go()><</span>
            <span class="s2">天天特惠</span>
            <span><img src="../img/bg_shop.png" alt=""></span>
        </header>
        <div class="main">
            <nav class="nav">
                <span :class="{bg:'1'==name}" @click="change(1)">家乡美味</span>
                <span :class="{bg:'2'==name}" @click="change(2)">特产卤味</span>
                <span :class="{bg:'3'==name}" @click="change(3)">特产糕点</span>
            </nav>
            <div class="banner">
                <img src="../img/3.png" alt="">
            </div>
            <div class="con">
                <dl v-for="i in tab_arr">
                    <dt>
                        <img :src="i.obj_data" alt="">
                    </dt>
                    <dd>
                        <div class="describe">{{i.goods_name}}</div>
                        <div class="bot">
                            <p><span class="now">￥{{i.discount_price}}</span><span class="old">￥{{i.market_price}}</span></p>
                            <p class="buy">立即购买</p>
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>
<script>
    export default({
        name:"tab",
        data(){
            return {
                name:"1",
                datas:[],
                tab_arr:[]
            }
        },
        created(){
            this.name=this.$route.params.name
            this.$http.get("src/static/json/tehui.json").then((data)=>{
                this.datas=data.data
                this.datas.forEach((v,i)=>{
                    if(v.pid==this.name){
                        this.tab_arr.push(v)
                    }
                })
            })
        },
        methods:{
            change(s){
                this.tab_arr=[]
                this.name=s
                this.datas.forEach((v,i)=>{

                    if(v.pid==this.name){

                        this.tab_arr.push(v)
                    }
                })
            }
        }
    })
</script>
<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:100%;
        display:flex;
        background:#F3F3F3;
        flex-direction:column;
        .header{
            height:1rem;
            background:#fff;
            border-bottom: 1px solid #D1D1D1;
            display:flex;
            -webkit-justify-content:space-between;
            line-height:1rem;
            padding-left:.15rem;
            span{
                -webkit-flex:1;
                font-size:.3rem;
                color:#7F7F7F;
            }
            .s2{
                text-align: center;
            }
            img{
                width:.8rem;
                height:.8rem;
                position:fixed;
                right:.15rem;
                top:.1rem;
            }
        }
    }


    .main{
        width:100%;
        height:100%;
        background:#fff;
        flex:1;
        overflow: auto;
        .nav{
            width: 100%;
            height: 1.1rem;
            line-height: 1.1rem;
            background: #ff1945;
            display:flex;
            span{
                flex:1;
                color:#fff;
                font-size:.32rem;
                text-align: center;
            }
        }
        .banner{
            width: 100%;
            height:2.6rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .con{
            width:100%;
            margin-bottom: 1rem;
            dl{
                display:flex;
                width:94%;
                height: 2.74rem;
                margin-left:3%;
                padding:.2rem;
                border-bottom: 1px solid #e5e5e5;
                dt{
                    flex:2;
                    height:100%;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                dd{
                    flex:5;
                    margin-left:.2rem;
                    font-size:.3rem;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-between;
                    .describe{
                        font-size:.28rem;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;

                    }
                    .bot{
                        display:flex;
                        justify-content:space-between;
                        .buy{
                            background: #FC4141;
                            color:#fff;
                            padding:.24rem .5rem;
                            border-radius:30px;
                        }
                        p:first-child{
                            display:flex;
                            flex-direction:column;
                            .now{
                                font-size: .34rem;
                                font-weight: bold;
                                color: #FC4141;
                            }
                            .old{
                                font-size: .24rem;
                                color: #999;
                                text-decoration: line-through;
                            }
                        }
                    }
                }
            }
        }
    }

    .bg{
        background:#ff4669;
    }
</style>