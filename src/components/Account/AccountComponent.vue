<template>
  <div>

    <div v-if="!username && !token && !showRegister">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions" @keyup.native.enter="login()"></vue-form-generator>
      <md-button @click.native="login()">Login</md-button>
      <md-button @click.native="$store.dispatch('setShowRegister', true)">Sign Up</md-button>
    </div>
    <div v-if="error">{{error}}</div>

    <div v-if="username && token">
      <md-button @click.native="logout()">Logout</md-button>
    </div>

    <div v-if="showRegister">
      <Signup></Signup>
    </div>

  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import Vue from 'vue'
  import Signup from './Signup'
  import {mapGetters} from 'vuex'
  import Service from '../../services/AccountService'
  import Auth from '../../services/Auth'

  Vue.use(VueFormGenerator)

  export default {
    components: {
      Signup
    },
    data () {
      return {
        name: 'Login',
        error: '',
        username: '',
        token: '',
        model: {
          usernameModel: '',
          passwordModel: ''
        },
        products: [],
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              label: 'Username',
              model: 'usernameModel',
              required: true
            },
            {
              type: 'input',
              inputType: 'password',
              label: 'Password',
              model: 'passwordModel',
              required: true,
              validator: VueFormGenerator.validators.string
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },
        /**
         * Based on the form values, logs in and sets the store for user information
         * @return {null}
         */
        login: () => {
          Service.login(this.model.usernameModel, this.model.passwordModel).then(response => {
            console.log(response)
            if (response['data']['token']) {
              this.error = ''
              localStorage.setItem('token', `JWT ${response['data']['token']}`)
              localStorage.setItem('username', this.model.usernameModel)
              localStorage.setItem('is_admin', response['data']['is_staff'])
              this.$store.dispatch('setIsAdmin', response['data']['is_staff'])

              this.username = Auth.getUsername()
              this.isAdmin = Auth.getIsAdmin()
              this.token = Auth.getToken()
            }
          }).catch(error => {
            if (error) {
              this.error = 'Incorrect username or password'
            }
          })
        },
        /**
         * Logs out and mutates stores of user info to be null
         * @return {null}
         */
        logout: () => {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.username = Auth.getUsername()
          this.token = Auth.getToken()
          this.$store.dispatch('setIsAdmin', false)
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        if (localStorage.getItem('token')) {
          this.username = Auth.getUsername()
          this.isAdmin = Auth.getIsAdmin()
          this.token = Auth.getToken()
        }
      })
    },
    computed: {
      ...mapGetters({
        showRegister: 'showRegisterState'
      })
    }
  }
</script>
