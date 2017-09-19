<template>
  <div id="app">
    <!--Nav bar-->
    <md-toolbar class="sticky-header">
      <md-button @click.native="$router.push('/products')" class=" md-dense">Products</md-button>
      <md-button @click.native="$router.push('/admin/products')" class=" md-dense" v-if="isAdmin">Admin</md-button>
      <h3 v-if="username">Hi, {{username}}</h3>
      <span style="flex: 1;"></span>
      <md-button @click.native="toggleBasketNav"><md-icon>shopping_cart</md-icon><strong>({{getBasketLength}})</strong></md-button>
      <md-button @click="toggleLoginNav" class=" md-dense">Account</md-button>
    </md-toolbar>
    <!-- Tabs content -->

    <!-- basket tab -->
    <md-sidenav class="md-left" ref="basketNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Basket</h3>
        </div>
      </md-toolbar>

      <p v-if="basket.length == 0">No item in cart</p>
      <md-list>
        <md-list-item disabled v-for="product in basket" :key="product.id">
          {{product.title}} - £{{product.price}} <div style="float: right">x{{product.count}}</div>
          <md-button class="button__spacing" href="javascript:void(0)" v-on:click="$store.dispatch('removeFromBasket', product); $store.dispatch('addTotalPrice')"><md-icon>remove_shopping_cart</md-icon></md-button>
        </md-list-item>
      </md-list>
      <p v-if="total"><strong>Total: £{{total}} </strong></p><md-button @click="$router.push('/checkout'); toggleBasketNav()" v-if="total != 0">Check Out</md-button>
    </md-sidenav>

    <!-- Account management tab -->
    <md-sidenav class="md-left" ref="loginNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Account</h3>

        </div>
      </md-toolbar>
      <AccountComponent class="no-border-form-generator"></AccountComponent>
    </md-sidenav>
    <router-view>
    </router-view>


  </div>
</template>

<style>
  .sticky-header {
    min-height: unset !important;
  }

  .button__spacing {
    min-width: unset!important;
  }
</style>

<script>
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import VueMaterial from 'vue-material'

  import ProductService from './components/Product/ProductComponent'
  import AccountComponent from './components/Account/AccountComponent'
  import Signup from './components/Account/Signup'
  import Auth from './services/Auth'

  Vue.use(VueMaterial)

  export default {
    name: 'app',
    components: {
      ProductService,
      AccountComponent,
      Signup
    },
    data () {
      return {
      }
    },
    created () {
      if (localStorage.getItem('token')) {
        const adminStatus = (Auth.getIsAdmin() === 'true')
        this.$store.dispatch('setUsername', Auth.getUsername())
        this.$store.dispatch('setIsAdmin', adminStatus)
      }
    },
    methods: {
      toggleLoginNav () {
        this.$refs.loginNav.toggle()
        this.$refs.basketNav.close()
      },
      toggleBasketNav () {
        this.$refs.basketNav.toggle()
        this.$refs.loginNav.close()
      }
    },
    computed: {
      ...mapGetters({
        basket: 'basketState',
        total: 'totalState',
        isAdmin: 'isAdminState',
        username: 'usernameState'
      }),
      getBasketLength () {
        let basket = this.basket
        let total = 0

        basket.forEach((item) => {
          total += item.count
        })

        return total
      }
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

  .no-border-form-generator fieldset{
    border: none;
    z-index: 999;
  }

  .md-menu-content {
    width: 120%;
  }

  /*.sticky-header {*/
    /*position:fixed;*/
    /*width: 100%;*/
    /*z-index: 9;*/
  /*}*/
</style>
