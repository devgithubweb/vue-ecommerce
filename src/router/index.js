import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Signup from '@/components/Account/Signup'
import ProductAdminListComponent from '@/components/Admin/ProductAdminListComponent'
import ProductAdminDetailComponent from '@/components/Admin/ProductAdminDetailComponent'
import AccountComponent from '@/components/Account/AccountComponent'
import ProductComponent from '@/components/Product/ProductComponent'

Vue.use(Router)

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

export default router
