<template>
  <div>

    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>

    <button v-on:click="login()">Login</button>
    <button v-on:click="logout()">Logout</button>

    <button v-on:click="register()">Register</button>
    <br>
    {{token}} -- {{username}}
  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import axios from 'axios'

  Vue.use(VueFormGenerator)

  export default {
    data () {
      return {
        name: 'Login',
        model: {
          usernameModel: '',
          passwordModel: ''
        },
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
          })
        },
        logout: () => {
          this.$store.dispatch('setUsername', null)
          this.$store.dispatch('setToken', null)
        },
        register: () => {
          let data = {
            username: 'testuserfromapi2',
            email: 'qwewqe@gmail.com',
            password1: 'ibrahim123',
            password2: 'ibrahim123'
          }
          axios.post('http://127.0.0.1:8000/rest-auth/registration/', data).then(response => {
            console.log(response)
            if (response['data']['key']) {
              console.log(response['data']['key'])
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
        username: 'usernameState'
      })
    }
  }
</script>
