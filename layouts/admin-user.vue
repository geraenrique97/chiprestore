<template>
    <nuxt />
</template>
<script>
export default {
  name: 'admin-user',
  computed: {
    viewportSize() {
      switch (this.$vuetify.breakpoint.name) {
      case 'xs':
        return true;
      case 'sm':
        return true;
      default:
        return false;
      }
    },
  },
  watch: {
    viewportSize(val) {
      this.$store.commit('app/setDevice', val);
    },
  },
  created() {
    this.$store.commit('app/setDevice', this.viewportSize);
  }
}
</script>
<style scoped>
</style>