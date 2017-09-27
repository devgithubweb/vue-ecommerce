<template>
  <div>
    <md-snackbar md-position="top right" ref="snackbar" md-duration="3000">
      <span>Please log in to order items.</span>
      <md-button class="md-accent" md-theme="light-blue" @click="$refs.snackbar.close()">Close</md-button>
    </md-snackbar>

    <md-layout md-align="center">
      <md-layout md-flex-medium="90" md-flex="90">

        <div v-if="basket.length > 0" class="full-width">
        <h3 class="md-headline" style="text-align: left">Basket</h3>
        <md-table class="full-width" v-once>
          <md-table-header>
            <md-table-row>
              <md-table-head>Name</md-table-head>
              <md-table-head>Price</md-table-head>
              <md-table-head>Amount</md-table-head>
            </md-table-row>
          </md-table-header>

          <md-table-body>
            <md-table-row v-for="(row, index) in basket" :key="index">
              <md-table-cell v-for="(col, index) in row" :key="index" class="table-align"
                             v-if="index !== 'id' && index !== 'postdate' && index !== 'tags' &&
          index !== 'images' && index !== 'description'">
                <div v-if="index !== 'price'">
                  {{col}}
                </div>
                <div v-if="index === 'price'">
                  £ {{col}}
                </div>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
          <md-layout md-flex="100">
            <h3 class="md-headline">Total: £ {{basketTotal}}</h3>
          </md-layout>
        </div>
        <div v-else><br />No items in basket</div>
        <md-layout md-flex="100" v-if="basket.length > 0">
          <h3 class="md-headline">Post address</h3>
        </md-layout>
        <md-layout md-flex-small="100" md-flex="33" v-if="basket.length > 0">
          <form novalidate @submit.stop.prevent="submit" style="width: 100%" v-if="userInfoData.length === 0">
            <md-input-container>
              <label>Street number/name</label>
              <md-input type="text" v-model="userInfoForm.address_line_one"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Town</label>
              <md-input type="text"v-model="userInfoForm.address_line_two"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Postcode</label>
              <md-input type="text" v-model="userInfoForm.postcode"></md-input>
            </md-input-container>
          </form>
          <div v-if="userInfoData.length > 0" style="text-align: left">
            <div v-for="(user, index) in userInfoData">
              <p>{{user.address_line_one}}</p>
              <p>{{user.address_line_two}}</p>
              <p>{{user.postcode}}</p>
            </div>
          </div>
        </md-layout>
        <md-layout md-flex="100">
          <md-button class="md-raised md-primary" style="float: left" @click="order()">Order</md-button>
        </md-layout>
      </md-layout>
    </md-layout>
  </div>
</template>

<style scoped>
  .full-width {
    width: 100%!important;
  }

  .table-align {
    text-align: left !important;
  }
</style>

<script>
  import {mapGetters} from 'vuex'

  import UserInformationService from '../../services/UserInformationService'
  import ReceiptService from '../../services/ReceiptService'
  import Auth from '../../services/Auth'

  export default {
    data () {
      return {
        userInfoForm: {
          address_line_one: '',
          address_line_two: '',
          postcode: ''
        },
        userInfoData: [],
        order () {
          let purchasedProducts = []
          for (let i = 0; i < this.basket.length; i++) {
            purchasedProducts[i] = {
              product_name: this.basket[i].title,
              product_id: this.basket[i].id,
              price: this.basket[i].price,
              quantity: this.basket[i].count
            }
          }

          const receiptData = {
            product: purchasedProducts,
            total_charge: 0
          }

          let userinfo = this.userInfoData.length > 0 ? this.userInfoData[0] : this.userInfoForm

          const userInfo = this.userInfoData.length > 0 ? UserInformationService.getUserInformation() : UserInformationService.createUserInformation(userinfo)
          const receipt = ReceiptService.createReceipt(receiptData)

          Promise.all([userInfo, receipt]).then(result => {
            console.log(result[0], result[1])
          }).catch(() => {
            this.$refs.snackbar.open()
          })
        }
      }
    },
    mounted () {
      if (Auth.getToken()) {
        UserInformationService.getUserInformation()
          .then(response => {
            this.userInfoData = response.data
          }).catch(() => {
            console.log('No user information found')
          })
      }
    },

    computed: {
      ...mapGetters({
        basket: 'basketState',
        basketTotal: 'totalState'
      })
    }
  }
</script>
