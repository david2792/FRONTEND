<template>

  <v-form v-model="valid" ref="form" lazy-validation>
    <v-card>
      <v-card-title>
        <span class="headline">Registro Vehiculo</span>
      </v-card-title>
      <v-card-text>
     <v-container grid-list-md>
           <v-layout wrap>
           <v-layout row wrap>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-autocomplete
             outlined
                required
                :items="vCliente.clientes"
                :item-text="item=>`${item.CodigoCliente} ${item.RazonSocial}`"
                item-value="CodigoCliente"
                label="Cliente"
                :rules="clienteRules"
                v-model="vRecepcion.Recepcion.CodigoCliente"
            ></v-autocomplete>  
          </v-flex>
           <v-flex xs12 sm8 md4 lg4 xl4>
               <v-btn outlined class="ma-2" color="primary" dark @click="abrirBusqueda()">Buscar
                <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
           </v-flex>
            <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field  :rules="chapaRules" outlined v-model="vRecepcion.Recepcion.codigo" label="Codigo Vehiculo"></v-text-field>
          </v-flex>
            <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field  :rules="chapaRules" outlined v-model="vRecepcion.Recepcion.chapa" label="Chapa Vehiculo"></v-text-field>
          </v-flex>
           <v-flex xs12 sm4 md4 lg4 xl4>
            <v-autocomplete
             outlined
                required
                :items="vNivel.niveles"
                :item-text="item=>`${item.codigonivelcombustible} ${item.descripcion}`"
                item-value="codigonivelcombustible"
                label="Nivel Combustible"
                :rules="clienteRules"
                v-model="vNivel.niveles.codigonivelcombustible"
            ></v-autocomplete> 
          </v-flex>
           <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field  :rules="chapaRules" outlined v-model="vRecepcion.Recepcion.km" label="Km de Entrada"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg8 xl8>
            <v-text-field  :rules="chapaRules" outlined v-model="vRecepcion.Recepcion.observaciones" label="Observacion"></v-text-field>
          </v-flex>
        </v-layout>
     </v-layout>
          </v-container>
      </v-card-text>
      <v-card-actions>
      <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" dark color="red accent-3" @click="modal=!modal, limpiar()">
          Cancelar
          <v-icon dark right>mdi-cancel</v-icon>
        </v-btn>
        <v-btn class="mb-2"  color="blue darken-1" @click="guardar()">
          Guardar
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-card-actions>
       <v-flex xs12 sm12 md12 xl12 v-if="notificacion==1">
           <v-alert 
            
            dismissible
            close-icon="mdi-delete"
            color="light-blue accent-4"
            elevation="2"
            type="info"
            outlined
           >
      {{this.$store.state.vVehiculo.mensaje}}
    </v-alert>
         </v-flex>
    </v-card>
   <v-dialog v-model="busqueda" max-width="1000px">
           <v-card>
            <v-card-title>
              <span class="headline">Seleccione un Vehiculo</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm12 md12 lg12 xl12>
                    <v-text-field v-model="texto" class="text-xs-center" append-icon="search"
                                  label="Búsqueda "></v-text-field>
                    <template>
                      <v-data-table
                          :headers="cabeceraArticulos"
                          :items="vVehiculo.vehiculos"
                         
                      >
                       <template v-slot:[`item.seleccionar`]="{ item }">
                        <v-btn
                                    class="mx-2"
                                    fab
                                    dark
                                    small
                                    color="pink darken-4"
                                       @click="agregarDetalle(item)"
                                >
                                    <v-icon dark>mdi-pencil</v-icon>
                                </v-btn>
                        </template>
                     <template v-slot:items>
                        
                           <td>{{ props.item.codigo }}</td>
                          <td>{{ props.item.chapa }}</td>
                          <td>{{ props.item.marca }}</td>
                          <td>{{ props.item.modelo }}</td>
                          <td>{{ props.item.transmicion }}</td>
                          <td>{{ props.item.color }}</td>
                          <td>{{ props.item.chasis }}</td>
                        </template>
                      </v-data-table>
                    </template>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-card>
        <v-card-actions>
           <v-spacer></v-spacer>
          <v-btn color="blue darken-1"  @click="cerrarBusqueda()">Cancelar</v-btn>
        </v-card-actions>
   </v-dialog>
  </v-form>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import axios from 'axios';
export default {
  data() {
    return {
      busqueda:false,
      articulos:[],
      texto:'',
      cabeceraArticulos: [
        { text: 'Seleccionar', value: 'seleccionar', sortable: false},
         { text: 'CODIGO',value: 'codigo', sortable: false},
        { text: 'CHAPA',value: 'chapa', sortable: false },
        { text: 'MARCA',value: 'marca', sortable: false },
        { text: 'MODELO',value: 'modelo', sortable: true },
        { text: 'TRACCION',value: 'transmicion', sortable: true},
        { text: 'COLOR',value: 'color', sortable: false},
        { text: 'OBSERVACION', value: 'chasis', sortable: false},
      ],
      busqueda: false,
      valid: true,
      mensaje:'',
      notificacion:0,
      token_configuration: [],
    clienteRules: [(v) => !!v || "Cliente requerido"],
    marcaRules: [(v) => !!v || "Marca requerido"],
    modeloRules: [(v) => !!v || "Modelo requerido"],
    transmisionRules: [(v) => !!v || "Transmicion requerido"],
    colorRules: [(v) => !!v || "Color requerido"],
    chapaRules: [(v) => !!v || "chapa requerido"],
    observacionRules: [(v) => !!v || "Observacion requerido"],
    chasisRules: [(v) => !!v || "Chasis requerido"],
    };
  },

  // name: 'FormularioProveedor',

  mounted() {
    let header = { "auth-token": this.$store.state.token };
    this.token_configuration = { headers: header };
    this.$store.dispatch("getTransmiciones", this.token_configuration);
    this.$store.dispatch("getClientes", this.token_configuration);
    this.$store.dispatch("getMarcas", this.token_configuration);
    this.$store.dispatch("getColores", this.token_configuration);
  },
  computed: {
    ...mapState(["vCliente","vNivel", "vRecepcion","vVehiculo"]),
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
      ...mapGetters(["setVehiculo"]),
    },
  },

  methods: {
        agregarDetalle(data){
        this.errorArticulo=null;
        this.vRecepcion.Recepcion.codigo= data.codigo;
        this.vRecepcion.Recepcion.chapa=data.chapa;
        this.busqueda=false
    },
    listarVehiculo(){
      let me=this;
      let header={"auth-token" : this.$store.state.token};
      let configuracion= {headers : header};
       let cliente = this.vRecepcion.Recepcion.CodigoCliente;
       console.log(cliente)
      axios.get('rvehiculo/list/'+cliente,configuracion).then(function (response){
        me.articulos=response.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    abrirBusqueda()
    {
      this.busqueda=true
      this.$store.dispatch("getBuscador")
    },
    cerrarBusqueda()
    {
      this.busqueda=false
    },
    createFreshProveedor() {
      return {
            CodigoCliente:"",
            codigomarca: "",
            codigomodelo:  "",
            codiogotransmision: "",
            codigocolor: "",
            chapa: "",
            observacion: "",
            chasis: "",
      };
    },
    capturarcodigo(texto) {
      const cod = texto.split(" ")[0];
      return cod;
    },
    reset () {
        this.$refs.form.reset()
      },
    limpiar() {
     this.vVehiculo.Vehiculo = this.createFreshProveedor();
     this.reset ();
      this.notificacion=0;
    },
    enviarCliente(){
         this.$store
        .dispatch("getBuscador", this.token_configuration)
        .then(this.registroExitoso(), this.regitroError());
    },
    guardar() {

      if(this.$refs.form.validate()){
          // this.$store.state.vVehiculo.Vehiculo.codigomodelo =this.capturarcodigo(this.vVehiculo.Vehiculo.codigomodelo)
          // this.$store.state.vVehiculo.Vehiculo.codigomarca =this.capturarcodigo(this.vVehiculo.Vehiculo.codigomarca)
          // this.$store.state.vVehiculo.Vehiculo.codigotransmision =this.capturarcodigo(this.vVehiculo.Vehiculo.codigotransmision)
          // this.$store.state.vVehiculo.Vehiculo.codigocolor =this.capturarcodigo(this.vVehiculo.Vehiculo.codigocolor)
          // console.log("codigo " +this.$store.state.vVehiculo.codigomarca)
         if(this.$store.state.vVehiculo.editar_item == false){
            this.$store
        .dispatch("guardarVehiculo", this.token_configuration)
        .then(this.registroExitoso, this.regitroError);
        console.log("soy el mesaje de guardar ")
       // this.$store.state.vCliente.editar_item =false

        console.log(" voy a guardar")
       // this.limpiar();
         }else{
        this.$store
        .dispatch("guardarVehiculo", this.token_configuration)
        .then(this.registroExitoso(), this.regitroError());
       //  this.$store.state.vCliente.editar_item =false
          console.log("voy a modificar")
        // this.limpiar();
         }
      
      }
        
    },
    registroExitoso(result) {
      console.log("La operación fue correcta:", result);
       this.vVehiculo.Vehiculo = this.createFreshProveedor();
      this.notificacion=1
    },
    regitroError(error) {
      console.log("Hubo un error al realizar la operación", error);
    },
  },
  // nuevo codigo
};
</script>