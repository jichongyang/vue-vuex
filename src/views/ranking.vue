<template>
    <div class="box">
        <header>
            <p><img src="../img/return.png" alt=""></p>
            <p>
                <img src="../img/serach.png" alt="">
                <input type="text">
            </p>
        </header>
        <nav>
            <p>综合 <span></span></p>
            <p>销量 <span></span></p>
            <p>价格 <span></span></p>
        </nav>
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
</template>
<script>
    export default{
        name:"ranking",
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
<style lang="scss" scoped>
    .box{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        background: #eeeeee;
    }
    header{
        width:100%;
        height:1rem;
        background: #fff;
        border-bottom: 1px solid #ccc;
        display: flex;
    }
    header>p:first-child{
        width:10%;
        height:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width:.5rem;
            height:.5rem;
        }
    }
    header>p:last-child{
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width:90%;
        padding:0 5%;
        img{
            position: absolute;
            width:.4rem;
            height:.4rem;
            left:10%;
        }
        input{
            width:100%;
            height:80%;
            background: #f5f5f5;
            border:none;
            border-radius: .4rem;
            padding-left:.8rem;
            outline: none;
        }
    }
    nav{
        width:100%;
        height: .72rem;
        display: flex;
        background: #fff;
        border-bottom: 1px solid #f3f3f3;
        justify-content: space-between;
        flex-shrink: 0;
        p{
            width:15%;
            height:100%;
            color: #999;
            font-size: .24rem;
            position: relative;
            display:flex;
            justify-content: center;
            align-items: center;
            span{
                position: absolute;
                bottom:0;
                left:50%;
                margin-left:-3px;
                border:5px solid transparent;
                border-bottom-color:red;
            }
        }
    }
    main {
        width: 100%;
        margin-bottom: .8rem;
    }
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