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
      is_admin: false,
      signupModel: null,
      total: 0,
      showRegister: false
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

      ADD_TO_BASKET: (state, product) => {
        if (state.basket.indexOf(product) !== -1) {
          state.basket.splice(state.basket.indexOf(product), 1)
          product['count'] += 1
          state.basket.push(product)
        } else {
          product['count'] += 1
          state.basket.push(product)
        }
      },

      REMOVE_FROM_BASKET (state, product) {
        state.basket.pop(product)
      },

      ADD_TOTAL_PRICE (state) {
        state.total = 0
        for (let i = 0; i < state.basket.length; i++) {
          state.total += (state.basket[i]['price'] * state.basket[i]['count'])
        }
        state.total = parseFloat(state.total).toFixed(2)
      },

      SET_IS_ADMIN (state, bool) {
        state.is_admin = bool
      },

      SET_SIGN_UP (state, obj) {
        state.signupModel = obj
      },

      SET_SHOW_REGISTER (state, bool) {
        state.showRegister = bool
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
      basketState: (state) => {
        return state.basket
      },
      totalState (state) {
        return state.total
      },
      isAdminState (state) {
        return state.is_admin
      },
      signUpState (state) {
        return state.signupModel
      },
      showRegisterState (state) {
        return state.showRegister
      }
    },
    actions: {
      /*
      Account management setting token, username and admin
       */
      setToken ({commit}, token) {
        commit('SET_TOKEN', token)
      },

      setUsername ({commit}, username) {
        commit('SET_USERNAME', username)
      },

      setIsAdmin ({commit}, bool) {
        commit('SET_IS_ADMIN', bool)
      },
      /*
      Product management, setting products
       */
      setProducts ({commit}, products) {
        commit('SET_PRODUCTS', products)
      },

      setSignUp ({commit}, obj) {
        commit('SET_SIGN_UP', obj)
      },

      setShowRegister ({commit}, bool) {
        commit('SET_SHOW_REGISTER', bool)
      },
      /*
      Basket management for adding and removing product in basket
       */
      addToBasket: ({commit}, product) => {
        commit('ADD_TO_BASKET', product)
      },

      removeFromBasket ({commit}, product) {
        commit('REMOVE_FROM_BASKET', product)
      },

      addTotalPrice ({commit}) {
        commit('ADD_TOTAL_PRICE', commit)
      }
    }
  })
</script>
