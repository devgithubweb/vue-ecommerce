<template>
  <md-layout md-gutter md-align="center" v-if="isAdmin">
    <md-layout md-flex-medium="90" md-flex="90">
      <form novalidate @submit.stop.prevent="submit" class="form-width" enctype="multipart/form-data">
        <md-input-container>
          <label>Name</label>
          <md-input v-model="product.title"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Description</label>
          <md-textarea v-model="product.description" maxlength="300"></md-textarea>
        </md-input-container>

        <md-input-container>
          <label>Price</label>
          <md-input type="number" v-model="product.price"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Tags</label>
          <md-input type="text" v-model="tags"></md-input>
        </md-input-container>

        <md-input-container>
          <label>Upload image</label>
          <md-file v-model="postImages" id="fileUpload" multiple></md-file>
        </md-input-container>
        <md-button v-if="id" class="md-raised md-primary" @click.native="updateProduct(); createImage()">Update
        </md-button>
        <md-button class="md-raised md-primary" @click.native="createProduct()" v-else>Create</md-button>
      </form>

    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90" v-if="id">
      <p>
        Associated images:
      </p>
    </md-layout>
    <md-layout md-flex-medium="90" md-flex="90" v-if="product.images">
      <div v-for="image in product.images">
        <p><img :src="image.image" class="image"></p>
        <p>
          <md-button @click.native="removeImage(image)">Remove</md-button>
        </p>
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
  import TagService from '../../services/TagService'
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
        tags: '',
        postImages: '',
        images: [{}],
        token: '',
        createProduct () {
          ProductService.createProduct(this.product)
            .then(response => {
              this.$router.push({name: 'ProductAdminDetail', params: {id: response.data['id']}})
              this.$router.push({name: 'ProductAdmin'})
              this.product = response.data
              this.id = this.product.id
            }).then(() => {
              this.createImage()
              this.createTags()
            })
        },
        createImage () {
          let files = document.getElementById('fileUpload').files

          if (files) {
            for (let i = 0; i < files.length; i++) {
              let data = new FormData()
              data.append('image', files[i])
              data.append('product_item', this.product.id)

              ImageService.createImage(data, this.product.id)
                .then(response => {
                  console.log(response)
                }).catch(error => {
                  console.log(error)
                }).then(() => {
                  this.$router.push({name: 'ProductDetail', params: {id: this.product.id}})
                })
            }
          } else {
            this.$router.push({name: 'ProductDetail', params: {id: this.product.id}})
          }
        },
        createTags () {
          const tagsArr = this.tags.split(', ')

          for (let i = 0; i < tagsArr.length; i++) {
            let tagObj = {name: tagsArr[i], product_item: this.product.id}
            TagService.createTag(tagObj)
              .then(response => {
                console.log(response)
              })
          }
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
          if (this.tags) {
            this.createTags()
          }
        },
        removeImage (image) {
          ImageService.updateImageProductId(image)
            .then(response => {
              console.log(response)
            }).catch(error => {
              console.log(error)
            }).then(() => {
              this.getProducts()
            })
        },
        getProducts () {
          ProductService.getProduct(this.id)
            .then(response => {
              this.product = response.data
            }).catch(error => {
              console.log(error)
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
          const tags = TagService.getTags(this.id)

          Promise.all([prod, image, tags])
            .then(result => {
              this.product = result[0].data
              document.title = `Admin | ${this.product.title} | Edit`
              this.images = result[1].data

              const tagsArr = result[2].data

              for (let i = 0; i < tagsArr.length; i++) {
                if (i !== tagsArr.length - 1) {
                  this.tags += `${tagsArr[i]['name']}, `
                  console.log('not the end')
                } else {
                  this.tags += `${tagsArr[i]['name']}`
                }
              }
              console.log(this.tags)

//              this.tags = result[2].data
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
