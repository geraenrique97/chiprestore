<template>
  <v-bottom-sheet inset v-model="openSheet">
      <v-sheet class="text-center">
        <v-container>
          <v-row >
            <v-col style="text-align: right">
              <v-icon size="xx-large" color="primary" @click="openSheet = false">clear</v-icon>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="2">
              <v-text-field v-model="newLine.size" label="Talle"></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field v-model="newLine.quantity" label="Cantidad"></v-text-field>
            </v-col>
            <v-col cols="1" align-self="center">
              <v-btn rounded small color="primary">
                <v-icon @click="addLine">add</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-simple-table>
                <thead style="text-align-last: center">
                  <tr>
                    <th>Talle</th>
                    <th>Cantidad</th>
                    <th>Eliminar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in lines" :key="i">
                    <td>{{ item.size | UpperCase }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>
                      <v-icon @click="lines.splice(i, 1)">delete</v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row justify="center" >
            <!-- <v-btn 
            class="mb-2 mr-2"
            outlined
            color="secondary"
            @click="openSheet = false"
            >Cancelar</v-btn> -->
            <v-col cols="6">
              <v-btn 
              color="primary"
              block
              rounded
              class="mb-2"
              @click="updateStock"
              >Actualizar</v-btn>
            </v-col>
            
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
</template>
<script>
export default {
  data() {
    return {
      openSheet: false,
      lines: [],
      newLine: {
        size: null,
        quantity: null
      },


    }
  },
  computed: {
    initialStock() {
      const product = this.$store.state.app.selected
      if (product != null) {
        return product.stock
      } else {
        return []
      }
      
    },
    showStockBottomSheet() {
      return this.$store.state.app.showStockBottomSheet
    }
  },
  watch: {
    openSheet(val) {
      if (!val) {
        this.$store.commit('app/toggleStockBottomSheet', false);
      }
    },
    showStockBottomSheet(val) {
      if (val) {
        this.openSheet = true;
      }
    },
    initialStock(val) {
      if (val != undefined) {
        this.lines = [...val]
      }
    }
  },
  methods: {
    updateStock() {
      this.$store.commit('app/updateSelectedStock', this.lines);
      this.openSheet = false;
    },
    addLine() {
      this.lines.push({...this.newLine});
      this.newLine.size = null;
      this.newLine.quantity = null;
    },
    removeStock(index) {
      this.lines.splice(index, 1);
    }
  }
}
</script>