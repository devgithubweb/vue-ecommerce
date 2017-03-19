<template>
</template>

<script>
import {mapGetters} from 'vuex'
import axios from 'axios'

export default {

  name: 'ProductAdmin',

  data () {
    return {
    };
  },
  computed: {
    ...mapGetters({
      isAdmin: 'isAdminState'
    })
  }
};
</script>

<style lang="css" scoped>
</style>