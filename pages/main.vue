<template>
  <v-app >
    <sidebar />
    <v-content>
      <nuxt-child />
    </v-content>
    <v-app-bar app class="topbar">
      <v-row>
        <v-col class="justify-content-end">
        <v-icon @click.stop="showMenu">apps</v-icon>
        </v-col>
      </v-row>
    </v-app-bar>
    
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
  data(){
    return {
    }
  },

  created: function () {
    this.$router.push({path: '/main/admin-product'});
    this.$store.commit('app/setDevice', this.viewportSize);
  },
  methods:{
    showMenu(){
      this.$store.commit('app/toggleMenu');
    }
  },
  transitions:'fade-in',
  computed: {
    viewportSize() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return true;
      case 'sm':
        return true;
      default:
        return false;
      }
    }
  },
  watch:{
    viewportSize(val) {
      console.log(this.viewportSize);
      this.$store.commit('app/setDevice', val);
    }
  },
}
</script>
<style>
  button:focus {
    outline: none
  }
  @media(min-width: 960px) {
    .topbar {
      display: none;
    }
  }


</style>