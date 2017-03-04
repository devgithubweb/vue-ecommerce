<template>
  <div>
    <div  v-for="product in products">
      {{product.title}} -- {{product.description}}
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
            productTitle: this.productTitle,
            productDescription: this.productDescription
          }
          axios.post('http://127.0.0.1:8000/api/jobs/', newJob, {headers: {Authorization: this.token}})
            .then(() => {
              this.getJobs()
            }).catch(error => {
              console.log(error)
            })
        },
        removeProducts: index => {
          axios.delete('http://127.0.0.1:8000/api/jobs/'.concat(this.jobs[index].id), {headers: {Authorization: this.token}}).catch(error => {
            console.log(error)
          })
          this.jobs.splice(index, 1)
        },
        getProducts: () => {
          axios.get('http://127.0.0.1:8000/api/jobs/').then(response => {
            this.jobs = response.data
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getJobs()
      })
    }
  }
</script>
