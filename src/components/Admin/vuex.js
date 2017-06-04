/**
 * Created by Ibrahim on 21/05/2017.
 */
export const vuex = {
  state: {
    isAdmin: null
  },

  mutations: {
    SET_IS_ADMIN (state, bool) {
      state.isAdmin = bool
    }
  },

  getters: {
    isAdminState (state) {
      return state.isAdmin
    }
  },

  actions: {
    setIsAdmin ({commit}, bool) {
      commit('SET_IS_ADMIN', bool)
    }
  }

}
