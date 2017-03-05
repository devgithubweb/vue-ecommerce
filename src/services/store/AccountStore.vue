<script>
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  export const store = new Vuex.Store({
    state: {
      token: null,
      username: null
    },
    mutations: {
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
      }
    },
    actions: {
      setToken ({commit}, token) {
        commit('SET_TOKEN', token)
      },

      setUsername ({commit}, username) {
        commit('SET_USERNAME', username)
      }
    }
  })
</script>
