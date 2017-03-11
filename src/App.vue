<template>
  <div id="app">
    <md-toolbar>
      <md-button @click.native="$router.push('/products')" class=" md-dense">Products
      </md-button>

      <md-input-container md-inline style="flex: 1 1">
        <label>Search</label>
        <md-input></md-input>
      </md-input-container>

      <h1 class="md-title" style="flex: 1">Example Title</h1>

      <md-button @click.native="$router.push('/login')" class=" md-dense">Login</md-button>
      <md-button @click.native="$router.push('/sign-up')" class=" md-dense">Sign Up
      </md-button>

    </md-toolbar>

    <router-view>
    </router-view>
  </div>
</template>

<script>
  import ProductService from './services/ProductService'
  import Vue from 'vue'
  import VueMaterial from 'vue-material'

  Vue.use(VueMaterial)

  export default {
    name: 'app',
    components: {
      ProductService
    }
  }
</script>

<style>
  @import "../node_modules/vue-material/dist/vue-material.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
