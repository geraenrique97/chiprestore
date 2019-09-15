// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
  theme: {
    light: true,  //you don't actually need this line as it's for default
    themes: {
        light: {
            primary: '#b71c1c',
        }
    }
}

})