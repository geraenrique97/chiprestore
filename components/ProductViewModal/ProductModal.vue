<template>
  <v-row justify="center">
    <v-dialog
      v-model="opened"
      light
      :max-width="modalWidth"
      persistent>

        <div style=" overflow-x: hidden">
          <v-card class="d-block d-md-flex">
            
            <v-carousel
              :cycle="true"
              delimiter-icon="remove"
              class="m-1"
              style="height: auto"
              >
              <v-carousel-item
                v-for="(item,i) in form.imgURLs"
                :key="i"
                :src="item.includes('http')? item:require(`~/assets/img/${item}`)"
                reverse-transition="fade-transition"
                transition="fade-transition"
                style="height: 100%"
              ></v-carousel-item>
            </v-carousel>

            <div :style="{height: [smallVierport? '':''], overflowY: 'auto'}">
                <v-container>
                  <div >
                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="form.clothe" label="Prenda"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="form.code" label="Codigo"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="form.category" label="Categoria"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="form.description" label="Descripcion"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="form.brand" label="Marca"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field v-model="form.color" label="Color"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-text-field v-model="form.buyPrice" label="Precio de compra"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                          <v-text-field v-model="form.sellPrice" label="Precio de venta"
                          ></v-text-field>
                      </v-col>
                    </v-row>
                  </div>
                  <div>
                    <!-- <v-row>
                      <v-col align-self="right">
                        
                      </v-col>
                    </v-row> -->
                    <v-row>
                      
                      <v-col class="d-flex justify-center">
                        
                        <v-btn 
                          @click="showStock"
                          color="green"
                          text
                          
                          style="color: white"
                          >Ver stock</v-btn>
                      </v-col>
                    </v-row>
                    <v-row>
                       <v-col class="d-flex justify-center">
                        <v-btn
                          color="red"
                          text
                          outlined
                          @click="deleteProduct">
                          Elimiar
                          <v-icon>delete</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      
                      <v-col cols="5">
                        <v-btn 
                        outlined 
                        block
                        color="primary" 
                        @click="closeModal">Cancelar</v-btn>
                      </v-col>
                     
                      <v-col cols="5">
                        <v-btn 
                        block
                        color="primary"
                        @click="saveChange">Guardar</v-btn>
                      </v-col>
                    </v-row>
                  </div>

                </v-container>

            </div>
          </v-card>
        </div>
      <!-- </div> -->
    </v-dialog>
    <StockBottomSheet />
    
  </v-row>
</template>
<script>
import StockBottomSheet from "~/components/ProductViewModal/StockBottomSheet";
export default {
  components: {
    StockBottomSheet
  },
  data() {
    return {
      opened: false,
      form: {
        clothe: null,
        code: null,
        category: null,
        description: null,
        brand: null,
        color: null,
        buyPrice: null,
        sellPrice: null,
        stock: [],
        imgURLs:[]
      },
    }
  }, 
  computed: {
    stateShow() {
      return this.$store.state.app.openedModal
    },
    stateSelect() {
      return this.$store.state.app.selected
    },
    smallVierport() {
      if (this.$store.state.app.smallDevice) return true
      else false;
    },
    modalWidth() {
      if (this.$store.state.app.smallDevice) return '95%'
      else return '70%'
    },
    stock() {
      if (this.$store.state.app.selected) {
        return this.$store.state.app.selected.stock
      } else {
        return null
      }
      
    }
  }, 
  watch:{
    stateShow(val) {
      this.opened = val
    },
    stateSelect(val) {
      if (val != undefined) {
        this.form = {...val};
      };
    },
    stock(val) {
      this.form.stock = [...val]; //because there is a problem when push newStock to form (variable reference)
    },
    form(val) {
      this.updated = true;
    }
  },

  methods :{
    closeModal() {
      this.$store.commit('app/toggleModal');
      
    },
    saveChange(){
      this.$store.dispatch('app/updateProduct', this.form);
      this.closeModal();
    },
    showStock() {
      this.$store.commit('app/toggleStockBottomSheet', true);
    },
    deleteProduct() {
      this.$store.dispatch('app/deleteProduct', this.form.code)
        .then(() => {
          this.closeModal();
          console.log('success removed');
        })
        .catch(()=> console.log('Could not remove it'));
    }

  }
}
</script>