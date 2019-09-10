<template>
  <v-app >
    <sidebar />
    <v-content>
      <nuxt-child />
    </v-content>
  </v-app>
</template>
<script>
import axios from "axios";
import sidebar from '~/components/sidebar.vue'
import { async } from 'q';

export default {
  layout: 'admin-user',
  components: {
    sidebar
  },
  fetch({store}) {
    store.dispatch('app/getClothes');
  },

  created: function () {
    this.$router.push({path: '/main/admin-product'});
  },
  transitions:'fade-in',
}
</script>
<style>
button:focus {
  outline: none
}


</style>