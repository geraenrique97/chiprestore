<template>
 <v-navigation-drawer app
  class="gradiente side" 
  left 
  :permanent="!smallDevice"
  :temporary="smallDevice"
  v-model="auxShow"
 >
    
    <div class="d-flex justify-content-center mt-3 mb-2">
      <v-img 
      :src="require('assets/img/logo.jpg')" 
      max-width="40%" 
      class="elevation-10"
      style="border-radius: 50%"></v-img>

    </div>
    <v-list :rounded="true" :dark="true" :shaped="true">
      <v-list-item v-for="(item, i) in items" :key="i" link>
          <v-icon class="mr-4">{{item.icon}}</v-icon>
        <v-list-item-title>{{item.title|capitalize}}</v-list-item-title>

      </v-list-item>

      
      
    </v-list>

    <!-- <v-divider></v-divider> -->
    <v-subheader>{{user}}</v-subheader>
    <v-list-item link class="d-flex" @click="logout">
      <v-icon class="mr-4">exit_to_app</v-icon>
     
      Cerrar sesion
    </v-list-item>
  </v-navigation-drawer>

</template>
<script>
export default {
  name: 'sidebar',
  data () {
    return {
      items: [
        {title: 'resumen', icon: 'dashboard'},
        {title: 'sucursales', icon: 'home'},
        {title: 'ventas', icon: 'shopping_cart'},
        {title: 'administrar', icon: 'assignment'},
        {title: 'tienda', icon: 'local_mall'},
        {title: 'movimientos', icon: 'local_shipping'},
        {title: 'empleados', icon: 'people'},
      ],
      user: 'Federico Samaniego',
      auxShow: undefined,
    }
  },
  computed:{
    smallDevice() {
      if (this.$store.state.app.smallDevice) return true
      else return false;
    },
    showMenu() { return this.$store.state.app.showMenu }
  },
  watch: {
    auxShow(val) {
      if (!val) this.$store.commit('app/toggleMenu');
    },
    showMenu(val) {
      if (val) this.auxShow = true;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('app/logout')
        .then(res => {
          console.log(res);
          if (res) this.$router.push('/signIn');
        })
    }
  },
  created() {
    this.auxShow = this.showMenu
  }
}
</script>

<style scoped>
  .gradiente {
    /* overflow-y: auto; */
    background: rgba(51,105,30,1);
    background: -moz-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(51,105,30,1)), color-stop(40%, rgba(51,105,30,1)), color-stop(100%, rgba(103,201,64,1)));
    background: -webkit-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -o-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -ms-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: linear-gradient(135deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33691e', endColorstr='#67c940', GradientType=1 );
  };
  .side {
    height: auto;
  }
</style>