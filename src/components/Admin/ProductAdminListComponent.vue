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
          <md-button class="md-raised">Search Product</md-button>
          <router-link to="/admin/products/create"><md-button class="md-raised md-primary">Add Product</md-button></router-link>

          <md-table-card class="md-table-full-width">
            <md-table>
              <md-table-header>
                <md-table-row>
                  <md-table-head>Name</md-table-head>
                  <md-table-head>Post Date</md-table-head>
                  <md-table-head>Price</md-table-head>
                </md-table-row>
              </md-table-header>

              <md-table-body>
                <md-table-row v-for="(product, indexNo) in filterByName" :key="product.id" class="md-table-cell-align">
                  <md-table-cell v-for="(prop, propIndex) in product" :key="propIndex" class="md-table-cell-align"
                                 v-if="propIndex !== 'image' && propIndex !== 'id' && propIndex !== 'description' && propIndex !== 'images'
                                  && propIndex !== 'count'">
                    <template v-if="propIndex !== 'count' && propIndex !== 'price'
                     && propIndex !== 'images' && propIndex !== 'description'">
                      {{product[propIndex]}}
                    </template>
                    <template v-if="propIndex !== 'count' && propIndex !== 'postdate' && propIndex === 'price'
                    && propIndex !== 'images' && propIndex !== 'description'">
                      £ {{product[propIndex]}}
                    </template>
                  </md-table-cell>
                  <md-table-cell>
                    <md-button class="md-button-auto-width" @click.native="goToProduct(product.id)">View</md-button>
                  </md-table-cell>
                </md-table-row>
              </md-table-body>
            </md-table>

            <md-table-pagination
              md-size="5"
              md-total="10"
              md-page="1"
              md-label="Rows"
              md-separator="of"
            ></md-table-pagination>
          </md-table-card>


        </md-layout>
      </md-layout>

    </div>

    <div v-if="!isAdmin">
      You cannot access this page
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

  .md-table-cell-align {
    text-align: left;
  }

  .md-table-full-width {
    width: 100%;
  }

  .md-button {
    width: auto !important;
  }

  .header-title-h2 {
    text-align: left;
  }

</style>

<script type="text/babel">
  import {mapGetters} from 'vuex'
  import {focus} from 'vue-focus'

  import ProductService from '../../services/ProductService'

  export default {
    name: 'ProductAdmin',
    directives: {focus: focus},
    data () {
      return {
        nameText: '',
        priceText: '',
        clicked: [],
        title: '',
        description: '',
        price: 0.00,
        goToProduct (id) {
          this.$router.push({name: 'ProductAdminDetail', params: {id: id}})
        }
      }
    },
    computed: {
      ...mapGetters({
        isAdmin: 'isAdminState',
        products: 'productState',
        token: 'tokenState',
        username: 'usernameState'
      }),
      filterByName () {
        return this.products.filter(list => {
          return list.title.toLowerCase().includes(this.nameText.toLowerCase()) && list.price >= this.priceText
        })
      }
    },
    mounted () {
      this.$nextTick(() => {
        ProductService.getProducts().then(response => {
          this.products = response.data
          this.$store.dispatch('setProducts', response.data)
          for (let i = 0; i < this.products.length; i++) {
            this.products[i]['count'] = 0
          }
        }).catch(error => {
          console.log(error)
        })
      })
    },
    beforeCreate () {
      document.title = 'Admin | Products'
    }
  }
</script>
