import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        add_shop: [],
        shop_list: [],
        total_price: 0,
        classify_shop: [],
        pay_list: [],
        address: [],
        address_default: -1
    },
    mutations: {
        add_address(state, object) {
            if (JSON.parse(window.localStorage.getItem("address"))) {
                state.address = JSON.parse(window.localStorage.getItem("address"))
            }
            if (window.localStorage.getItem("index")) {
                state.address_default = window.localStorage.getItem("index")
            }

            if (object[1]) {
                state.address.push(object[0])
                state.address_default = state.address.length - 1
            } else {
                state.address.push(object[0])
            }
            window.localStorage.setItem("address", JSON.stringify(state.address))
            window.localStorage.setItem("index", state.address_default)
        },
        pay(state, data) {
            state.pay_list = data
        },
        remove_shop(state, brr) {
            for (var j = 0; j < brr.length; j++) {
                state.add_shop.forEach((v, i) => {

                    if (v.goods_id == brr[j]) {
                        state.add_shop.splice(i, 1)
                    }

                })
            }
            window.localStorage.setItem("local_shop", JSON.stringify(state.add_shop))
        },
        calculate(state, price) {
            state.total_price = price
        },
        ajax(state, data) {
            if (state.shop_list.length == 0) {
                state.shop_list = data
            } else {
                state.shop_list.push(data)
            }

        },
        classify(state, data) {
            state.classify_shop = data
        },
        add_shop(state, shop) {
            if (state.add_shop.length == 0) {
                state.add_shop.push(shop)
            } else {
                var flag = false
                state.add_shop.forEach((v, i) => {
                    if (v.goods_id == shop.goods_id) {
                        flag = true
                    }
                })
                if (!flag) {
                    state.add_shop.push(shop)
                }
            }
            window.localStorage.setItem("local_shop", JSON.stringify(state.add_shop))
        },
        local_data(state, brr) {
            state.add_shop = brr
        }
    },
    actions: {
        ajax_1(context, data) {
            context.commit("ajax", data)
        },
        classify_1(context, data) {
            context.commit("classify", data)
        },
        add_shop_1(context, shop) {
            context.commit("add_shop", shop)
        },
    }
})