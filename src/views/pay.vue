<template>
    <div class="wrap">
        <header class="header">
            <p class="first" @click="back">< 返回</p>
            <p>订单支付</p>
            <p></p>
        </header>
        <div class="address" @click="skip">
            <p v-if="ads"><img src="../images/payImg/my19.png" alt="">未添加地址，请点击添加地址</p>
            <p class="p" v-else><span>{{address_obj.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{address_obj.tel}}</span><span>{{address_obj.address}}</span></p>
            <p>></p>
        </div>
        <p class="imgs"><img src="../images/payImg/6.gif" alt=""></p>
        <div class="container" v-for="i in pay_data">
            <div class="title">
                <div><img src="http://www.lb717.com/Uploads/images/admin/deposittheme/edit/13247/2017-03/huge/7197856922.jpg" alt=""></div>
                <span>{{i.store_name}}</span>
            </div>
            <dl>
                <dt><img :src="i.obj_data" alt=""></dt>
                <dd>
                    <div>{{i.goods_name}}</div>
                    <div class="jiage">
                        <div>
                            <p class="tot"></p>
                            <span style="text-decoration: line-through"></span>
                        </div>
                        <div>
                            <span @click="change_num(i.goods_id,false)">-</span>
                            <span >{{i.status}}</span>
                            <span @click="change_num(i.goods_id,true)">+</span>
                        </div>
                    </div>
                </dd>
            </dl>
            <div class="foot">
                <p><span>商品价格</span><span>{{i.discount_price}}</span></p>
                <p><span>运费</span><span>{{i.follow_num}}</span></p>
                <p><span>总额(含运费)</span><span>{{i.discount_price*i.status+i.follow_num*1|decimals}}</span></p>
            </div>
        </div>
        <div class="paywrap">
            <div class="p1">
                <p><span>余额支付</span><span>￥0.00</span></p>
                <p class="btnImg">
                    <input type="checkbox" value="1" id="tu">
                    <label for="tu" class="tu"></label>
                </p>
            </div>
            <div class="p1">
                <p><span>奖金支付支付</span><span>￥0.00</span></p>
                <p class="btnImg">
                    <input type="checkbox" value="1" id="tu">
                    <label for="tu" class="tu"></label>
                </p>
            </div>
            <ul>
                <li>
                    <p class="p2"><img src="../images/payImg/home06.png" alt=""><span>微信支付</span></p>
                    <p><span class="circle"></span></p>
                </li>
                <li>
                    <p class="p2"><img src="../images/payImg/home09.png" alt=""><span>支付宝支付</span></p>
                    <p><span class="circle"></span></p>
                </li>
                <li>
                    <p class="p2"><img src="../images/payImg/home11.png" alt=""><span>银联支付</span></p>
                    <p><span class="circle"></span></p>
                </li>
            </ul>
        </div>
        <footer class="footer">
            <ul>
                <li><p class="sum"><span>总计：</span><span>￥{{price|decimals}}</span></p><p class="trans">(含运费)</p></li>
                <li><span>定金：</span><span class="deposit">￥0.00</span></li>
                <li><button class="post">提交订单</button></li>
            </ul>
        </footer>
    </div>
</template>
<script>
    import ale from "../js/popup.js"
    export default{
        name:"pay",
        data(){
            return {
                pay_data: [],
                price:0,
                address_obj:{},
                ads:false
            }
        },
        mounted(){
            console.log(this.$store.state.address)
            console.log(window.localStorage.getItem("address")=="[object Object]")
            if(this.$store.state.address.length!=0){
                console.log(this.$store.state.address)
                this.address_obj=this.$store.state.address[this.$store.state.address.length-1]
            }else{
                if(window.localStorage.getItem("address")!="[object Object]" || JSON.parse(window.localStorage.getItem("address")).length>0){
                    console.log(JSON.parse(window.localStorage.getItem("address")))
                    this.address_obj=JSON.parse(window.localStorage.getItem("address"))[JSON.parse(window.localStorage.getItem("address")).length-1]
                }else{
                    this.ads=true
                }
            }


            if(this.address_obj.length==0){
                ale.popup({
                    content:"您还没有添加地址，是否去添加？",
                    judge:["添加","取消"],
                    callback:(s)=>{
                        if(s){
                            this.$router.push("/address")
                        }
                    }
                })
            }

            this.price=0
            this.pay_data=this.$store.state.pay_list
            this.pay_data.forEach((v,i)=>{
                this.price+=v.status*v.discount_price
            })
        },
        methods:{
            back(){
              this.$router.go(-1)
            },
            skip(){
              this.$router.push("/address")
            },
            change_num(id,state){
                this.price=0
                if(state){
                    this.pay_data.forEach((v,i)=>{
                       if(v.goods_id==id){
                           v.status+=1
                       }
                       this.price+=(v.discount_price*v.status+v.follow_num*1)
                    })
                }else{
                    this.pay_data.forEach((v,i)=>{
                        if(v.goods_id==id){
                            v.status-=1
                            if(v.status<1){
                                v.status=1
                            }
                        }
                        this.price+=(v.discount_price*v.status+v.follow_num*1)
                    })
                }
            }
        },
        filters:{
            decimals(v){
                return (v*1).toFixed(2)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .wrap{
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        font-size:.3rem;
        color:#666;
        margin-bottom: 1.2rem;
    .header{
        height:1rem;
        background:#fff;
        line-height:1rem;
        border-bottom:1px solid #ccc;
        display:flex;
    .first{
        text-align: left;
        padding-left:.2rem;
    }
    p{
        flex:1;
        text-align: center;
    }
    }
    .address{
        width:100%;
        display:flex;
        justify-content:space-between;
        height:2rem;
        background:#fff;
        padding:0 .2rem;
        align-items:center;
        font-size:.28rem;
    .p{
            width:80%;
        height:100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span{
            display: flex;
            width:100%;
            height:50%;
            justify-content: center;
            align-items: center;
            color:#000;
            font-size: .32rem;
        }
    }
    img{
        width: .24rem;
        height: .3rem;
        margin-right:.2rem;
    }

    }
    .imgs{

    img{
        width:100%;
        height:.2rem;
    }
    }
    }


    .paywrap{
        width:100%;
        margin-top:.2rem;
    ul{
        width:100%;
        background:#fff;

    li{
        display:flex;
        justify-content:space-between;
        border-bottom:1px solid #ccc;
        height:1.16rem;
        padding-left:.2rem;

    .p2{
        display:flex;
        align-items:center;
    span{
        line-height:1.16rem;
    }
    img{
        width:.8rem;
        height:.8rem;
        margin-right:.2rem;

    }
    }
    .circle{
        width: .48rem;
        height: .48rem;
        border-radius: 50%;
        border: 1px solid #ccc;
        margin-right:.2rem;
        margin-top:.2rem;
        display:inline-block;
    }
    }
    }
    .p1{
        height:1rem;
        background: #fff;
        border-bottom: 1px solid #ccc;
        line-height:1rem;
        text-indent: .2rem;
        font-size:.28rem;
        display:flex;
        justify-content:space-between;
    .btnImg{
    input{
        display:none;
    }
    label{
        webkit-transition: all 1s;
        width: 1.26rem;
        height: 0.76rem;
        display: inline-block;
        border-radius: 6rem;
        background-position: -0.5rem 0px;
        background:url(../images/payImg/btn.png)no-repeat;
        background-size: 1.76rem 0.75rem;
    }


    }
    }
    }
    .active{
        background-position: 30px;
    }

    .footer{
        width: 100%;
        background: #fff;
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 9999;
    ul{
        display:flex;
        justify-content:space-between;
        align-items:center;
    li:nth-child(2){
        line-height:1.2rem;
    .deposit{
        color:#fc4d4d ;
        font-weight:bold;
    }
    }
    li:nth-child(3){
        width:26%;
    }
    .post{
        line-height:1.2rem;
        outline: none;
        border:0;
        background:#fc4d4d ;
        color:#fff;
        font-weight:bold;
        width:100%;

    }
    li:first-child{
        text-align:center;
        padding-left:.2rem;
    .sum{
        color:#fc4d4d;
        font-weight:bold;
    }
    .trans{
        font-size:.26rem;
    }
    }
    }
    }




    .container{
        padding: .2rem;
        width: 100%;
        margin-top:.2rem;
        background: #fff;
    }
    .container .title{
        display: flex;
        width: 100%;
    }
    .title img{
        margin-top: .2rem;
        width:20px;
        height: 22px;
    }
    .title span{
        flex: 1;
        font-size:.26rem;
        text-indent: .2rem;
        line-height: .9rem;
    }
    .container>dl{
        width: 100%;
        display: flex;
    }
    .container>dl>dt{
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
    }
    .container>dl>dt img{
        width: 100%;
        display: block;
    }
    .container>dl>dd{
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        flex:1;
        font-size:.26rem;
        margin-left: 10px;
        position: relative;
    }

    .container>dl>dd>.jiage{
        width: 100%;
        display: flex;
        position: absolute;
        bottom:0;
        left: 0;
    }

    .jiage div:first-child{

        flex:1;
    }
    .jiage div:first-child>p:first-child{
        color: #fc4141;
    }
    .jiage div:last-child{
        text-align: center;
        width: 100px;
        display: flex;
    }
    .foot{
        margin-top: 10px;
        width: 100%;
    }
    .foot p{
        display: flex;
        width: 100%;
    }
    .foot p span{
        flex:1;
        margin-right: 10px;
    }
    .foot p:last-child span:last-child{
        font-size:.26rem;
        color:#fc4141;
    }
    .foot p>span:first-child{
        color:#666666;
        line-height:20px;
    }
    .foot p>span:last-child{
        text-align: right;
    }
    .jiage div:last-child>span{
        flex:1;
        display:inline-block;
        border: 1px solid #ccc;
        tetx-align:center;
        line-height:25px;
    }
    .jiage div:last-child>pan:last-child{
        border-left: 1px solid  #ccc;
    }
    .jiage div:last-child>span:first-child{
        border-right: 1px solid  #ccc;
    }
</style>