<template>
  <v-row justify="center">
    <v-dialog
    v-model="opened"
    persistent
    light
    >
      <!-- <v-carousel>
        <v-carousel-item></v-carousel-item>
      </v-carousel> -->
      <v-card>
        <v-card-title>Producto</v-card-title>
        <v-card-actions>
          <v-btn @click="closeModal">Cancelar</v-btn>
          <v-btn>Acerptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      opened: false,
    }
  }, computed: {
    state() {
      return this.$store.state.app.openedModal
    }
  }, watch:{
    state: function(val) {
      this.opened = this.state
    }
  }, methods :{
    closeModal() {
      this.$store.commit('app/toggleModal');
    }
  }

}
</script>