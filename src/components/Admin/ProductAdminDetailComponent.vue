<template>
  <md-layout md-gutter md-align="center" v-if="isAdmin">
    <md-layout md-flex-medium="90" md-flex="90">
      <form novalidate @submit.stop.prevent="submit" class="form-width">
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
        <md-button v-if="id" class="md-raised md-primary" @click.native="updateProduct()">Update</md-button>
        <md-button v-else class="md-raised md-primary" @click.native="createProduct()">Create</md-button>
      </form>

    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90">
      <p>
        Associated images:
      </p>
    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90" v-if="product.images">
      <div v-for="image in product.images">
        <img :src="image.image" class="image">
      </div>
    </md-layout>
  </md-layout>
  <md-layout md-gutter md-align="center" v-else>
  You cannot access this page
  </md-layout>
</template>

<style scoped>
  .image {
    width: 200px;
    height: 200px;
  }

  .form-width {
    min-width: 30%;
  }
</style>

<script>
  import {mapGetters} from 'vuex'

  import ProductService from '../../services/ProductService'
  import ImageService from '../../services/ImageService'
  import Auth from '../../services/Auth'

  export default {
    data () {
      return {
        id: null,
        product: {
          title: '',
          description: '',
          price: '',
          images: []
        },
        postImages: '',
        images: [{

        }],
        token: '',
        createProduct () {
          ProductService.createProduct(this.product)
            .then(response => {
//              this.$router.push({name: 'ProductAdminDetail', params: {id: response.data['id']}})
              this.$router.push({name: 'ProductAdmin'})
            }).catch(error => {
              console.log(error)
            })
        },
        updateProduct () {
          const prod = {
            id: this.id || null,
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
        this.token = Auth.getToken()

        if (!isNaN(this.$route.params.id)) {
          this.id = this.$route.params.id
          const prod = ProductService.getProduct(this.id)
          const image = ImageService.getImageByProductId(this.id)

          Promise.all([prod, image])
            .then(result => {
              this.product = result[0].data
              document.title = `${this.product.title} | Edit`
              this.images = result[1].data
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
    computed: {
      ...mapGetters({
        isAdmin: 'isAdminState'
      })
    }
  }
</script>
