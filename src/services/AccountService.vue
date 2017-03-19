<template>
  <div>

    <div v-if="!username && !token && !showRegister">
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
      <md-button @click.native="login(); showRegister=false">Login</md-button>
      <md-button @click.native="$store.dispatch('setShowRegister', true)">Sign Up</md-button>
    </div>

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
  import Signup from '../components/Signup'
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  Vue.use(VueFormGenerator)

  export default {
    components: {
      Signup
    },
    data () {
      return {
        name: 'Login',
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
        login: () => {
          let data = {
            username: this.model.usernameModel,
            password: this.model.passwordModel
          }
          axios.post('http://127.0.0.1:8000/rest-auth/login/', data).then(response => {
            if (response['data']['key']) {
              this.$store.dispatch('setToken', 'Token ' + response['data']['key'])
              this.$store.dispatch('setUsername', this.model.usernameModel)
              axios.create({
                headers: {
                  Authorization: this.token
                }
              })
            }
          }).catch(error => {
            console.log(error)
          }).then(response => {
            this.validateUser()
          })
        },
        logout: () => {
          this.$store.dispatch('setUsername', null)
          this.$store.dispatch('setToken', null)
        },
        validateUser: () => {
          // let data = {
          //   username: this.model.usernameModel,
          //   password: this.model.passwordModel
          // }
          axios.get('http://127.0.0.1:8000/api/admin-user/' + this.model.usernameModel + '/', {headers: {Authorization: this.token}}).then(response => {
            if (response.data[0]['is_staff']) {
              console.log('true is staff')
              this.$store.dispatch('setIsAdmin', true)
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        token: 'tokenState',
        username: 'usernameState',
        showRegister: 'showRegisterState'
      })
    }
  }
</script>
