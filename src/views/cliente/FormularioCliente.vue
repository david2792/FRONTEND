<template >
  <v-card>
    <v-card-title>
      <span class="headline">Registro Cliente</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm12 md12>
            <v-text-field v-model="vCliente.Cliente.RazonSocial" label="Razon Social"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field v-model="vCliente.Cliente.Ruc" label="RUC"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field v-model="vCliente.Cliente.Cedula" label="Número Documento"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field v-model="vCliente.Cliente.Direccion" label="Dirección"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field v-model="vCliente.Cliente.Telefono" label="Teléfono"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-text-field v-model="vCliente.Cliente.Email" label="Email"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6>
            <v-autocomplete
              :items="ciudad.Ciudades"
              :item-text="item=>`${item.CodigoCiudad} ${item.Ciudad}`"
              :item-value="item=>`${item.CodigoCiudad} ${item.Ciudad}`"
              label="Ciudad"
              v-model="vCliente.Cliente.Ciudades"
            >
         
            </v-autocomplete>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn class="mb-2" dark color="red accent-3" @click="modal=!modal">
          Cancelar
     <v-icon dark right>mdi-cancel</v-icon></v-btn>
      <v-btn color="blue darken-1" @click="guardar()" >Guardar</v-btn>
    </v-card-actions>
  </v-card>

</template>
<script>
import { mapGetters,mapState } from "vuex";
export default {
  data() {
    return {
     // Cliente: this.createFreshCliente(),
      token_configuration: [],
    };
   
  },
  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getCiudades", this.token_configuration);
  },
  computed: {
    ...mapState(["ciudad","vCliente"]),
     modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
  },

  methods: {
   
       capturarcodigo(texto){
       const cod = texto.split(' ')[0]
       return cod
    },
 guardar(){
   console.log("Hola guardar", this.$store.state.VCliente.Cliente);
      if(this.$store.state.VCliente.edit){
        this.$store.dispatch("EditarCliente", this.$store.state.VCliente.Cliente)
      }else{
        this.Cliente.Ciudad =this.capturarcodigo(this.Cliente.Ciudades)
        console.log("b "+this.Cliente.Ciudades);
        this.Cliente.configuracion=this.token_configuration;
        this.$store
        .dispatch("insertCliente",this.Cliente)
        .then((result)=>{
          this.$store.dispatch("getClientes",this.token_configuration);
          this.Cliente=this.createFreshCliente();
      
    })
    .catch((err)=>{
      console.log("error cliente")
    })
      }
 
  },
  },
 
};
</script>