<template>
  <v-row justify="center">
    <v-dialog
      v-model="opened"
      persistent
      light
      :max-width="modalWidth"
    >
      <!-- <div 
      style="overflow: hidden"> -->
        <!-- <v-carousel
          :cycle="true"
          delimiter-icon="remove"
          height="500px"
          >
          <v-carousel-item
            v-for="(item,i) in form.img"
            :key="i"
            :src="require(`~/assets/img/${item}`)"
            reverse-transition="fade-transition"
            transition="fade-transition"
          ></v-carousel-item>
        </v-carousel> -->

        <div 
          
          style=" overflow-x: hidden">
          <v-card class="d-block d-md-flex">
            
            <v-carousel
              :cycle="true"
              delimiter-icon="remove"
              height="500px"
              >
              <v-carousel-item
                v-for="(item,i) in form.img"
                :key="i"
                :src="require(`~/assets/img/${item}`)"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
            </v-carousel>

            <div :style="{height: [smallVierport? '':'500px'], overflowY: 'auto'}">
              <v-card-text>
                <v-container>

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

                  <v-row>
                    <v-col cols="6">
                      <v-btn 
                        @click="openSheet = !openSheet"
                        color="green"
                        >Ver stock</v-btn>
                    </v-col>
                  </v-row>

                </v-container>
              </v-card-text>

                <v-bottom-sheet inset v-model="openSheet">
                  <v-sheet class="text-center">
                    <v-row justify="center">
                      <v-col cols="3">
                        <v-text-field v-model="newStock.size" label="Talle"></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field v-model="newStock.quantity" label="Cantidad"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="8">
                        <v-simple-table>
                          <thead>
                            <tr>
                              <th>Talle</th>
                              <th>Cantidad</th>
                              <th>
                                <v-icon>delete</v-icon>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item,i) in form.stock" :key="i">
                              <td>{{ item.size }}</td>
                              <td>{{ item.quantity }}</td>
                              <td><v-checkbox></v-checkbox></td>
                            </tr>
                          </tbody>
                        </v-simple-table>
                      </v-col>
                    </v-row>
                    <v-row justify="center" >
                      <v-btn class="mb-2 mr-2"
                        @click="openSheet = false"
                        >Cerrar</v-btn>
                      <v-btn class="mb-2"
                        @click="addStock"
                        >Guardar</v-btn>
                    </v-row>

                  </v-sheet>
                </v-bottom-sheet>
              
              <v-card-actions>
                <v-container>
                  <v-row justify="center">
                    <v-btn @click="closeModal">Cancelar</v-btn>
                    <v-btn @click="saveChange">Guardar</v-btn>
                  </v-row>
                </v-container>
              </v-card-actions>
            </div>
          </v-card>
        </div>
      <!-- </div> -->
    </v-dialog>
  </v-row>
</template>
<script>
export default {
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
        stock:[],
        img:[]
      },
      openSheet: false,
      newStock: {
        size: null,
        quantity: null,
      },
      updatedStock:[],
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
    }
  }, 
  watch:{
    stateShow(val) {
      this.opened = val
    },
    stateSelect(val) {
       if (val != undefined) {
         this.form = {...val};
         this.form.stock = [...val.stock]; //because there is a problem when push newStock to form (variable reference)
      
      };
    }
  },

  methods :{
    closeModal() {
      this.$store.commit('app/toggleModal');
    },
    saveChange(){
      this.$store.dispatch('app/saveProductChanges', this.form);
      this.closeModal();
    },
    addStock() {
      this.form.stock.push(this.newStock);
      this.openSheet = !this.openSheet;
    },
    removeStock() {
      return true;
    }
  },


}
</script>