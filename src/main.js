import Vue from 'vue'
import App from './App.vue'
import index from './router/index.js'
import axios from 'axios'
import store from './store/store.js'

Vue.prototype.$http=axios
new Vue({
  el: '#app',
    data:{
      home_arr:[],
        classify_arr:[]
    },
    router:index,
    store,
  render: h => h(App),
    created(){
        this.$http.get("src/static/json/data.json").then((data)=>{
            this.home_arr.push(data.data.data.data)
            this.$store.dispatch("ajax_1",this.home_arr)
        })
        this.$http.get("src/static/json/paging.json").then((data)=>{

            this.classify_arr.push(data.data.data)
            this.$store.dispatch("classify_1",this.classify_arr)
        })
    }
})
