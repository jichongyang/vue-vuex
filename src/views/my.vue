<template>
    <div id="box">
        <header>
            <i class="iconfont">&#xe62d;</i>
            <p>我的717商城</p>
        </header>
        <div class="main">
            <div class="message">
                <p>
                    <img src="../img/tou.png" alt="">
                </p>
                <p>71712419214</p>
            </div>
            <div class="shop">
                <p>
                    <img src="../img/shoping.png" alt="">
                    <span>我的店铺</span>
                </p>
                <p><img src="../img/jian.png" alt=""></p>
            </div>
            <nav>
                <ul>
                    <li>
                        <i class="iconfont">&#xe604;</i>
                        <span>待付款</span>
                    </li>
                    <li>
                        <i class="iconfont">&#xe605;</i>
                        <span>待发货</span>
                    </li>
                    <li>
                        <i class="iconfont">&#xe606;</i>
                        <span>待收货</span>
                    </li>
                    <li>
                        <i class="iconfont">&#xe607;</i>
                        <span>售后</span>
                    </li>
                    <li>
                        <i class="iconfont">&#xe608;</i>
                        <span>我的订单</span>
                    </li>
                </ul>
            </nav>
            <div class="list">
                <ul>
                    <li>
                        <p>
                            <i class="iconfont">&#xe641;</i>
                            <span>我的社区</span>
                        </p>
                        <p>></p>
                    </li>
                    <li>
                        <p>
                            <i class="iconfont">&#xe640;</i>
                            <span>账户余额</span>
                        </p>
                        <p>></p>
                    </li>
                    <li>
                        <p>
                            <i class="iconfont">&#xe63f;</i>
                            <span>地址管理</span>
                        </p>
                        <p>></p>
                    </li>
                </ul>
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
                    <li v-for="i in dat[0]">
                        <img :src="i.obj_data" alt="">
                        <p>{{i.store_name}}{{i.goods_name}}</p>
                        <p>
                            <span>￥{{i.discount_price}}</span>
                            <img src="../img/che.png" alt="" @click="add_shop(i)">
                        </p>
                    </li>
                </ul>
            </main>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'My',
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
        methods:{
            add_shop(i){
                this.$store.dispatch("add_shop_1",i)
            }
        }
    }
</script>
<style scoped>
    #box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column; }

    header {
        width: 100%;
        height: 1rem;
        position: relative;
        display: flex;
        align-items: center; }
    header .iconfont {
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        left: .25rem; }
    header p {
        width: 100%;
        text-align: center;
        line-height: 1rem;
        font-size: 0.35rem;
        color: #333; }

    .main {
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        overflow-y: auto; }

    .message {
        width: 100%;
        flex-shrink: 0;
        height: 1.97rem;
        background: url(../img/bg.png);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; }
    .message p:first-child {
        width: 1.23rem;
        height: 1.24rem;
        border-radius: 100%; }
    .message p:first-child img {
        width: 100%;
        height: 100%; }
    .message p:last-child {
        text-align: center;
        color: #ffffff;
        font-size: 0.3rem;
        line-height: .5rem;
        font-weight: normal;
        font-family: PingFangSC-Regular, sans-serif; }

    .shop {
        width: 100%;
        height: 1.32rem;
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        align-items: center;
        background: #fff; }
    .shop p:first-child {
        display: flex;
        width: 35%;
        height: 100%;
        align-items: center;
        justify-content: space-around; }
    .shop p:first-child img {
        width: 0.7rem;
        height: 0.63rem; }
    .shop p:first-child span {
        font-size: .34rem;
        color: #fc4141; }
    .shop p:last-child {
        width: 0.17rem;
        height: 0.35rem; }
    .shop p:last-child img {
        width: 100%;
        height: 100%; }

    nav {
        width: 100%;
        height: 1.47rem;
        background: #fff;
        margin-bottom: .2rem; }
    nav ul {
        width: 100%;
        height: 100%;
        display: flex; }
    nav ul li {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center; }
    nav ul li .iconfont {
        color: #000;
        font-size: .50rem; }
    nav ul li span {
        color: #000;
        font-size: .28rem;
        padding-top: .1rem; }

    .list {
        width: 100%;
        background: #fff;
        margin-bottom: .1rem; }
    .list ul {
        width: 100%; }
    .list ul li {
        width: 100%;
        height: 1.03rem;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .4rem 0 .6rem; }
    .list ul li p:first-child {
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center; }
    .list ul li p:first-child .iconfont {
        font-size: .46rem;
        color: #000; }
    .list ul li p:first-child span {
        color: #000;
        font-size: .28rem; }

    .h5 {
        width: 100%;
        background: #ffffff;
        height: .9rem;
        line-height: .9rem; }
    .h5 h5 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.3rem; }
    .h5 h5 img {
        margin: 0 .2rem 0 .2rem;
        width: 0.34rem;
        height: 0.24rem; }

    main {
        width: 100%;
    margin-bottom: .8rem;}
    main ul {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between; }
    main ul li {
        width: 49%;
        display: flex;
        flex-direction: column;
        background: #fff;
        margin-bottom: 2%; }
    main ul li img {
        width: 3.6rem;
        height: 3.6rem; }
    main ul li p:nth-child(2) {
        width: 100%;
        font-size: 0.28rem;
        line-height: 0.35rem;
        height: .7rem;
        padding-left: 0.1rem;
        overflow: hidden;
        text-overflow: ellipsis; }
    main ul li p:last-child {
        width: 100%;
        height: .7rem;
        display: flex;
        padding-left: .1rem;
        align-items: center;
        justify-content: space-between;
        padding-right: .3rem; }
    main ul li p:last-child span {
        font-size: 0.25rem;
        color: #fc4141; }
    main ul li p:last-child img {
        width: 0.65rem;
        height: 0.55rem; }


</style>