<template>
  <md-whiteframe>
    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="75">
        <p><span class="md-display-2">{{product.title}}</span></p>

      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="75">
        <img :src="imgUrl">
      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="75">
        <md-chip v-for="(img, index) in product.images" md-editable @click.native="selectImage(img.image)">{{index + 1}}</md-chip>
        <md-button>{{product.price}}</md-button>
      </md-layout>
    </md-layout>
    <md-layout md-align="center" md-gutter>
      <md-layout md-flex="75">
        <p>{{product.description}}</p>
      </md-layout>
    </md-layout>
  </md-whiteframe>
</template>

<script>
  import ProductService from '../../services/ProductService'

  export default {
    name: 'ProductDetailComponent',
    data () {
      return {
        product: {},
        imgUrl: '',
        selectImage (image) {
          this.imgUrl = image
        }
      }
    },
    mounted () {
      this.$nextTick(() => {
        ProductService.getProduct(this.$route.params.id)
          .then(result => {
            this.product = result.data
            this.imgUrl = this.product.images[0].image
            document.title = `${this.product.title}`
          }).catch(error => {
            console.log(error)
          })
      })
    }
  }
</script>
