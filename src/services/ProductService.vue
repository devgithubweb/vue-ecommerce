<template>
  <div>
    <md-layout md-gutter md-align="center">
      <md-layout md-flex-medium="100" md-flex="90">
        <md-layout md-align="left">
          <md-layout md-flex-xsmall="50" md-flex-medium="33" md-flex="25" v-for="product in products" :key="product.id" class="product-card">
            <md-card class="md-card-size">
              <md-card-media>
                <div v-for="img in product.image[0]">
                  <img v-bind:src="img" v-bind:alt="product.title">
                </div>
              </md-card-media>

              <md-card-header>
                <div class="md-title">{{product.title}}</div>
                <div class="md-subhead"></div>
              </md-card-header>
              <md-card-expand>
              <md-card-actions>
                <!--<md-button>£{{ product.price }}</md-button>-->
                <md-button @click.native="addToBasket(product);$store.dispatch('addTotalPrice')"><md-icon>add_shopping_cart</md-icon></md-button>
                <p style="padding-left: 10px">£{{product.price}}</p>
                <span style="flex: 1"></span>
                <md-button class="md-icon-button" md-expand-trigger>
                  <md-icon>keyboard_arrow_down</md-icon>
                </md-button>
              </md-card-actions>

              <md-card-content>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio itaque ea, nostrum odio. Dolores, sed
                accusantium quasi non, voluptas eius illo quas, saepe voluptate pariatur in deleniti minus sint.
                Excepturi.
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
  import axios from 'axios'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        name: 'Products',
        title: '',
        description: '',
        products: [],
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
         * Removes product based on user actions
         * @param  {number} index The index of the product is deleted
         * @return {null}       Mutates models separately
         */
        removeProducts: index => {
          axios.delete('http://127.0.0.1:8000/api/products/'.concat(this.products[index].id), {headers: {Authorization: this.token}}).catch(error => {
            console.log(error)
          })
          this.products.splice(index, 1)
        },
        /**
         * Gets all products and mutates to local variable
         * @return {null}
         */
        getProducts: () => {
          axios.get('http://127.0.0.1:8000/api/products/').then(response => {
            this.products = response.data
            for (let i = 0; i < this.products.length; i++) {
              this.products[i]['count'] = 0
            }
          }).catch(error => {
            console.log(error)
          })
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
    computed: {
      ...mapGetters({
        token: 'tokenState',
        username: 'usernameState',
        basket: 'basketState'
      })
    }
  }
</script>
