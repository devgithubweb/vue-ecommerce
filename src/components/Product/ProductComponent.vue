<template>
  <div>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex-medium="100" md-flex="90">
        <md-layout md-align="left">
          <md-layout md-flex-xsmall="100" md-flex-medium="33" md-flex="25" v-for="product in products" :key="product.id"
                     class="product-card">
              <md-card>
                <md-card-media v-if="product.images.length > 0">
                  <img :src="product.images['0']['image']" :alt="product.title">
                </md-card-media>

                <md-card-header>
                  <div class="md-title"><a href="javascript:void(0)" @click="goToProduct(product.id)">{{product.title}}</a></div>
                  <div class="md-subhead"></div>
                </md-card-header>

                <md-card-expand>
                  <md-card-actions>
                    <md-button @click.native="addToBasket(product);$store.dispatch('addTotalPrice')">
                      <md-icon>add_shopping_cart</md-icon>
                    </md-button>
                    <span style="flex: 1">£ {{product.price}}</span>
                    <md-button class="md-icon-button" md-expand-trigger>
                      <md-icon>keyboard_arrow_down</md-icon>
                    </md-button>
                  </md-card-actions>

                  <md-card-content>
                    {{product.description}}
                  </md-card-content>
                </md-card-expand>
              </md-card>
          </md-layout>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<style scoped>
  .product-card {
    padding: 10px;
  }

</style>

<script>
  import {mapGetters} from 'vuex'
  import ProductService from '../../services/ProductService'

  export default {
    data () {
      return {
        name: 'Products',
        title: '',
        description: '',
        products: [],
        /**
         * Gets all products and mutates to local variable
         * @return {null}
         */
        getProducts: () => {
          ProductService.getProducts()
            .then(response => {
              this.products = response.data
              this.$store.dispatch('setProducts', response.data)
              for (let i = 0; i < this.products.length; i++) {
                this.products[i]['count'] = 0
              }
            }).catch(error => {
              console.log(error)
            })
        },
        goToProduct (id) {
          this.$router.push({name: 'ProductDetail', params: {id}})
        },
        /**
         * Adds to basket using the store
         * @param  {Object} product Adds the product based on the users selection
         * @return {null}
         */
        addToBasket: (product) => {
          this.$store.dispatch('addToBasket', product)
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.getProducts()
      })
    },
    beforeCreate () {
      document.title = 'Products'
    },
    computed: {
      ...mapGetters({
        basket: 'basketState'
      })
    }
  }
</script>
