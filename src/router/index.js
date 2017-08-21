import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home.vue'
import Classify from '../views/classify.vue'
import My from '../views/my.vue'
import Shop from '../views/shop.vue'
import seach from '../views/search.vue'
import ranking from '../views/ranking.vue'
import details from '../views/details.vue'
import pay from '../views/pay.vue'
import address from '../views/address.vue'
import tab from '../views/tab.vue'
import addUse from '../views/addUse.vue'


Vue.use(Router)


export default new Router({
    routes: [
        {
            path: '/Home',
            name: 'Home',
            component: Home
        },
        {
            path:"/",
            redirect:"/Home"
        },
        {
            path: '/Classify',
            name: 'Classify',
            component: Classify
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/tab/:name',
            name: 'tab',
            component: tab
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay
        },
        {
            path: '/addUse',
            name: 'addUse',
            component: addUse
        },
        {
            path: '/My',
            name: 'My',
            component: My
        },
        {
            path: '/Shop',
            name: 'Shop',
            component:Shop
        },
        {
            path: '/seach',
            name: 'seach',
            component: seach
        },
        {
            path: '/ranking/:name',
            name: 'ranking',
            component:ranking
        },
        {
            path: '/details/:id',
            name: 'details',
            component:details
        }
    ]
})