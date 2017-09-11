import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import vuex from 'vuex'

import Home from '@/components/Home'
import Signup from '@/components/Account/Signup'
import ProductAdminListComponent from '@/components/Admin/ProductAdminListComponent'
import ProductAdminDetailComponent from '@/components/Admin/ProductAdminDetailComponent'
import AccountComponent from '@/components/Account/AccountComponent'
import ProductComponent from '@/components/Product/ProductComponent'
import ProductDetailComponent from '@/components/Product/ProductDetailComponent'
import Auth from '../services/Auth'

const API_URL = process.env.API_URL

Vue.use(Router)
Vue.use(vuex)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sign-up',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: AccountComponent
    },
    {
      path: '/products',
      name: 'Products',
      component: ProductComponent
    },
    {
      path: '/products/:id',
      name: 'ProductDetail',
      component: ProductDetailComponent
    },
    {
      path: '/admin/products',
      name: 'ProductAdmin',
      component: ProductAdminListComponent
    },
    {
      name: 'ProductAdminDetail',
      path: '/admin/products/:id',
      component: ProductAdminDetailComponent
    },
    {
      name: 'ProductAdminCreate',
      path: '/admin/products/create',
      component: ProductAdminDetailComponent
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (Auth.getToken()) {
    const token = Auth.getToken().split('JWT ')[1]
    axios.post(`${API_URL}api-token-verify/`, {token: token})
      .catch(error => {
        if (error) {
          localStorage.removeItem('token')
          localStorage.removeItem('username')
          this.username = Auth.getUsername()
          this.token = Auth.getToken()
          this.$store.dispatch('setUsername', null)
          this.$store.dispatch('setIsAdmin', false)
        }
      })
  }
  next()
})

export default router
