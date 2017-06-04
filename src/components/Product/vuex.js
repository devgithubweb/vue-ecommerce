/**
 * Created by Ibrahim on 21/05/2017.
 */
export const vuex = {
  state: {
    total: null,
    products: [],
    basket: []
  },

  mutations: {

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
    }
  },

  getters: {
    basketState: (state) => {
      return state.basket
    },
    totalState (state) {
      return state.total
    }
  },

  actions: {
    setIsAdmin ({commit}, bool) {
      commit('SET_IS_ADMIN', bool)
    },

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

}
