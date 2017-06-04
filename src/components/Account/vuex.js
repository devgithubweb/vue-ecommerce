/**
 * Created by Ibrahim on 21/05/2017.
 */
export const vuex = {
  state: {
    showRegister: false,
    token: null,
    username: null
  },

  mutations: {
    SET_SHOW_REGISTER (state, bool) {
      state.showRegister = bool
    },
    SET_TOKEN (state, newToken) {
      state.token = newToken
    },
    SET_USERNAME (state, newUsername) {
      state.username = newUsername
    }
  },

  getters: {
    tokenState (state) {
      return state.token
    },
    usernameState (state) {
      return state.username
    },
    showRegisterState (state) {
      return state.showRegister
    }
  },

  actions: {
    setShowRegister ({commit}, bool) {
      commit('SET_SHOW_REGISTER', bool)
    },
    setToken ({commit}, token) {
      commit('SET_TOKEN', token)
    },
    setUsername ({commit}, username) {
      commit('SET_USERNAME', username)
    }
  }
}
