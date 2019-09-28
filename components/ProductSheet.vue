<template>
   <v-row justify="center">
    <v-dialog 
      v-model="openSheet" 
      fullscreen 
      hide-overlay 
      transition="dialog-bottom-transition"
      persistent>

      <v-card>
        <v-toolbar dark color="secondary" class="sticky-top">
          <v-btn icon dark @click="openSheet = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo Producto</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <v-toolbar-items>
             <v-btn dark text @click="createProduct">Guardar</v-btn>
            <!-- <v-btn dark text @click="asyncCall">Guardar</v-btn> -->
          </v-toolbar-items>
        </v-toolbar>
      
        <div class="d-block d-md-flex align-center p-1">
          <v-row :style="{width:smallViewport? '':'100%'}">
            <v-carousel 
            delimiter-icon="remove">
              <v-carousel-item
                v-for="(item,i) in form.imgURLs"
                :key="i"
                :src="item"
                reverse-transition="fade-transition"
                transition="fade-transition">
                <div class="d-flex justify-center">
                  <v-icon style="     font-size: 30px;
                          margin-top: 5px;
                          opacity: 1;
                          color: darkred;"
                          @click="removeImg(i)"> clear</v-icon>
                </div>
              </v-carousel-item>
              <v-carousel-item  
                reverse-transition="fade-transition"
                transition="fade-transition">
                <div class="d-flex justify-content-center" style="height: 100%;">
                  <img 
                  @click="$refs['fileInput'].click()"
                  style="align-self: center"
                  :src="require('~/assets/img/add-icon.png')" alt="">
                </div>
              </v-carousel-item>

              
            </v-carousel>
            <!-- <button class="buttonAddImg" @click="$refs['fileInput'].click()">
                <v-icon>add</v-icon>  
            </button> -->
            
            
          </v-row>

          <input @change="chooseImg($event)" ref="fileInput" type="file" hidden capture/>
          
          <v-card-text :style=" smallViewport? '' : 'height: 590px; overflow-y: auto;'">
            <v-container >

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.clothe" label="Prenda"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.category" label="Categoria"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>

                <v-col cols="12">
                  <v-text-field v-model="form.description" label="Descripcion"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.brand" label="Marca"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.color" label="Color"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="form.buyPrice" label="Precio de compra"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="form.sellPrice" label="Precio de venta"
                    ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="d-block d-md-flex">
                <v-col cols="12" sm="12" md="6">
                  <v-row justify="center">
                    <v-col cols="6">
                      <v-text-field v-model="newStock.size" label="Talle"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="newStock.quantity" label="Cantidad"></v-text-field>
                    </v-col>
                  
                  </v-row>

                  <v-row justify="center">
                    <v-col cols="6">
                      <v-btn @click="addStock">Agregar</v-btn>
                    </v-col>
                  </v-row>
                </v-col>

                <v-row justify="center">
                  <v-col cols="12">
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
              </v-row>
            </v-container>
          </v-card-text>


        </div>
       
      </v-card>
    </v-dialog>
    <!-- <Alert /> -->
   
  </v-row>
</template>
<script>
import Alert from "~/components/Alert.vue";
export default {
  components: {
    Alert
  },
  data() {
    return {
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
        imgURLs:[]
      },
      openSheet: false,
      newStock: {
        size: null,
        quantity: null
      },
      files: [],
      resultSnackbar: null,
      showSnackbar: true
    }
  },
  computed: {
    stateSheet() {
      return this.$store.state.app.showProductRegister
    },
    smallViewport() {
      if (this.$store.state.app.smallDevice) return true
      else false;
    },
  },
  watch: {
    stateSheet(val) {
      if (this.stateSheet) this.openSheet = true;
    },
    openSheet(val) {
      if (!this.openSheet) this.$store.commit('app/toggleProductRegisterSheet');
    }
  },
  methods: {
    addStock() {
      const newStock = {...this.newStock};
      this.form.stock.push(newStock);
    },
    removeStock() {
      return true;
    },
    chooseImg(event) {
      const img = event.target.files[0]
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.form.imgURLs.push(fileReader.result);
      });
      fileReader.readAsDataURL(img);
      this.files.push(img);
    },
    uploadImg() {
    },
    removeImg(index) {
      this.form.imgURLs.splice(index, 1);
      this.files.splice(index, 1);
    },
    createProduct() {
      this.$store.dispatch('app/createProduct',{ ...this.form })
        .then(res => {
          console.log('successfull');
          this.clearForm();
          this.openSheet = false;
        })
        .catch( err => {
          console.log('reject in productSheet');
          console.log(err)});
    },
    clearForm() {
      this.form = {
        clothe: null,
        code: null,
        category: null,
        description: null,
        brand: null,
        color: null,
        buyPrice: null,
        sellPrice: null,
        stock:[],
        imgURLs:[]
      }
    },
    validForm() {

    }
  }
}
</script>
<style>
.buttonAddImg {
    position: fixed;
    margin-top: -35px;
    /* opacity: 0.7; */
    background-color: white;
    color: darkgreen;
    font-size: 20px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    height: 35px;
    width: 65px;
   
    box-shadow: none;
    
};
@media(max-width: 450px) {
   .buttonAddImg {
      position: sticky
   }
}
</style>