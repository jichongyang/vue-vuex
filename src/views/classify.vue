<template>
<div class="box">
    <header>
        <ul>
            <li>
                <p>
                    <img src="../img/serach.png" alt="">
                    <input type="text" placeholder="请输入你要购买的商品">
                </p>
            </li>
        </ul>
    </header>
    <main class="main">
        <div class="left">
            <ul>
                <li v-for="i in class_arr" @click="switchover(i.cate_id)" :class="{active:i.cate_id==bool}"><span>{{i.cate_name}}</span></li>
            </ul>
        </div>
        <div class="right">
            <dl v-for="j in class_arr_list">
            <dt><img :src="j.cate_icon" alt=""></dt>
            <dd>{{j.cate_name}}</dd>
        </dl>

        </div>
    </main>
</div>
</template>
<script>
    export default {
        name: 'Classify',
        data(){
          return {
              class_arr:[],
              bool:2,
              class_arr_list:[]
          }
        },
        created(){
            this.class_arr=this.$store.state.classify_shop[0]
            this.class_arr_list=this.$store.state.classify_shop[0][0].list
            console.log(this.class_arr)
            if( window.localStorage.getItem("local_shop")){
                this.$store.commit("local_data",JSON.parse(window.localStorage.getItem("local_shop")))
            }
        },
        methods:{
            switchover(id){
                this.bool=id
                this.class_arr.forEach((v,i)=>{
                    if(v.cate_id==id){
                        this.class_arr_list=v.list
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .box{
        font-size: .28rem;
    }
    header{
        width: 100%;
        height: 1rem;
        border-bottom: 1px solid #ccc;
    }
    header ul{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
    }
    header ul li{
        flex:1;
        height: 100%;
        padding: .2rem .4rem;
    }
    header ul li p{
        width: 100%;
        height: 100%;

    }
    header ul li p img{
        position: absolute;
        width: .26rem;
        height: .26rem;
        left:.8rem;
        top:.35rem;
    }
    header ul li p input{
        width: 100%;
        text-indent: .8rem;
        border: 0;
        outline: none;
        line-height:.6rem;
        background: #f5f5f5;
        border-radius:10px;
    }
    .main{
        flex:1;
        width: 100%;
        display: flex;
        padding-top: .1rem;
        overflow: auto;
    }
    .left{
        height: 100%;
        width:30%;
    }
    .left ul{
        height: 100%;
        width: 100%;
        background: #f0eced;
    }
    .left ul li{
        font-size:.28rem;
        height: .88rem;
        width: 100%;
        line-height:.88rem;
        text-align: center;
        font-weight: 500;
    }
    .active{
        width: 100%;
        height: .88rem;
        background:#fff;
        position: relative;
        color:red;
    }
    .active::after{
        content: "";
        position: absolute;
        height: 100%;
        width: 2px;
        background: red;
        left: 0;
        top: 0;
    }
    .right{
        width:70%;
        width: 100%;
    }
    .right dl{
        float: left;
        width: 30%;
        height:2.5rem;
        margin-left: .1rem;
        margin-top: .13rem;
        background: #f7f7f7;
    }
    .right dl dt{
        width: 1.4rem;
        height: 1.4rem;
        margin-top: .06rem;
        margin-left: .06rem;

    }
    .right dl dd{
        font-size:.3rem;
        margin-top: .2rem;
        color:#909090;
        overflow: hidden;
        text-align: center;
    }
    .right dl dt img{
        width: 100%;
    }
</style>