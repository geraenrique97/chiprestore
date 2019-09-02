<template>
  <div>
    <sidebar />
    <p>Bienvenido</p>
  </div>
</template>
<script>
import sidebar from '~/components/sidebar.vue'
export default {
  layout: 'admin-user',
  components: {
    sidebar
  }
}
</script>
