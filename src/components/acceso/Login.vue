<template>
<!--  <v-app id="login" class="secondary">-->
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm12 md5 lg4>
           
            <v-card class="elevation-12 pa-3 rounded-xl justify-center ma-3">
              <v-card-text>
                <center> 
                   <v-icon size="80" >account_box</v-icon>
                  <v-alert  color="indigo accent-4" class="flex my-4 "  >
                    ACCESO AL SISTEMA
                  </v-alert></center>
                <div class="layout column align-center">
                  <!-- <img src="../../assets/genes.jpeg" alt="Vue Material Admin" width="280" height="180"> -->
                 
                </div>
                <v-form>
                  <v-text-field
                    outlined
                    append-icon="person"
                    name="usuario"
                    label="USUARIO"
                    type="text"
                    v-model="usuario"
                    :error="error"
                    :rules="[rules.required]"/>
                  <v-text-field
                    outlined
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'visibility_off' : 'visibility'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"/>
                </v-form>
                <v-flex class="red--text" v-if="errorM">
                        {{errorM}}
                    </v-flex>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block  color="indigo accent-4" @click="ingresar()" :loading="loading">Acceso</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
<!--      <v-snackbar-->
<!--        v-model="showResult"-->
<!--        :timeout="2000"-->
<!--        top>-->
<!--        {{ result }}-->
<!--      </v-snackbar>-->
    </v-content>
<!--  </v-app>-->
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      datosUsuario:'',
      rol:'',
      users:'',
      usuario: '',
      password: '',
      errorM:null,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    ingresar(){
            let me =this;
            axios.post('usuario/login',{usuario: this.usuario, password: this.password})
            .then(respuesta =>{
            console.log(respuesta)
            console.log(respuesta.data.tokenData)
            return respuesta.data;
            }).then(data=>{

             this.$store.dispatch("guardarToken",data.token);
             this.$router.push({name:'Bienvenida'})
            })
            .catch(error =>{
                console.log(eror);
                this.errorM=null;
                if (error.response.status==404){
                    this.errorM='No existe el usuario o las credenciales son   incorrectas.';
                } else{
                    this.errorM='Ocurrió un error con el servidor.';
                }
            });
    },
  }
}
</script>

<style  lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>