<template>
  <div id="app">
      <router-view></router-view>
    <footer>
      <ul>
        <li>
          <div>
            <router-link to="/Home">
              <img src="./img/t5.png" alt="">
              首页
            </router-link>
          </div>
        </li>
        
        <li>
          <div>
            <router-link to="/Classify">
              <img src="./img/t3.png" alt="">
              分类
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/Home">
              <img src="./img/inter.png" alt="" class="inter">
            </router-link>
          </div>
        </li>
        <li>
          <div>
            <router-link to="/Shop">
              <img src="./img/t7.png" alt="">
              购物车
            </router-link>
          </div>
           <span class="num">{{nam}}</span>
        </li>
        <li>
          <div>
            <router-link to="/My">
              <img src="./img/t2.png" alt="">
              我的
            </router-link>
          </div>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
    computed:{
      nam(){
          return this.$store.state.add_shop.length
      }
    }
}
</script>

<style lang="scss" scoped>
#app {
 width:100%;
  height:100%;
  font-size: .28rem;
}
footer{
  width: 100%;
  height: 1rem;
  position:fixed;
  bottom:0;
  background: #fff;
}
footer ul{
  margin-top: .1rem;
  width: 100%;
  height: 100%;
  display: flex;
}
footer ul li{
  height: 100%;
  flex:1;
  position: relative;
}
footer ul li a{
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  font-size:.28rem;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
footer ul li .num{
  width:.4rem;
  height:.4rem;
  text-align: center;
  background: red;
  color: #fff;
  line-height:.4rem;
  font-size:.2rem;
  top:0;
  right:0;
  border-radius: 100%;
  position: absolute;
}
footer ul li:not(:nth-child(3)) img{
  width: .39rem;
  height: .39rem;
  margin-bottom: 2px;
}
.inter{
  width: .9rem;
  height: .9rem;
  margin-top: -2px;
  margin-left: .3rem;
}
</style>
