<template>
    <div class="wrap">
        <header class="header">
            <span @click="back"><</span>
            <span class="s2">收货人</span>
            <span><img src="../images/index.png" alt=""></span>
        </header>
        <div class="main">
            <p><input type="text" placeholder="收货人姓名" v-model="userName"></p>
            <p><input type="tel" placeholder="手机号" v-model="telphone"></p>
            <div class="choosecity">
                <select name="" id="sel1" v-model.lazy="province_num">
                    <option value="">请选择省</option>
                    <option v-for="i in province_arr" :value="i.item_code">{{i.item_name}}</option>
                </select>
                <select name="" id="sel2" v-model.lazy="city_num">
                    <option value="" selected="selected">请选择市</option>
                    <option v-for="(j,index) in city_arr" :value="j.item_code">{{j.item_name}}</option>
                </select>
            </div>
            <p style="margin-top:.8rem" class="qu">
                <select name="" id="sel3" v-model.lazy="county_num">
                    <option value="">请 选择区、县</option>
                    <option v-for="z in county_arr" :value="z.item_code">{{z.item_name}}</option>
                </select>
            </p>
            <p><input type="text" placeholder="详细地址" v-model="address"></p>
            <div class="tip"><span :class="{bg:yeah}" @click="yeahs"></span>设为默认地址</div>
            <button class="save" @click="save">保存</button>
        </div>
    </div>
</template>
<script>
    export default{
        name:"addUse",
        data(){
            return {
                china_arr:[],
                province_arr:[],
                city_arr:[],
                county_arr:[],
                city_num:"",
                county_num:"",
                province_num:"",
                userName:"",
                telphone:"",
                address:"",
                yeah:false
            }
        },
        created(){
            this.$http.get("src/static/json/city.json").then((data)=>{
                this.china_arr=data.data
                this.china_arr.forEach((v,i)=>{
                    if(v.item_code.substring(2)=="0000"){
                        this.province_arr.push(v)
                    }
                })
            })
        },
        watch:{
            province_num(a){
                this.county_arr=[]
                var arr=[]
                this.china_arr.forEach((v,i)=>{
                    if(v.item_code.substr(0,2)==a.substr(0,2) && v.item_code.substr(4)=="00" && v.item_code.substr(2,2)!="00"){
                        arr.push(v)
                    }
                })
                this.city_arr=arr
            },
            city_num(b){
                if(b==undefined) return
                if(b!="请选择" && b!="undefined"){
                    var brr=[]
                    this.china_arr.forEach((v,i)=>{
                        if(v.item_code.substr(0,4)==b.substr(0,4) && v.item_code.substr(4,2)!="00"){
                            brr.push(v)
                        }
                    })
                    this.county_arr=brr
                }
//                this.county_arr=[]

            }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            save(){
                var obj={}
                obj.name=this.userName
                obj.tel=this.telphone
                obj.address=""
                this.china_arr.forEach((v,i)=>{
                    if(v.item_code==this.city_num || v.item_code==this.county_num || v.item_code==this.province_num){
                        obj.address+=v.item_name+" "
                    }
                })
                obj.address+=this.address
                // if(this.yeah){
                //     window.localStorage.setItem("address",JSON.stringify(obj))
                // }else{
                //     this.$store.commit("add_address",obj)
                // }
                    if(this.yeah){
                       this.$store.commit("add_address",[obj,true])
                    }else{
                        this.$store.commit("add_address",[obj,false])
                    }
                // this.$store.commit("add_address",obj)
                console.log(window.localStorage.getItem("address"))
                this.$router.push("/pay")
            },
            yeahs(){
                this.yeah=!this.yeah
            }
        }
    }
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
        .main{
            width:100%;
            -webkit-flex:1;
            padding:0 .3rem;
            .choosecity{
                height:1rem;

                select{
                    width:46%;
                    height:100%;
                    text-indent: .3rem;
                }
                #sel2{
                    margin-left:3%;
                }
            }
            p{
                width:100%;
                height:1rem;
                background:#fff;
                margin:.3rem 0 .3rem 0;
                position: relative;
            }
            input{
                outline: none;
                border:0;
                font-size:.3rem;
                background: none;
                position:absolute;
                left:.2rem;
                width:100%;
                height:100%;
            }
            select{
                outline: none;
                border:0;
                font-size:.3rem;
                width:100%;
                height:100%;
                /*background:none;*/

            }

        }
    }
.qu{
    #sel3{
        width:82%;
        padding: 0 .8rem;
    }

}

    .tip{
        font-size:.3rem;
        color:#B3B5B0;
        margin-top:.6rem;
        span{
            width: .48rem;
            height: .48rem;
            border-radius: 50%;
            border: 1px solid #ccc;
            display: inline-block;
            margin-right:.2rem;
        }
        .bg{
            background: red;
        }
    }

    .save{
        width:60%;
        height:1rem;
        background:#FB4240;
        color:#fff;
        border-radius: 30px;
        border:0;
        outline: none;
        margin:.3rem 20%;
    }
</style>