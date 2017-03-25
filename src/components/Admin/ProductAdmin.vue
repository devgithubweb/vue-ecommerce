<template>
  <div>
    <div v-if="isAdmin">
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head>Name</md-table-head>
            <md-table-head>ID</md-table-head>
            <md-table-head>Title</md-table-head>
            <md-table-head>Content</md-table-head>

            <md-table-head>Post Date</md-table-head>
            <md-table-head>Price</md-table-head>
            <md-table-head>Stock</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="product in products" :key="product.id" class="md-table-cell-align">
            <md-table-cell>{{product.title}}</md-table-cell>    
            <md-table-cell v-for="(prop, index) in product" :key="index" class="md-table-cell-align" v-if="index !== 'image'" @click.native="">
              <template v-if="index === 'price'">£ {{prop}}</template>
              <template v-else>{{prop}}</template>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>

    {{test}}
    <div v-if="!isAdmin">
      Please log in to view this page
    </div>
    </div>
</template>

<style scoped>
  .md-table-cell-align {
    text-align: left;
  }
</style>

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
      products: 'productState'
    })
  }
}
</script>
