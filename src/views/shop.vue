<template>
    <div class="container">
        <header>
            <div>购物车</div>
            <p>
                <span v-if="del" @click="delet">编辑</span>
                <span v-else @click="delet">完成</span>
            </p>
        </header>
        <div class="cont">
            <div class="null" v-if="flag">
                <div class="void">
                    <div class="shopp"></div>
                    <ul>
                        <li>购物车为空</li>
                        <li>
                            <a>
                                <span>去逛逛</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="shop_list" v-else>
                <ol>
                    <li v-for="i in shopping_arr">
                        <div>
                            <p :class="{bg:i.state}" @click="change_state(i.goods_id)"></p>
                        </div>
                        <div>
                            <img :src="i.obj_data" alt="">
                        </div>
                        <div>
                            <p>{{i.store_name}}</p>
                            <p>
                                <span>
                                    <b>×{{i.status}}</b>
                                    <b>￥{{i.discount_price}}</b>
                                </span>
                                <span>
                                    <b @click="subtract(i.goods_id,false)">-</b>
                                    <b>{{i.status}}</b>
                                    <b @click="subtract(i.goods_id,true)">+</b>
                                </span>
                            </p>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
        <div class="h5">
            <h5>
                <img src="../img/daodao.png" alt="">
                热门推荐
                <img src="../img/daodao.png" alt="">
            </h5>
        </div>
        <main>
            <ul>
                <li>
                    <img src="../img/shop1.jpg" alt="">
                    <p>裕龙酒业原味稻2.5kg*2袋无常大米礼品装，稻花香2</p>
                    <p>
                        <span>￥110.00</span>
                        <img src="../img/che.png" alt="">
                    </p>
                </li>
                <li>
                    <img src="../img/shop2.jpg" alt="">
                    <p>福溶嘉 组合装礼盒（红花籽油+亚麻籽油） 1L*2建</p>
                    <p>
                        <span>￥398.00</span>
                        <img src="../img/che.png" alt="">
                    </p>
                </li>
                <li>
                    <img src="../img/shop3.jpg" alt="">
                    <p>好恰 山茶油礼盒2L*2、提</p>
                    <p>
                        <span>￥448.00</span>
                        <img src="../img/che.png" alt="">
                    </p>
                </li>
                <li>
                    <img src="../img/shop4.jpg" alt="">
                    <p>都市余味 红香妃葡萄干218g</p>
                    <p>
                        <span>￥25.90</span>
                        <img src="../img/che.png" alt="">
                    </p>
                </li>
            </ul>
        </main>
        <footer v-if="!flag">
            <div>
                <p @click="check" :class="{check_all:check_all_state}"></p>
                <p>全选</p>
            </div>
            <div>
                <p v-if="del">合计: <span>￥{{this.$store.state.total_price}}</span></p>
                <p @click="settlement" v-if="del">结算</p>
                <p @click="settlement" v-else class="del">删除</p>
            </div>
        </footer>
    </div>
</template>
<script>
    import ale from "../js/popup.js"
export default{
    name:"Shop",
    data(){
        return {
            flag:true,
            shopping_arr:[],
            state:false,
            total_price:0,
            num:90,
            check_all_state:false,
            del:true,
            pay_arr:[]
        }
    },
    created(){
        window.scrollTop=0
        if( window.localStorage.getItem("local_shop")){
            this.$store.commit("local_data",JSON.parse(window.localStorage.getItem("local_shop")))
        }
        if(this.$store.state.add_shop){
            this.flag=false
            this.shopping_arr=this.$store.state.add_shop
        }
        this.shopping_arr.forEach((v,i)=>{
            v.state=false
        })
    },
    watch:{
        num(){
            this.total_price=0
            this.shopping_arr.forEach((v,i)=>{
                if(v.state){
                    this.total_price+=v.status*v.discount_price
                }
            })
            this.$store.commit("calculate",this.total_price)
        }
    },
    methods:{
        change_state(id){
            var check_all_one=true;
            this.total_price=0
            this.shopping_arr.forEach((v,i)=>{
                if(v.goods_id==id){
                    v.state=!v.state
                }
                if(v.state){
                    this.total_price+=v.status*v.discount_price
                }else{
                    check_all_one=false
                }
            })
            if(check_all_one){
                this.check_all_state=true
            }else{
                this.check_all_state=false
            }
            this.$store.commit("calculate",this.total_price)
        },
        subtract(id,sta){
            this.num--
            this.shopping_arr.forEach((v,i)=>{
                if(v.goods_id==id){
                   if(sta){
                       v.status+=1
                   }else{
                       v.status-=1
                       if(v.status<=0){
                           v.status=1
                       }
                   }
                }
            })
        },
        check(){
            this.num++
            this.check_all_state=!this.check_all_state
                this.shopping_arr.forEach((v,i)=>{
                    v.state=this.check_all_state
                })
        },
        settlement(){
            if(this.del){
                this.shopping_arr.forEach((v,i)=>{
                    if(v.state){
                        this.pay_arr.push(v)
                    }

                })
                this.$store.commit("pay",this.pay_arr)
                this.$router.push("/pay")
            }else{
                ale.popup({
                content:"确定要删除吗?",
                judge:["确定","取消"],
                callback:(s)=>{
                    if(s){
                        var brr=[];
                        this.shopping_arr.forEach((v,i)=>{
                            if(v.state){
                                brr.push(v.goods_id)
                            }
                        })
                        this.$store.commit("remove_shop",brr)
                    }
                }
            })

            }
        },
        delet(){

            this.del=!this.del
            this.total_price=0;
            this.check_all_state=false;
            this.$store.commit("calculate",this.total_price)
            this.shopping_arr.forEach((v,i)=>{
                v.state=false
            })
        }
    }

}
</script>
<style lang="scss" scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #eeeeee;
    }
    header{
        width: 100%;
        height: 1rem;
        background: #fafafb;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        p{
            width:15%;
            height:100%;
            position: absolute;
            right:0;
            top:0;
            span{
                width:100%;
                height:100%;
                color: #000;
                font-size: .32rem;
                text-align: center;
                line-height: 1rem;
            }
        }
    div{
            font-size:.35rem;
            text-align: center;
            line-height:1rem;
        }
    }
    .cont{
        width: 100%;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #ffffff;
    .void {
        width: 100%;
        background: #fff;
        position: relative;
        border-bottom: 1px solid #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding:.6rem 0;
    .shopp{
        width: 1.44rem;
        height: 1.44rem;
        background: url(../img/bg_shop.png)no-repeat;
        background-size: 100%;
        margin-bottom: .2rem;
    }
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    li{
        margin-bottom: .2rem;
        line-height: .5rem;
        color: #666666;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    span{
        color: #fc4141;
        width: 2.1rem;
        display: block;
        padding: .1rem .3rem;
        border: 1px solid #fc4141;
        border-radius: 4px;
        font-size: .34rem;
    }
    }
    }
    }

    }
    .shop_list{
        width:100%;
        background: #eeeeee;
        ol{
            width:100%;
            li{
                width:100%;
                display: flex;
                height: 2.6rem;
                background: #fff;
                margin-bottom: .2rem;
                div{
                    &:first-child{
                        width:10%;
                        height:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;

                        p{
                            width: .48rem;
                            height: .48rem;
                            border-radius: 50%;
                            border: 1px solid #ccc;
                            position: relative;
                            input{
                                width:100%;
                                height:100%;
                                position: absolute;
                                opacity: 0;
                            }
                        }
                        .bg{
                            background: red;
                        }
                        .bg:after{
                            position: absolute;
                            color: #fff;
                            content: "";
                            width: .3rem;
                            height: .13rem;
                            border-bottom: 2px solid #fff;
                            border-left: 2px solid #fff;
                            transform: rotateZ(-45deg);
                            top: .1rem;
                            left: .05rem;
                        }
                    }
                    &:nth-child(2){
                        width:25%;
                        height:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img{
                            width:2rem;
                            height:2rem;
                        }
                    }
                    &:last-child{
                        width:65%;
                        height:100%;
                        p{
                            width:100%;
                            &:first-child{
                                height:40%;
                                color:#666;
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                font-size: .32rem;
                                display: flex;
                                align-items: center;
                                padding: .2rem 0 0 .4rem;
                            }
                            &:last-child{
                                height:60%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                span{
                                    &:first-child{
                                        width:30%;
                                        height:100%;
                                        display: flex;
                                        flex-direction: column;
                                        padding-left: .4rem;
                                        b{
                                            &:first-child{
                                                font-size:.3rem;
                                            }
                                            &:last-child{
                                                font-size: .36rem;
                                                color:red
                                            }
                                        }
                                    }
                                    &:last-child{
                                        width:70%;
                                        height:100%;
                                        display: flex;
                                        justify-content: center;
                                        align-items: center;
                                        b{
                                            color: #333333;
                                            font-size: .45rem;
                                            width:.7rem;
                                            height:.7rem;
                                            text-align: center;
                                            line-height: .7rem;
                                            border:1px solid #ccc;
                                            &:nth-child(2){
                                                width:1rem;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    .h5{
        margin: .1rem 0;
        width: 100%;
        background: #ffffff;
        height: .9rem;
        line-height: .9rem;
    h5{
        width:100%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.3rem;
    img{
        margin:0 .2rem 0 .2rem;
        width: 0.34rem;
        height: 0.24rem;
    }
    }
    }

    main{
        width:100%;
        margin-bottom: 2rem;
    ul{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    li{
        width: 49%;
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-bottom: 2%;
    img{
        width:3.6rem;
        height:3.6rem;
    }
    p{
    &:nth-child(2){
         width:100%;
         font-size: 0.28rem;
         line-height: 0.35rem;
         height: .7rem;
         padding-left: 0.1rem;
         overflow: hidden;
         text-overflow: ellipsis;
     }
    &:last-child{
         width:100%;
         height:.7rem;
         display: flex;
         padding-left: .1rem;
         align-items: center;
         justify-content: space-between;
         padding-right:.3rem;
    span{
        font-size: 0.25rem;
        color: #fc4141;
    }
    img{
        width: 0.65rem;
        height: 0.55rem;
    }
    }
    }
    }
    }
    }

    footer{
        width: 100%;
        height: 0.93rem;
        background: #FFF;
        display: flex;
        position: fixed;
        bottom:1rem;
        /*margin-bottom: 1rem;*/
        div{
            &:first-child{
                width:50%;
                height:100%;
                display: flex;
                align-items: center;
                padding-left:.3rem;
                p{
                    &:first-child{
                        width: .48rem;
                        height: .48rem;
                        border-radius: 50%;
                        border: 1px solid #ccc; 
                    }
                    &:last-child{
                        width: 30%;
                        color: #666666;
                        text-align: center;
                        font-size: 0.3rem;
                        padding-left:.3rem;
                    }
                }
            }
            &:last-child{
                display: flex;
                height:100%;
                width:50%;
                align-items: center;
                justify-content: space-between;
                position: relative;
                .del{
                    position: absolute;
                    right:0;
                    top:0;
                }
                p{
                    &:first-child{
                        color:#666;
                        font-size: .32rem;
                        span{
                            color:red;
                            font-size: .34rem;
                        }
                    }
                    &:last-child{
                        width:40%;
                        height:100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: red;
                        color:#fff;
                        font-size: .34rem;
                    }
                }
            }
        }
    }

    .check_all{
        background: #fe8282;
    }
</style>