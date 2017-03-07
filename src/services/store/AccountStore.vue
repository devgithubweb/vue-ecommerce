<script>
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  export const accountStore = new Vuex.Store({
    state: {
      token: null,
      username: null,
      signupModel: {
        username: '',
        password1: '',
        password2: '',
        email: ''
      }
    },
    mutations: {
      SET_TOKEN (state, newToken) {
        state.token = newToken
      },

      SET_USERNAME (state, newUsername) {
        state.username = newUsername
      },

      SET_SIGNUP (state, username, password1, password2, email) {
        state.signupModel.username = username
        state.signupModel.password1 = password1
        state.signupModel.password2 = password2
        state.signupModel.email = email
      }
    },
    getters: {
      tokenState (state) {
        return state.token
      },
      usernameState (state) {
        return state.username
      },
      signupModelState (state) {
        return state.signupModel
      }
    },
    actions: {
      setToken ({commit}, token) {
        commit('SET_TOKEN', token)
      },

      setUsername ({commit}, username) {
        commit('SET_USERNAME', username)
      },

      setSignup ({commit}, username, password1, password2, email) {
        commit('SET_SIGNUP', username, password1, password2, email)
      }
    }
  })
</script>
