<template>
  <div class="container d-flex justify-content-center align-self-center">
    <div class="jumbotron container-login">
      <div class="d-flex justify-content-center">
        <img src="~assets/img/logo.jpg" class="img-logo" alt="logo" 
        style="position: sticky; margin-top: -100px;">
      </div>
      <div class="row">
        <div class="col">
           <v-text-field
            label="Usuario"
            v-model="user"
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <v-text-field label="Contraseña" 
          v-model="password"
          :type="!visible? 'password': 'text'"/>
        </div>
      </div>
       <div class="d-flex justify-content-center mt-3">
        <v-btn style="
        background-color: darkslategrey;
        color: white;
        width: 100%;" 
        v-on:click="login()"
       >Ingresar</v-btn>
      </div>
      <div class="alert alert-danger d-flex justify-content-center mt-2 mb-0 p-1" v-if="invalid" role="alert" >
        
        <p style="font-size: 13px; margin: 0px; align-self: center;"> Usuario y/o contraseña incorrecto/s </p>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  layout: 'login',
  data () {
    return {
      invalid: false,
      visible: false,
      user:'',
      password: undefined

    }
  },
  methods:{
    login() {
      this.invalid=!this.invalid;
      // return axios.post('', { user: this.user, password: this.password})
      return axios.get('https://chiprestore19.firebaseio.com/prendas.json')
        .then((resp) => {
          console.log(resp);
          this.$router.push({path:'/main'});
          })
        .catch(error => alert(error));
      
    }
  }
}
</script>
<style scoped>
.img-logo {
    width: 85px;
    height: 50%;
    margin-top: 10px;
    border-radius: 45px;
    border-top-left-radius: 45px;
    border-top-right-radius: 45px;
    border-bottom-right-radius: 45px;
    border-bottom-left-radius: 45px;
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, .56), 0 4px 25px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);
}


.container-login {
    box-shadow: 0 16px 38px -12px rgba(0, 0, 0, .56), 0 4px 25px 0 rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);
    background-color: whitesmoke;
    width: 30%
}
@media(max-width:450px){
    .container-login {
        width: 90%;
    }
    .img-logo {
        position: sticky;
    }
}

</style>