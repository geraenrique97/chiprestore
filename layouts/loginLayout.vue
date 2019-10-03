<template>
  <div class="d-flex justify-content-center gradiente" >
     <v-progress-linear
    :active="loading"
    indeterminate
    fixed
    top
    color="#018786"
    background-opacity="0"
    style="z-index: 1024"
    ></v-progress-linear>
    <nuxt />
  </div>
</template>
<script>
export default {
  name: 'login',
  computed: {
    loading() {
      return this.$store.state.app.loading
    }
  }
}
</script>
<style >
.gradiente {
    height: -webkit-fill-available; 
    padding: 0px; margin: 0px;

    
    background: rgba(51,105,30,1);
    background: -moz-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(51,105,30,1)), color-stop(40%, rgba(51,105,30,1)), color-stop(100%, rgba(103,201,64,1)));
    background: -webkit-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -o-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: -ms-linear-gradient(-45deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    background: linear-gradient(135deg, rgba(51,105,30,1) 0%, rgba(51,105,30,1) 40%, rgba(103,201,64,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#33691e', endColorstr='#67c940', GradientType=1 );
}
</style>