<template>
  <div>
    <div v-if="isAdmin">
      
      <md-input-container md-inline>
        <label>Name</label>
        <md-input v-model="nameText"></md-input>
      </md-input-container>

      <!-- <md-input-container md-inline>
        <label>ID</label>
        <md-input v-model="searchText"></md-input>
      </md-input-container>

      <md-input-container md-inline>
        <label>Content</label>
        <md-input v-model="searchText"></md-input>
      </md-input-container>

      {{searchText}} -->
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
        <md-table-body v-if="!filterByName.length > 0">
          <md-table-row v-for="product in products" :key="product.id" class="md-table-cell-align">
            <md-table-cell>{{product.title}}</md-table-cell>
            <md-table-cell v-for="(prop, index) in product" :key="index" class="md-table-cell-align" v-if="index !== 'image'" @click.native="">
              <template v-if="index === 'price'">£ {{prop}}</template>
              <template v-else>{{prop}}</template>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
        <md-table-body v-else>
          <md-table-row v-for="product in filterByName" :key="product.id" class="md-table-cell-align">
            <md-table-cell>{{product.title}}</md-table-cell>
            <md-table-cell v-for="(prop, index) in product" :key="index" class="md-table-cell-align" v-if="index !== 'image'" @click.native="">
              <template v-if="index === 'price'">£ {{prop}}</template>
              <template v-else>{{prop}}</template>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>

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

<script type='text/babel'>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {
  name: 'ProductAdmin',
  data () {
    return {
      nameText: '',
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
    }),
    filterByName () {
      return this.products.filter(list => {
        return list.title.toLowerCase().includes(this.nameText.toLowerCase())
        // cust.name.toLowerCase().indexOf(this.nameText.toLowerCase() >= 0)
      })
    }
  }
}
</script>
