<template>
    <div class="detail">
        <header>
            <p @click="back"><  返回</p>
            <p><span>商品</span><span>详情</span></p>
            <p class="bg"></p>
        </header>
        <section>
            <div class="main">
                <div class="banner">
                    <img :src="arr.obj_data" alt="">
                </div>
                <ul>
                    <li>
                        <p class="title">{{arr.goods_name}}</p>
                    </li>
                    <li>
                        <div class="left">
                            <p>
                                <span>￥{{arr.discount_price}}</span><span class="old">￥{{arr.discount_price*1+18}}</span>
                            </p>
                            <p>(运费: ￥0.00)</p>
                        </div>
                        <div class="right">
                            <button>溯源查询</button>
                        </div>
                    </li>
                </ul>
                <div class="shop">
                    <div>
                        <p class="logo"></p>
                        <p>
                            <span>嫩江源食品专营店</span>
                            <span>店主 : NJY1407004</span>
                        </p>
                    </div>
                    <p>
                        <button class="btn">进入店铺</button>
                    </p>
                </div>
                <div class="swip">
                    <h4>
                        <img src="../img/daodao.png" alt="">
                        <span>热门推荐</span>
                        <img src="../img/daodao.png" alt="">
                    </h4>
                    <div class="deBox swiper-container">
                        <ul class="swiper-wrapper">
                            <li class="swiper-slide">
                                <dl>
                                    <dt><img src="../images/1.jpg" alt=""></dt>
                                    <dd>
                                        <p>谛品居 菌品赐福-野生菌礼盒 山珍礼盒 810g</p>
                                        <p>￥108.8</p>
                                    </dd>
                                </dl>
                            </li>
                            <li class="swiper-slide">
                                <dl>
                                    <dt><img src="../images/1.jpg" alt=""></dt>
                                    <dd>
                                        <p>谛品居 菌品赐福-野生菌礼盒 山珍礼盒 810g</p>
                                        <p>￥108.8</p>
                                    </dd>
                                </dl>
                            </li>
                            <li class="swiper-slide">
                                <dl>
                                    <dt><img src="../images/2.jpg" alt=""></dt>
                                    <dd>
                                        <p>谛品居 菌品赐福-野生菌礼盒 山珍礼盒 810g</p>
                                        <p>￥108.8</p>
                                    </dd>
                                </dl>
                            </li>
                            <li class="swiper-slide">
                                <dl>
                                    <dt><img src="../images/1.jpg" alt=""></dt>
                                    <dd>
                                        <p>谛品居 菌品赐福-野生菌礼盒 山珍礼盒 810g</p>
                                        <p>￥108.8</p>
                                    </dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <div>
                <p>
                    <img src="../images/05.png" alt="">
                    <span>客服</span>
                </p>
                <p>
                    <img src="../images/7.png" alt="">
                    <span class="shopNum">{{$store.state.add_shop.length}}</span>
                    <span>购物车</span>
                </p>
            </div>
            <div class="add_shopcar">加入购物车</div>
            <div class="bynow">立即购买</div>
        </footer>
    </div>
</template>

<script>
    export default {
        name: 'details',
        data(){
          return {
              arr:{}
          }
        },
        created(){
            if( window.localStorage.getItem("local_shop")){
                this.$store.commit("local_data",JSON.parse(window.localStorage.getItem("local_shop")))
            }
        },
        methods:{
            back(){
                window.history.go(-1)
            }
        },
        mounted(){
            var num=this.$route.params.id;
            this.$store.state.shop_list.forEach((v,i)=>{
                v.forEach((val,j)=>{
                    if(val.goods_id==num){
                        this.arr=val
                    }
                })
            })
            console.log(this.arr)
        }
    }
</script>

<style lang="scss" scoped>
    header{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        font-size: 14px;
        p{
            margin: 0 10px;
            span{
                margin: 0 5px;
            }
        }
        .bg{
            background: url(../images/index.png)no-repeat center center;
            width: 40px;
            height: 25px;
            background-size: contain;
        }
    }
    section{
        margin-top: 48px;
        margin-bottom: 50px;
        .main{
            background: #fff;
            .banner{
                img{width: 100%;}
            }
            ul{
                padding-bottom: 10px;
                li{
                    display: flex;
                    justify-content: space-between;
                    .title{
                        border-top: 1px solid #eeeeee;
                        padding: 8px;
                        color: #333;
                        line-height: 18px;
                        text-align: left;
                    }
                    div{
                        margin: 0 10px;
                    }
                    .left{
                        p{
                            margin-top: 5px;
                            .old{
                                text-decoration: line-through;
                                margin-left: 10px;
                                color: #999999;
                            }
                        }
                    }
                    .right{
                        button{
                            outline: none;border: none;
                            text-align: center;
                            background: #4f99f2;
                            border-radius: 5px;
                            color: #fff;
                            padding: 6px 12px;
                        }
                    }
                }
            }
            .shop{
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 20px;
                padding-bottom: 8px;
                border-bottom: 5px solid #eee;
                div{
                    display: flex;
                }
                p{
                    margin: 0 10px;
                    &:nth-child(2){
                        display:flex;
                        flex-direction: column;
                        span{
                            line-height: 17px;
                        }
                    }
                    .btn{
                        outline: none;
                        border: 1px solid #666;
                        background: #fff;
                        color: #333;
                        border-radius: 8px;
                        padding: 5px 12px;
                    }
                }
                .logo{
                    background: url(../images/a.jpg)no-repeat;
                    background-size: contain;
                    width: 25px;
                    height: 25px;
                    margin-right: 0;
                }
            }
            .swip{
                h4{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    line-height: 35px;
                    img{width: 20px;}
                    span{margin: 0 10px;}
                }
                .deBox{
                    ul{
                        margin: 0 15px;
                        li{
                            float: left;
                            margin-right: 15px;
                            width: 2.07rem;
                            dl{
                                dt{width: 2.04rem;}
                                img{width: 100%;}
                                dd{
                                    p:nth-child(1){
                                        margin: 6px;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                        display: -webkit-box;
                                        -webkit-line-clamp: 1;
                                        -webkit-box-orient: vertical;
                                    }
                                    p:nth-child(2){
                                        font-size: 14px;
                                        font-weight: bold;
                                        color: #fc4141;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    footer{
        position: fixed;
        bottom: 0;
        background: #fff;
        width: 100%;
        height: 52px;
        border-top: 1px solid #ccc;
        display: flex;
        align-items: center;
        z-index: 200;
        div{
            display: flex;
            p{
                display: flex;
                flex-direction: column;
                margin: 0 8px;
                align-items: center;
                img{width: 22px;margin-bottom: 8px;}
                &:nth-child(2){
                    position: relative;
                }
                .shopNum{
                    display: inline-block;
                    background: red;
                    color: #fff;
                    width: 15px;
                    line-height: 15px;
                    text-align: center;
                    border-radius: 10px;
                    position: absolute;
                    right: 0px;
                    top: -4px;
                }
            }
        }
        .add_shopcar{
            flex: 1;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: #fe8282;
            color: #fff;
        }
        .bynow{
            flex: 1;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            background: #fb4142;
            color: #fff;
        }
    }
</style>
