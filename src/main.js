// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ProductService from './services/ProductService'
import AccountService from './services/AccountService'
import {accountStore} from './services/store/AccountStore'
import {productStore} from './services/store/ProductStore'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  accountStore,
  productStore,
  router,
  template: '<App/>',
  components: {App, ProductService, AccountService}
})
