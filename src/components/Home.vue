<template>
  <md-layout md-gutter md-align="center">
    <md-layout md-flex-medium="90" md-flex="90">
      <md-layout md-flex-small="100">
        <h1 class="md-title">Latest products</h1>
        <md-boards class="md-primary" :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
          <md-board v-for="(product, index) in latestProducts" :key="index" :id="`slide${index+1}`">
            <div v-if="product.images.length > 0">
              <img :src=product.images[0].image>
            </div>
            {{product.title}}
          </md-board>

        </md-boards>
      </md-layout>
      <md-layout md-flex-small="100">

        <h1 class="md-title">Popular products</h1>
        <md-boards class="md-primary" :md-auto="true" :md-infinite="true" :md-duration="5000" :md-swipeable="true">
          <md-board v-for="(product, index) in popularProducts" :key="index" :id="`slide${index+1}`">
            <div v-if="product.images.length > 0">
              <img :src=product.images[0].image>
            </div>
            {{product.title}}
          </md-board>

        </md-boards>
      </md-layout>
    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90" md-align="left">
      <md-layout id="about-section">
      <h1 class="md-title">About ecommerce system</h1>

      <p>This is a basic ecommerce system developed using VueJs 2.
        Still a work in progress as I am learning to build systems from scratch.
        The objective was more of a learning experience to get a practical VueJs web application deployed.
        Learning best practices of VueJs and Vuex allows me to stay on top of latest concepts.</p>

        <h1 class="md-title">Technology breakdown</h1>
        <p><strong>Front-end technologies:</strong></p>
        <ul>
          <li>VueJs 2</li>
          <li>Vuex state management</li>
          <li>Vue-material</li>
          <li>Axios HTTP client</li>
        </ul>
        <p><strong>Back-end technologies:</strong></p>
        <ul>
          <li>Django</li>
          <li>Djangrestframework</li>
        </ul>
        <p><strong>Deployment:</strong></p>
        <ul>
          <li>Heroku</li>
          <li>Python buildpack</li>
          <li>NodeJs buildpack</li>
        </ul>
      </md-layout>
    </md-layout>
  </md-layout>
</template>

<script>
  import ProductService from '../services/ProductService'

  export default {
    name: 'hello',
    data () {
      return {
        latestProducts: [],
        popularProducts: []
      }
    },
    mounted () {
      this.$nextTick(() => {
        const latestProds = ProductService.getLatestProducts()
        const popularProds = ProductService.getPopularProducts()

        Promise.all([latestProds, popularProds]).then(result => {
          this.latestProducts = result[0].data
          this.popularProducts = result[1].data
        }).catch(() => {
          this.latestProducts = 'Error loading latest products'
          this.popularProducts = 'Error loading popular products'
        })
      })
    },
    beforeCreate () {
      document.title = 'Home | Ecommerce System'
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  #about-section {
    display: block;
    text-align: left
  }
</style>
