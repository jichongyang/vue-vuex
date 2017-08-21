<template>
    <div class="wrap">
        <header class="header">
            <ul>
                <li class="first"><img src="../img/homelo.gif" alt=""></li>
                <li class="second"><i class=" fa fa-search"></i><input type="text" placeholder="请输入您要购买的商品" @focus="tiao"></li>
                <li class="third">
                    <img src="../img/shoping.png" alt="">
                    <span>我的店铺</span>
                </li>
            </ul>
        </header>
        <div class="main">
            <div class="banner">
                <div class="swiper-container banner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide slide">
                            <img src="../img/1.png" alt="">
                        </div>
                        <div class="swiper-slide slide">
                            <img src="../img/2.png" alt="">
                        </div>
                        <div class="swiper-slide slide">
                            <img src="../img/3.png" alt="">
                        </div>
                        <div class="swiper-slide slide">
                            <img src="../img/4.png" alt="">
                        </div>
                        <div class="swiper-slide slide">
                            <img src="../img/5.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <div class="navBox">
                <ul>
                    <li>
                        <p><img src="../img/nav3.png" alt=""></p>
                        <span>牛奶乳品</span>
                    </li>
                    <li>
                        <p><img src="../img/nav1.png" alt=""></p>
                        <span>家乡味道</span>
                    </li>
                    <li>
                        <p><img src="../img/nav4.png" alt=""></p>
                        <span>休闲零食</span>
                    </li>
                    <li>
                        <p><img src="../img/nav5.png" alt=""></p>
                        <span>米面粮油</span>
                    </li>
                    <li>
                        <p><img src="../img/nav7.png" alt=""></p>
                        <span>调味调料</span>
                    </li>
                    <li>
                        <p><img src="../img/nav8.png" alt=""></p>
                        <span>酒水饮料</span>
                    </li>
                    <li>
                        <p><img src="../img/nav6.png" alt=""></p>
                        <span>生鲜果蔬</span>
                    </li>
                    <li>
                        <p><img src="../img/nav2.png" alt=""></p>
                        <span>进口食品</span>
                    </li>
                </ul>
            </div>
            <div class="dongtai">
                <span>商城动态</span>
                <div class="conBox">
                    7.17安全食品商城周年庆，暑期放价嗨不停！好吃、安全、放心的食品，陪你度假期！
                </div>
            </div>
            <div class="list">
                <div class="tehui">
                    <p class="p1">
                        <img src="../img/todayimg.png" alt="">
                        <span style="font-size:.32rem;color:#ff6d00;padding-right:.1rem">天天特惠</span>
                        <span style="font-size:.23rem;color:#ff6d00">每天有惊喜</span>
                    </p>
                    <p class="more"><a href="#">更多></a></p>
                </div>
                <div class="foodBox1">
                    <div class="left" @click="xfplay('1')">

                    </div>
                    <div class="right">
                        <div class="top"@click="xfplay('2')"></div>
                        <div class="bot"@click="xfplay('3')"></div>
                    </div>
                </div>
            </div>
            <div class="lists">
                <div class="task">
                    <p class="p2"></p>
                    <p class="p1">
                        <span class="line"></span>
                        <label for=""><img src="../img/todayimg.png" alt="">家乡味道</label>
                        <span class="line"></span>
                    </p>
                    <p class="more"><a href="#">更多></a></p>
                </div>
                <div class="list1">
                    <div class="listBox" v-for="j in dat">

                        <dl v-for="i in j">
                            <dt><img :src="i.obj_data" alt="" @click="shop_list(i.goods_id)"></dt>
                            <dd>
                                <p class="one">
                                    <span>{{i.store_name}}</span>
                                    <span>{{i.goods_name}}</span>

                                </p>
                                <p class="two">
                                    <span class="shopCar">+</span>
                                    <span>￥{{i.discount_price}}</span>
                                    <img src="../img/shop1.png" alt="" @click="add(i)">
                                </p>
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Home',
        data(){
          return {
              num:0,
              hei:document.body.scrollHeight
          }
        },
        computed:{
            dat(){
                return this.$store.state.shop_list
            }
        },
        created(){
            if( window.localStorage.getItem("local_shop")){
                this.$store.commit("local_data",JSON.parse(window.localStorage.getItem("local_shop")))
            }
        },
        watch:{
          hei(){
              this.num+=1
          }
        },
        mounted() {
            new Swiper(".swiper-container",{
                autoplay:2000,
                loop:true,
                pagination:".swiper-pagination"
            })
            window.addEventListener('scroll', this.my_scroll)
        },
        methods:{
            add(s){
                this.$store.dispatch("add_shop_1",s)
            },
            tiao(){
                this.$router.push("/seach")
            },
            shop_list(id){
                this.$router.push("/details/"+id)
            },
            my_scroll(){
                if(document.body.scrollHeight-(document.body.scrollTop+document.documentElement.clientHeight)<50){
                    if(this.num<7){
                        this.num++
                        var con=this.num
                        axios.get("./src/static/json/data"+this.num+".json").then((data)=>{
                            this.$store.dispatch("ajax_1",data.data.data.data)
                            this.num=con
                        })
                        this.num=8
                    }
                }
            },
            xfplay(s){
                this.$router.push("/tab/"+s)
            }
        }
    }
</script>
<style>
    .wrap {
        width: 100%;
        height: 100%;
        display: flex;
        -webkit-flex-direction: column;
        margin-bottom: .8rem;
         font-size: .28rem;
        background: #ccc;}
    .wrap .header {
        width: 100%;
        height: 1rem;
        /*border-bottom: 1px solid #ccc;*/
        padding: 0 .2rem;
        background: #fff; }
    .wrap .header ul {
        display: flex;
        -webkit-justify-content: space-between; }
    .wrap .header ul .first {
        -webkit-flex: 1.5;
        height: 1rem;
        position: relative; }
    .wrap .header ul .first img {
        width: 1.1rem;
        height: .4rem;
        position: absolute;
        top: .3rem; }
    .wrap .header ul .third {
        -webkit-flex: 2;
        display: flex;
        -webkit-flex-direction: column;
        text-align: center;
        font-size: 12px;
        color: #fd4848;
        margin-top: .2rem; }
    .wrap .header ul .third img {
        width: .46rem;
        height: .42rem;
        margin: 0 auto; }
    .wrap .header ul .second {
        -webkit-flex: 6.5;
        height: .7rem;
        margin: 0 0 0 .3rem;
        background: #f5f5f5;
        margin-top: .15rem;
        border-radius: 5px;
        display: flex;
        position: relative; }
    .wrap .header ul .second .fa {
        font-size: .36rem;
        color: #ccc;
        position: absolute;
        top: .2rem;
        left: .3rem; }
    .wrap .header ul .second input {
        outline: none;
        border: 0;
        background: none;
        position: absolute;
        top: .2rem;
        left: .7rem; }

    .main {
        width: 100%;
        height: 100%;
        -webkit-flex: 1;
        overflow: auto; }

    .banner {
        width: 100%;
        height: 3.54rem;
        /*border-bottom:.16rem solid #f5f5f5;*/
        background: #fff; }
    .banner img {
        width: 100%;
        height: 100%; }

    .navBox {
        width: 100%;
        background: #fff;
        padding-bottom: .2rem;
    background: #fff;}
    .navBox ul {
        display: flex;
        flex-flow: wrap;
        -webkit-justify-content: space-between; }
    .navBox ul li {
        /*-webkit-flex:1;*/
        width: 25%;
        margin-top: .2rem;
        color: #666;
        text-align: center;
        font-size: .26rem;
        line-height: .5rem; }
    .navBox ul li span {
        padding-top: .2rem; }
    .navBox ul li p {
        width: .9rem;
        height: .9rem;
        line-height: .9rem;
        text-align: center;
        margin: auto;
        border-radius: 50%; }
    .navBox ul li p img {
        width: 100%;
        height: 100%; }

    .dongtai {
        background: #fff;
        width: 100%;
        height: .96rem;
        background: #fff;
        display: flex;
        padding: 0 .3rem; }
    .dongtai span {
        -webkit-flex: 1;
        color: #ff6d00;
        font-size: 15px;
        font-weight: bold; }
    .dongtai .conBox {
        -webkit-flex: 7;
        height: .84rem;
        border: 1px solid #ccc;
        border-radius: 10px;
        margin-left: .2rem;
        font-size: .26rem;
        color: #666;
        padding: .05rem .2rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .tehui {
        padding: 0 .3rem;
        display: flex;
        height: .8rem;
        background: #fff;
        -webkit-justify-content: space-between;
        margin-top: .1rem;
        line-height: .8rem; }
    .tehui .p1 {
        display: flex; }
    .tehui img {
        width: .4rem;
        height: .4rem;
        margin-top: .2rem;
        margin-right: .2rem; }
    .tehui .more {
        display: flex; }
    .tehui .more a {
        font-size: .24rem;
        color: #666;
        text-decoration: none; }

    .foodBox1 {
        width: 100%;
        display: flex;
        height: 4rem;
        margin-top: .15rem; }
    .foodBox1 .left {
        -webkit-flex: 1;
        padding: 0 .05rem 0 0;
        background: url(../img/home1.png) no-repeat;
        background-size: 100% 100%; }
    .foodBox1 .right {
        -webkit-flex: 1;
        display: flex;
        padding: 0 0 0 .1rem;
        -webkit-flex-direction: column;
        -webkit-justify-content: space-between; }
    .foodBox1 .right .top {
        height: 2rem;
        background: url(../img/ruwei.png) no-repeat;
        background-size: 100% 100%; }
    .foodBox1 .right .bot {
        height: 2rem;
        background: url(../img/gaodian.png) no-repeat;
        background-size: 100% 100%;
        margin: .1rem 0 0 0; }

    .lists {
        background: #fff;
        width: 100%;
        margin-top: .15rem; }
    .lists .task {
        display: flex;
        height: .8rem;
        padding: 0 .2rem;
        background: #fff;
        margin-bottom: .15rem; }
    .lists .task .p2 {
        -webkit-flex: 2; }
    .lists .task .p1 {
        -webkit-flex: 7;
        line-height: .8rem;
        color: #ff6d00;
        font-size: .32rem;
        display: flex; }
    .lists .task .p1 img {
        width: .4rem;
        height: .4rem;
        margin-top: .23rem; }
    .lists .task .p1 label {
        display: flex;
        line-height: .8rem; }
    .lists .task .p1 .line {
        width: 20%;
        height: .04rem;
        background: #ff6d00;
        display: inline-block;
        margin-top: .4rem; }
    .lists .task .more {
        -webkit-flex: 1;
        display: flex;
        line-height: .8rem; }
    .lists .task .more a {
        font-size: .24rem;
        color: #666;
        text-decoration: none; }

    .list1 {
        width: 100%; }
    .list1 .listBox {
        width: 100%;
        display: flex;
        flex-wrap: wrap; }
    .list1 .listBox dl {
        width:50%;
        background: #fff;  }
    .list1 .listBox dl dt {
        width: 100%; }
    .list1 .listBox dl dt img {
        width: 100%;
        height: 100%; }
    .list1 .listBox dl dd {
        padding: .12rem .14rem;
        display: flex;
        height: 1.8rem;
        -webkit-flex-direction: column;
        -webkit-justify-content: space-between; }
    .list1 .listBox dl dd .one {
        height:50%;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: .23rem;
        color: #666; }
    .list1 .listBox dl dd .two {
        height:50%;
        display: flex;
        padding: .15rem 0;
        -webkit-justify-content: space-between;
        font-size: .3rem;
        color: #fd4848;
        font-weight: bold;
        position: relative; }
    .list1 .listBox dl dd .two .shopCar {
        width: .3rem;
        height: .3rem;
        display: inline-block;
        border-radius: 100%;
        background: #fd4848;
        position: absolute;
        right: -.03rem;
        top: 0rem;
        color: #fff;
        text-align: center;
        line-height: .3rem; }
    .list1 .listBox dl dd .two img {
        width: .5rem;
        height: .4rem; }
</style>