<template>
  <div class="signup-div">
    <h5>Sign Up</h5>
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>

    <md-button @click.native="register()">Register</md-button><md-button @click.native="$store.dispatch('setShowRegister', false)">Cancel</md-button>

  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import Vue from 'vue'
  import axios from 'axios'

  Vue.use(VueFormGenerator)

  export default {
    name: 'Signup',
    data () {
      return {
        msg: 'test',
        model: {
          username: '',
          password1: '',
          password2: '',
          email: ''
        },
        schema: {
          fields: [
            {
              type: 'input',
              inputType: 'text',
              label: 'Username',
              model: 'username',
              required: true
            },
            {
              type: 'input',
              inputType: 'password',
              model: 'password1',
              min: 6,
              required: true,
              hint: 'Minimum 12 characters',
              validator: VueFormGenerator.validators.string
            },
            {
              type: 'input',
              inputType: 'password',
              model: 'password2',
              min: 6,
              required: true,
              hint: 'Must be the same password',
              validator: VueFormGenerator.validators.string
            },
            {
              type: 'input',
              label: 'Email Address',
              model: 'email',
              placeholder: 'example@email.com'
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        },
        register: () => {
          let data = {
            username: this.model.username,
            email: this.model.email,
            password1: this.model.password1,
            password2: this.model.password2
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
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
