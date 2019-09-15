<template>
  <v-container fluid
  >
  
    <!-- Resultados de la busqueda o todos -->
    <div class="row">
        <div class="col">
            <p style="font-size: 12px; color: darkgray; margin: 0px">Mostrando añadidos recientemente</p>
        </div>
    </div>

    <div class="card-columns">
        <v-card class="card mt-2" v-for="product in clothes" :key="product.code">
            <v-img :src="require(`~/assets/img/${product.img[0]}`)" ></v-img>
            <v-card-text>{{product.clothe +' '+ product.brand +' $' + product.sellPrice}}</v-card-text>
            <v-card-actions>
                <v-btn 
                color="#33691E" 
                style="color: white"
                @click="openModal(product)"
                >Ver mas</v-btn>
            </v-card-actions>
        </v-card>        
    </div>

    <FloatButton />
    
    <ProductModal />
    <ProductSheet />
  
  </v-container>
</template>
<script>
import FloatButton from '@/components/FloatButton.vue'
import ProductModal from "~/components/ProductModal.vue"
import ProductSheet from "~/components/ProductSheet.vue";

export default {
  name: 'products',
  components:{
    FloatButton,
    ProductModal,
    ProductSheet
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
          hideme: false
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

</style>