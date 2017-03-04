<template>
  <div>
    <div  v-for="product in products">
      {{product}}
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        token: null,
        products: [],
        addProducts: () => {
          let newJob = {
            title: this.title,
            description: this.description
          }
          axios.post('http://127.0.0.1:8000/api/products/', newJob, {headers: {Authorization: this.token}})
            .then(() => {
              this.getJobs()
            }).catch(error => {
              console.log(error)
            })
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
    }
  }
</script>
