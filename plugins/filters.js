import Vue from "vue";
Vue.filter( 'capitalize', function(value) {
  if (!value) return '';
  let capitalize = value[0].toUpperCase() + value.slice(1, value.length);
  return capitalize;
});

Vue.filter('UpperCase', function(value) {
  return value.toUpperCase()
})
