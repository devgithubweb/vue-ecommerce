<script>
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  export const store = new Vuex.Store({
    state: {
      token: null,
      username: null,
      products: [],
      basket: [],
      is_admin: false
    },
    mutations: {
      SET_TOKEN (state, newToken) {
        state.token = newToken
      },

      SET_USERNAME (state, newUsername) {
        state.username = newUsername
      },

      SET_PRODUCTS (state, products) {
        state.products = products
      },

      ADD_TO_BASKET (state, product) {
        state.basket.push(product)
      },

      REMOVE_FROM_BASKET (state, product) {
        state.basket.pop(product)
      },

      SET_IS_ADMIN (state, bool) {
        state.is_admin = bool
      }
    },
    getters: {
      tokenState (state) {
        return state.token
      },
      usernameState (state) {
        return state.username
      },
      productState (state) {
        return state.products
      },
      basketState (state) {
        return state.basket
      },
      isAdminState (state) {
        return state.is_admin
      }
    },
    actions: {
      setToken ({commit}, token) {
        commit('SET_TOKEN', token)
      },

      setUsername ({commit}, username) {
        commit('SET_USERNAME', username)
      },

      setProducts ({commit}, products) {
        commit('SET_PRODUCTS', products)
      },

      addToBasket ({commit}, product) {
        commit('ADD_TO_BASKET', product)
      },

      removeFromBasket ({commit}, product) {
        commit('REMOVE_FROM_BASKET', product)
      },

      setIsAdmin ({commit}, bool) {
        commit('SET_IS_ADMIN', bool)
      }
    }
  })
</script>
