<template>
  <v-navigation-drawer app
  v-model="visible" 
  right 
  fixed="" 
  color="#f8faf9e6"
  temporary>
  <v-list>
    <v-list-item>
      <v-text-field v-model="code" label="Codigo"></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field v-model="clothe" label="Prenda"></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field v-model="brand" label="Marca"></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field v-model="color" label="Color"></v-text-field>
    </v-list-item>
    <v-list-item>
      <v-text-field v-model="size" label="Talle"></v-text-field>
    </v-list-item>
    <v-list-item class="justify-content-center">
      <v-btn 
      block
      elevation="8"
      color="secondary" 
      style="color: white" 
      @click="searchClothes">Buscar</v-btn>
    </v-list-item>
  </v-list>

  

  </v-navigation-drawer>
</template>
<script>
export default {
  props: ['open'],
  data() {
    return {
      visible: this.open,
      code: undefined,
      clothe: undefined,
      brand: undefined,
      color: undefined,
      size: undefined
    }
  },
  methods:{
    searchClothes() {
      let params = {
        code: this.code,
        clothe: this.clothe,
        brand: this.brand,
        color: this.color,
        size: this.size
      }
      this.$store.dispatch('app/searchClothes',params);
    }
  },
  watch: {
    open() {
      this.visible = this.open;
    },
    visible(){
      if (!this.visible) this.$emit('toggleSearch', this.visible);
    }
  }
}
</script>