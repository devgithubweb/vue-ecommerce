<script>
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  export const producstore = new Vuex.Store({
    state: {
//      products: null

    },
    mutations: {
      SET_PRODUCTS (state, products) {
        state.products = products
      }

    },
    getters: {
      productState (state) {
        return state.products
      }

    },
    actions: {
      setProducts ({commit}, products) {
        commit('SET_PRODUCTS', products)
      }

    }
  })
</script>
