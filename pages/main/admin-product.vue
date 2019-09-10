<template>
  <div class="container" 
  style="overflow: auto;">
  
    <nav 
    class="navbar sticky-top navbar-light bg-light align-content-center justify-content-center" 
    >
      <form>
          <v-row justify="end">
            <!-- <v-col  cols="4">
              <v-select  
              label="Filtro" 
              :items="itemsFiltro"
              item-value="id"
              item-text="id"
              attach
              :dark="false"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field label="Busqueda"           
              ></v-text-field>
            </v-col> -->
            <v-col cols="2">
              <v-icon v-on:click="toggleSearch=!toggleSearch">
              <!-- <v-icon v-on:click="openSearch"> -->
              search
              </v-icon>
            </v-col>
          </v-row>
          
      </form>
    </nav>

    <!-- Resultados de la busqueda o todos -->
    <div class="row">
        <div class="col">
            <p style="font-size: 12px; color: darkgray; margin: 0px">Mostrando añadidos recientemente</p>
        </div>
    </div>

    <div class="card-columns">
        <v-card class="card mt-2" v-for="prenda in clothes" :key="prenda.codigo">
            <v-img :src="require(`~/assets/img/${prenda.img[0]}`)" ></v-img>
            <v-card-text>{{prenda.nombre +' '+ prenda.marca +' $' + prenda.pVenta}}</v-card-text>
            <v-card-actions>
                <v-btn color="#33691E" style="color: white">Ver mas</v-btn>
            </v-card-actions>
        </v-card>        
    </div>

    <FloatButton />
    <SearchSidebar 
    :open="toggleSearch" 
    v-on:toggleSearch="toggleSearch=!toggleSearch"/>
    

  </div>
</template>
<script>
import SearchSidebar from "~/components/SearchSidebar.vue";
import FloatButton from '@/components/FloatButton.vue'

export default {
  name: 'products',
  components:{
    FloatButton,
    SearchSidebar
  },
  head(){
    return {
        title: 'Administracion'
    }
  },
  data() {
      return {
          toggleSearch: false, 
          prendas: this.$store.state.app.allClothes,
          itemsFiltro: [{id:'Código'}, {id:'Prenda'}, {id:'Marca'},{id: 'Color'}, {id: 'Talle'}]
      }
  },
  created: function() {
      // this.$store.dispatch('app/setClothes',Object.values(PRENDAS));

  },
  methods:{
    openSearch(){
      console.log('tendria que emitir');
      this.$emit('toggleSearch');
    },
    imprimir(value){
      const evento = this.$emit('toggle-search');
      console.log('hola');
    }
  },
  computed:{
    clothes() {
      if (this.$store.state.app.searchResult !== null) {
        return this.$store.state.app.searchResult
      } else {
        return this.$store.state.app.allClothes
      }
    }
  }

}

</script>
<style >
@media (min-width: 1000px){
    .card-columns {
        column-count: 4!important;
    }
 }
 .navbar {
    padding:0!important; 
    padding-left:10px; 
    padding-right: 10px;
    padding-top: 5px; 
    top: 5px; 
    z-index: 1!important; 
    height: 4rem; 
    width: -webkit-fill-available; 
    /* justify-content: space-between; */
    background-color: darkgray;
    opacity: 0.90;
    border-radius: 5px;
}
  /* .navbar a {
  align-items: center;
  } */
</style>