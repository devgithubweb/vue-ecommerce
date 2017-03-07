import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import SignIn from '@/components/SignIn'
import AccountService from '@/services/AccountService'
import ProductService from '@/services/ProductService'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/login',
      name: 'Login',
      component: AccountService
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductService
    }
  ]
})
