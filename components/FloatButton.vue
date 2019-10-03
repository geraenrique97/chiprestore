<template>
   <v-btn
      @click="toggleProductRegisterSheet"
      fixed
      fab
      bottom
      right
      color="secondary"
    >
      <v-icon> add</v-icon>
    </v-btn>
</template>
<script>
export default {
  methods: {
    toggleProductRegisterSheet() {
      this.$store.commit('app/toggleProductRegisterSheet');
    }
  }
}
</script>
<style >
 /* secondary = '#A1887F' */
 /* primary = '#33691E' */
.addBtn {
  background-color: #A1887F!important;
  color: white!important
}

</style>