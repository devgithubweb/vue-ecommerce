<template>
  <div>
    <div v-if="isAdmin">
      
    </div>
    <div v-if="!isAdmin">
      Please log in to view this page
    </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'ProductAdmin',
  data () {
    return {
      addProducts: () => {
        let newProduct = {
          title: this.title,
          description: this.description
        }
        if (this.token) {
          axios.post('http://127.0.0.1:8000/api/products/', newProduct, {headers: {Authorization: this.token}})
            .then(() => {
              this.getJobs()
            }).catch(error => {
              console.log(error)
            })
        }
      },
      removeProducts: index => {
        axios.delete('http://127.0.0.1:8000/api/products/'.concat(this.products[index].id), {headers: {Authorization: this.token}}).catch(error => {
          console.log(error)
        })
        this.products.splice(index, 1)
      }
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'isAdminState',
      products: 'ProductState'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
