<template>
  <div>
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
          <form novalidate @submit.stop.prevent="submit" style="width: 100%">
            <md-input-container>
              <label>Street number/name</label>
              <md-input type="text" v-model="userInfo.address_one"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Town</label>
              <md-input type="text"v-model="userInfo.address_two"></md-input>
            </md-input-container>

            <md-input-container>
              <label>Postcode</label>
              <md-input type="text" v-model="userInfo.postcode"></md-input>
            </md-input-container>

            <md-button class="md-raised md-primary" style="float: left" @click="order()">Order</md-button>
          </form>
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
        userInfo: {
          address_one: '',
          address_two: '',
          postcode: ''
        },
        order () {
          const receiptData = {
            customer: ''
          }

          const userInfo = UserInformationService.createUserInformation(this.userInfo)
          const receipt = ReceiptService.createReceipt(receiptData)

          Promise.all([userInfo, receipt]).then(result => {
            console.log(result[0], result[1])
          })
        }
      }
    },
    mounted () {
      if (Auth.getToken()) {
        UserInformationService.getUserInformation()
          .then(response => {
            this.userInfo = response.data
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
