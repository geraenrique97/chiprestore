<template>
  <v-container fluid >
    <div v-if="!loading">
      <!-- Resultados de la busqueda o todos -->
      <div class="row" v-if="showedInfo">
          <div class="col">
              <p style="font-size: 12px; color: darkgray; margin: 0px">Mostrando añadidos recientemente</p>
          </div>
      </div>

      <div class="card-columns">
          <v-card class="card mt-2" v-for="product in clothes" :key="product.code">
              <v-img 
              v-if="product.imgURLs.length != 0"
              :src="product.imgURLs[0].includes('https')? product.imgURLs[0]:require(`~/assets/img/${product.imgURLs[0]}`)" 
              ></v-img>
              <v-card-text>{{product.clothe +' '+ product.brand +' $' + product.sellPrice}}</v-card-text>
              <v-card-actions>
                  <v-btn 
                  block
                  text
                  color="primary" 
                  style="color: white"
                  retain-focus-on-click
                  @click="openModal(product)"
                  >Ver mas</v-btn>
              </v-card-actions>
          </v-card>        
      </div>
    </div>

    <FloatButton />
    
    <ProductModal />
    <ProductSheet />
    <Alert />
  
  </v-container>
</template>
<script>
import FloatButton from '~/components/FloatButton.vue'
import ProductModal from "~/components/ProductViewModal/ProductModal"
import ProductSheet from "~/components/ProductSheet"
import Alert from "~/components/Alert.vue";

export default {
  name: 'products',
  middleware: 'userAuth',
  components:{
    FloatButton,
    ProductModal,
    ProductSheet,
    Alert
  },
  head(){
    return {
        title: 'Administracion'
    }
  },
  data() {
      return {
          itemsFiltro: [{id:'Código'}, {id:'Prenda'}, {id:'Marca'},{id: 'Color'}, {id: 'Talle'}],
           dialog: false,
      }
  },
  methods:{
    imprimir(value){
      const evento = this.$emit('toggle-search');
    },
    openModal(product) {
      this.$store.commit('app/selectProduct', product);
      this.$store.commit('app/toggleModal');
    }
  },
  computed:{
    clothes() {
      if (this.$store.state.app.searchResult !== null) {
        return this.$store.state.app.searchResult
      } else {
        return this.$store.state.app.allClothes
      }
    },
    showedInfo() {
      if (this.$store.state.app.searchResult !== null) {
        return false
      } else {
        return true
      }
    },
    loading() {
      if (this.$store.state.app.loading) {
        return true
      } else {
        return false
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
 };
button:focus{
  outline: none!important
}

</style>