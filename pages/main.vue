<template>
  <v-app>
    <v-progress-linear
    :active="loading"
    indeterminate
    fixed
    top
    color="#018786"
    background-opacity="0"
    style="z-index: 1024"
    ></v-progress-linear>
    <sidebar />
    <v-content>
      <nuxt-child />
    </v-content>
    <v-app-bar app :color="viewportSize?'primary':'white'" class="topbar">
      <v-row>
        <v-col class="d-flex justify-content-between">
          <div class="d-flex">
            <v-icon 
            class="appsIcon mr-2 colorWhite" 
            @click.stop="showMenu"
            >apps</v-icon>
            <v-toolbar-title class="colorWhite">Chipre Store</v-toolbar-title>
          </div>
          <v-icon 
          class="colorWhite"
          @click="toggleSearch=!toggleSearch"
          >search</v-icon>
        </v-col>
      </v-row>
     

    </v-app-bar>
    <SearchSidebar 
    :open="toggleSearch" 
    @toggleSearch="toggleSearch=!toggleSearch"/>
  </v-app>
</template>
<script>
import axios from "axios";
import sidebar from '~/components/sidebar.vue'
import { async } from 'q';
import SearchSidebar from "~/components/SearchSidebar.vue";
import firebase from "firebase/app";
export default {
  layout: 'admin-user',
  
  components: {
    sidebar,
    SearchSidebar,
  },
  fetch({store}) {
    store.dispatch('app/getClothes');
  },
  data(){
    return {
      toggleSearch: false, 
    }
  },

  created: function () {
    // this.$router.push({path: '/main/adminProduct'});
    this.$store.commit('app/setDevice', this.viewportSize);
  },
  methods:{
    showMenu(){
      this.$store.commit('app/toggleMenu');
    },
    openSearch(){
      console.log('tendria que emitir');
      this.$emit('toggleSearch');
    },
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
    },
    isAuthenticated() {
      return this.$store.state.app.user !== null
    },
    loading() {
      return this.$store.state.app.loading
    }
  },
  watch:{
    viewportSize(val) {
      this.$store.commit('app/setDevice', val);
    },
    isAuthenticated(val) {
      // if (!this.isAuthenticated) {
      //   this.$router.push({path: '/signIn'})
      // }
    }
  },
  created() {
  //Should be a user controller middleware before that it render
    // if (!this.isAuthenticated) {
    //     this.$router.push({path: '/signIn'})
    //   }

  }
}
</script>
<style>

  @media(min-width: 960px) {
    .appsIcon {
      visibility: hidden;
    };
    .colorWhite {
      color:black!important;
    }
  }
  .colorWhite {
      color:white;
    }
  button:focus {
    outline: none;
  }


</style>