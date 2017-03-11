<template>
  <div>
    <div v-if="products.length == 0">No products available, please come back at a later time.</div>
    <div v-for="product in products">
      Product Title: {{product.title}}<br>
      Product Description: {{product.description}} <br><br>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        name: 'Products',
        title: '',
        description: '',
        products: [],
        addProducts: () => {
          let newJob = {
            title: this.title,
            description: this.description
          }
          if (this.token) {
            axios.post('http://127.0.0.1:8000/api/products/', newJob, {headers: {Authorization: this.token}})
              .then(() => {
                this.getJobs()
              }).catch(error => {
                console.log(error)
              })
          }
        },
        removeProducts: index => {
          axios.delete('http://127.0.0.1:8000/api/products/'.concat(this.jobs[index].id), {headers: {Authorization: this.token}}).catch(error => {
            console.log(error)
          })
          this.jobs.splice(index, 1)
        },
        getProducts: () => {
          axios.get('http://127.0.0.1:8000/api/products/').then(response => {
            this.products = response.data
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getProducts()
      })
    },
    computed: {
      ...mapGetters({
        token: 'tokenState',
        username: 'usernameState'
      })
    }
  }
</script>
