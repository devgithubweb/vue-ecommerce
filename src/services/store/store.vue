<script>
  import Vue from 'vue'
  import Vuex from 'vuex'
  import {vuex as Account} from '@/components/Account/vuex'
  import {vuex as Admin} from '@/components/Admin/vuex'
  import {vuex as Product} from '@/components/Product/vuex'

  Vue.use(Vuex)

  export const store = new Vuex.Store({modules: {
    Account,
    Admin,
    Product
  }})
</script>
