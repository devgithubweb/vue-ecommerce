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
            <md-table-head>Title</md-table-head>
            <md-table-head>Content</md-table-head>

            <md-table-head>Post Date</md-table-head>
            <md-table-head>Price</md-table-head>
            <md-table-head>Stock</md-table-head>
          </md-table-row>
        </md-table-header>
<!--         <md-table-body v-if="!filterByName.length > 0">
          <md-table-row v-for="product in products" :key="product.id" class="md-table-cell-align">
            <md-table-cell>{{product.title}}</md-table-cell>
            <md-table-cell v-for="(prop, index) in product" :key="index" class="md-table-cell-align" v-if="index !== 'image'" @click.native="changeClicked()">
              <template v-if="index === 'price' && !clicked">£ {{prop}}</template>
              <template v-else v-if="!clicked">{{prop}}</template>
              <template v-if="clicked">
                <md-input v-model="p.index"></md-input>
              </template>
            </md-table-cell>
          </md-table-row>
        </md-table-body> -->
        <md-table-body>
          <md-table-row v-for="(product, indexNo) in filterByName" :key="product.id" class="md-table-cell-align">
            <md-table-cell>{{product.title}}</md-table-cell>
            <md-table-cell v-for="(prop, propIndex) in product" :key="index" class="md-table-cell-align" v-if="propIndex !== 'image' && propIndex !== 'id'" @click.native="changeClicked()">
              <template v-else v-if="!clicked">{{prop}}</template>
              <template v-if="clicked">

                <md-input-container md-inline><md-input v-model="products[indexNo][propIndex]"></md-input></md-input-container>
              </template>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
    </div>

    {{products}}

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
      clicked: false,
      changeClicked: () => {
        this.clicked = true
        console.log(this.clicked)
      },
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
        if (list.title.toLowerCase().includes(this.nameText.toLowerCase()) >= 0) {
          return list.title.toLowerCase().includes(this.nameText.toLowerCase())
        } else {
          return this.products
        }
        // cust.name.toLowerCase().indexOf(this.nameText.toLowerCase() >= 0)
      })
    }
  }
}
</script>
