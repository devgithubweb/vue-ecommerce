<template>
  <div class="signin-div">
    {{ msg }}
    <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>

    {{model}}
  </div>
</template>

<script>
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import Vue from 'vue'

  Vue.use(VueFormGenerator)

  export default {
    name: 'SignIn',
    data () {
      return {
        msg: 'test',
        model: {
          username: '',
          password: '',
          emailAddress: ''
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
              model: 'password',
              min: 12,
              required: true,
              hint: 'Minimum 12 characters',
              validator: VueFormGenerator.validators.string
            },
            {
              type: 'input',
              label: 'Email Address',
              model: 'emailAddress',
              placeholder: 'example@email.com'
            }
          ]
        },
        formOptions: {
          validateAfterLoad: true,
          validateAfterChanged: true
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
