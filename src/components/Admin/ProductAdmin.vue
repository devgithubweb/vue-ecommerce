<template>
  <div>
    <div v-if="isAdmin">
      <md-layout md-gutter md-align="center">
      <md-layout md-flex-medium="90" md-flex="90">

      <h2 class="header-title-h2">Products</h2>
      <md-layout md-flex-medium="100" md-flex="100">
      <md-layout md-flex-medium="30" md-flex="30">
        <md-layout md-flex-medium="100" md-flex="100">
          <md-input-container md-inline>
            <label>Product name</label>
            <md-input v-model="nameText"></md-input>
          </md-input-container>
        </md-layout>

        <md-layout md-flex-medium="100" md-flex="100">
          <md-input-container md-inline>
            <label>Price</label>
            <md-input v-model="priceText"></md-input>
          </md-input-container>
          </md-layout>
          </md-layout>
      </md-layout>

      <md-table class="md-table-full-width">
        <md-table-header>
          <md-table-row>
            <md-table-head>Name</md-table-head>
            <md-table-head>Content</md-table-head>
            <md-table-head>Post Date</md-table-head>
            <md-table-head>Price</md-table-head>
          </md-table-row>
        </md-table-header>

        <md-table-body>
          <md-table-row v-for="(product, indexNo) in filterByName" :key="product.id" class="md-table-cell-align">
            <md-table-cell v-for="(prop, propIndex) in product" :key="propIndex" class="md-table-cell-align" v-if="propIndex !== 'image' && propIndex !== 'id'">
              <template v-if="propIndex !== 'count' && propIndex !== 'postdate' && propIndex !== 'price'">
                <input v-model="product[propIndex]" @blur="editProduct(indexNo, product)">
               </template>
               <template v-if="propIndex !== 'count' && propIndex === 'postdate' && propIndex !== 'price'">
                <input v-model="product[propIndex]" @blur="editProduct(indexNo, product)" :disabled="true">
                </template>
                <template v-if="propIndex !== 'count' && propIndex !== 'postdate' && propIndex === 'price'">
                £ <input v-model="product[propIndex]" @blur="editProduct(indexNo, product)" id="price-input-width"/>
                </template>
            </md-table-cell>
          </md-table-row>
        </md-table-body>
      </md-table>
      </md-layout>
      </md-layout>

    </div>

    <div v-if="!isAdmin">
      Please log in to view this page
    </div>
    </div>
</template>

<style scoped>
  input {
    border: none;
    width: 100%;
    /*background-color: rgb(238, 238, 238)*/
  }

  input:disabled {
    background-color: #fff;
  }

  #price-input-width {
    width: 80%
  }

  .md-table-cell-align {
    text-align: left;
  }

  .md-table-full-width {
    width: 100%;
  }

  .header-title-h2 {
    text-align: left;
  }

</style>

<script type="text/babel">
import {mapGetters} from 'vuex'
import axios from 'axios'
import {focus} from 'vue-focus'
// import Vue from 'vue'

// Vue.filter('paginate', (list) => {
//  this.resultCount = list.length
//  if (this.currentPage >= this.totalPages) {
//    this.currentPage = this.totalPages - 1
//  }
//  let index = this.currentPage * this.itemsPerPage
//  return list.slice(index, index + this.itemsPerPage)
// })

export default {
  name: 'ProductAdmin',
  directives: {focus: focus},
  data () {
    return {
      nameText: '',
      priceText: '',
      clicked: [],
      fillChangeStatus: () => {
        this.products.forEach(item => {
          this.clicked.push(false)
        })
      },
      changeClicked: (index) => {
        if (index === 'all') {
          this.$set(this.clicked, [])
        } else {
          this.$set(this.clicked, index, !this.clicked[index])
        }
      },
       /**
         * Adds product through authorization header and based on newProduct object
         * @return {null}
         */
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
      /**
      * Edits products based on their ID
      */
      editProduct: (indexNo, productObj) => {
        let updatedObj = {
          title: productObj['title'],
          description: productObj['description'],
          price: productObj['price']
        }
        axios.patch('http://127.0.0.1:8000/api/admin/products/'.concat(productObj.id, '/'), updatedObj, {headers: {Authorization: this.token}}).catch(error => {
          console.log(error)
        })
      },
      /**
         * Removes product based on user actions
         * @param  {number} index The index of the product is deleted
         * @return {null}       Mutates models separately
         */
      removeProducts: index => {
        axios.delete('http://127.0.0.1:8000/api/admin/products/'.concat(this.products[index].id), {headers: {Authorization: this.token}}).catch(error => {
          console.log(error)
        })
        this.products.splice(index, 1)
      }
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'isAdminState',
      products: 'productState',
      token: 'tokenState'
    }),
    filterByName () {
      return this.products.filter(list => {
        return list.title.toLowerCase().includes(this.nameText.toLowerCase()) && list.price >= this.priceText
      })
    }
  },
  mounted () {
  }
}
</script>
