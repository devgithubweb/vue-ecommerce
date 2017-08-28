<template>
  <md-layout md-gutter md-align="center">
    <md-layout md-flex-medium="90" md-flex="90">
      <form novalidate @submit.stop.prevent="submit">
        <md-input-container>
          <label>Name</label>
          <md-input v-model="product.title"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Textarea</label>
          <md-textarea v-model="product.description" maxlength="200"></md-textarea>
        </md-input-container>

        <md-input-container>
          <label>Price</label>
          <md-input type="number" v-model="product.price"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Upload image</label>
          <md-file v-model="postImages" multiple></md-file>
        </md-input-container>

        <md-button class="md-raised md-primary" @click.native="updateProduct()">Update</md-button>
      </form>

    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90">
      <p>
        Associated images:
      </p>
    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90">
      <div v-for="image in product.images">
        <img :src="image.image" class="image">
      </div>
    </md-layout>
  </md-layout>
</template>

<style scoped>
  .image {
    width: 200px;
    height: 200px;
  }
</style>

<script>
  import ProductService from '../../services/ProductService'
  import ImageService from '../../services/ImageService'
  import Auth from '../../services/auth'

  export default {
    data () {
      return {
        id: this.$route.params.id,
        product: {},
        postImages: '',
        images: [],
        token: Auth.getToken(),
        updateProduct () {
          const prod = {
            id: this.product.id,
            title: this.product.title,
            description: this.product.description,
            price: this.product.price
          }
          ProductService.updateProduct(prod, this.token)
            .then(response => {
              console.log(response)
            })
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        const prod = ProductService.getProduct(this.id)
        const image = ImageService.getImageByProductId(this.id)

        Promise.all([prod, image])
          .then(result => {
            this.product = result[0].data
            document.title = `${this.product.title} | Edit`
            this.images = result[1].data
            console.log(result[0])
          })
          .catch(error => {
            console.log(error)
          })
      })
    }
  }
</script>
