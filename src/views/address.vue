<template>
	<div id="shipping_address">
        <header>
            <p @click="back"><</p>
            <p>收货地址</p>
            <p><img src="../images/index.png" alt=""></p>
        </header>
        <section>     
            <div class="con" v-for="(i,ind) in address_data">
				<div class="top">
					<h4>{{i.name}}<span>{{i.tel}}</span></h4>
					<p><span>{{i.address}}</span></p>
				</div>
				<div class="bot">
					<p class="p1"><span class="circle" :class="{bg:ind==index}"></span>设为默认</p>
					<p></p>
					<p class="p3">
						<img src="../img/edit.png" alt="">
						<span @click="edit(ind)">编辑</span>
						<img src="../img/rem.png" alt="">
						<span @click="del(ind)">删除</span>
					</p>
				</div>	
			</div>
           
            <div class="add">
                <p @click="add_address">
                  <img src="../img/add.png" alt="">新增加地址
                </p>
            </div>
        </section>
        
    </div>
</template>

<script>
    export default{
        name:"address",
        data(){
            return{
                address_data:[],
                empty:false,
                index:-1
            }
        },
        mounted(){
            if(window.localStorage.getItem("address")){
                this.address_data=JSON.parse(window.localStorage.getItem("address"))
                this.empty=true
            }else{
                this.empty=false
            }
            if(window.localStorage.getItem("index")){
                this.index=window.localStorage.getItem("index")
            }
            console.log(this.index)
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            add_address(){
                this.$router.push("/addUse")
            }
        }
    }
</script>
<style lang="scss" scoped>
.bg{
    background: red;
}
    *{
        box-sizing: border-box;
    }
	#shipping_address {
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        display: flex;
        flex-direction: column;
    }
    header{
        width: 100%;
        background:#fff;
        height : 48px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        position: fixed;
        top:0;left:0;
        p{
            font-size: 14px;
            &:first-child{
                width: 25px;
            }
            margin: 0 10px;
            img{width: 25px;}
        }
    }
    section{    
       flex:1;
       overflow: auto;
       margin-top: 48px;
       margin-bottom: 49px;
       .con{
				background:#fff;
                margin-bottom: .2rem;
				.bot{
					display:flex;				
					align-items:center;
					padding:.3rem .2rem;
					color:#666;
					.p3,.p1{
						display:flex;
						align-items:center;
					}
					.p3{
						flex:1.2;
						img{
                            width:.35rem;
                            height:.35rem;
							margin-left:.3rem;
						}
						span{
							margin-left:.1rem;
						}
					}
					p{
						flex:1;
					}

				}
				.top{
					border-bottom:1px solid #D1D1D1;
					padding:.3rem .2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
					p{
						color:#666;
						font-size:.28rem;
						margin-top:.4rem;
						span{
							margin-right: .2rem;
						}
					}
					h4{
						font-size:.36rem;
						span{
							font-size:.3rem;
							color:#666;
							margin-left:.3rem;							
						}
					}
				}
		}
		.circle{
			width: .43rem;
		    height: .43rem;
		    border-radius: 50%;
		    border: 1px solid #ccc; 
		    display: inline-block;
		    margin-right:.2rem;
		}

        .add{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            margin-bottom: 45px;
            p{   
                background: #fc4141;
                width: 180px;
                height: 42px;
                display:flex;
                justify-content: center;
                align-items: center;
                border-radius: 30px;
                color: #fff;
                font-size: 14px;
                img{
                    width: 15px;
                    margin-right: 10px;
                }
            }
        }
    }
    
</style>
