<template>
  <div>
    {{basket}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {

      }
    },
    mounted () {

    },

    computed: {
      ...mapGetters({
        basket: 'basketState'
      })
    }
  }
</script>
