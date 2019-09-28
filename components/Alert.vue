<template>
<div class="d-flex justify-center">
  <v-snackbar 
   
    v-model="value"
    bottom
    :color="type"
    :timeout="type == 'error'? 2000: 0"
    
    >
    <!-- <v-icon></v-icon> -->
    {{msg}}
    <v-btn 
    v-if="type == 'info'" 
    @click="value = false"
    color="black"
    text
    >Aceptar</v-btn>
  </v-snackbar>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value: false
    }
  },
  
  computed: {
    visible() {
      return this.$store.state.app.alert.visible
    },
    type() {
      return this.$store.state.app.alert.type
    },
    msg() {
      return this.$store.state.app.alert.msg
    }
  },
  watch: {
    visible(val) {
      if (val) this.value = val;
    },
    value(val) {
      if (!val) this.$store.commit('app/clearAlert');
    },
  },
}
</script>