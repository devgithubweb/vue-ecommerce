<template>
  <div id="app">
    <md-toolbar class="sticky-header">
      <md-button @click.native="$router.push('/products')" class=" md-dense">Products</md-button>
      <md-button @click.native="$router.push('/admin/products')" class=" md-dense" v-if="isAdmin">Admin</md-button>
      <h1 class="md-title" style="flex: 10">Example Title</h1>
      <h3 v-if="username">Hi, {{username}}</h3>


        <md-button @click.native="toggleBasketNav"><md-icon>shopping_cart</md-icon><strong>({{getBasketLength}})</strong></md-button>

        <!--<md-menu-content>-->
          <!--<md-menu-item disabled v-if="basket.length == 0">No item in cart</md-menu-item>-->
          <!--<md-menu-item disabled v-for="product in basket" :key="product.id">-->
            <!--{{product.title}} - £{{product.price}} <div style="float: right">x{{product.count}}</div>-->
            <!--<md-icon>remove_shopping_cart</md-icon>-->
          <!--</md-menu-item>-->
          <!--<md-menu-item disabled v-if="total != 0"><strong>Total: £{{total}} </strong></md-menu-item><md-button v-if="total != 0">Check Out</md-button>-->
        <!--</md-menu-content>-->




      <!--<md-menu md-align-trigger style="flex: 2" md-direction="bottom left">-->
        <!--<md-button md-menu-trigger><md-icon>account_box</md-icon></md-button>-->

        <!--<md-menu-content>-->

        <!--</md-menu-content>-->
      <!--</md-menu>-->
      <md-button @click.native="toggleLoginNav" class=" md-dense">Login</md-button>
      <!--<md-button @click.native="$router.push('/sign-up')" class=" md-dense">Sign Up-->


    </md-toolbar>
    <br><br><br><br>
    <md-sidenav class="md-left" ref="basketNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Login</h3>

        </div>
      </md-toolbar>

      <!--<md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>-->
      <p disabled v-if="basket.length == 0">No item in cart</p>
      <md-list>
        <md-list-item disabled v-for="product in basket" :key="product.id">
          {{product.title}} - £{{product.price}} <div style="float: right">x{{product.count}}</div>
          <md-icon>remove_shopping_cart</md-icon>
        </md-list-item>
      </md-list>
      <p disabled v-if="total"><strong>Total: £{{total}} </strong></p><md-button v-if="total != 0">Check Out</md-button>
    </md-sidenav>
    <md-sidenav class="md-left" ref="loginNav">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Login</h3>

        </div>
      </md-toolbar>

      <!--<md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>-->
      <AccountService class="no-border-form-generator"></AccountService>
    </md-sidenav>

    <!--<md-sidenav class="md-right" ref="rightSidenavBasket">-->
      <!--<md-toolbar>-->
        <!--<div class="md-toolbar-container">-->
          <!--<h3 class="md-title">Login</h3>-->

        <!--</div>-->
      <!--</md-toolbar>-->



      <!--&lt;!&ndash;<md-button class="md-raised md-accent" @click.native="closeRightSidenav">Close</md-button>&ndash;&gt;-->
    <!--</md-sidenav>-->

    <router-view>
    </router-view>
  </div>
</template>

<script>
  import ProductService from './components/Product/ProductService'
  import AccountService from './components/Account/account-service'
  import Signup from './components/Account/Signup'
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  import VueMaterial from 'vue-material'
  import 'es6-promise/auto'

  Vue.use(VueMaterial)

  export default {
    name: 'app',
    components: {
      ProductService,
      AccountService,
      Signup
    },
    methods: {
      toggleLoginNav () {
        this.$refs.loginNav.toggle()
      },
      toggleBasketNav () {
        this.$refs.basketNav.toggle()
      }
    },
    computed: {
      ...mapGetters({
        username: 'usernameState',
        basket: 'basketState',
        total: 'totalState',
        isAdmin: 'isAdminState'
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

  .sticky-header {
    position:fixed;
    width: 100%;
    z-index: 9;
  }
</style>
