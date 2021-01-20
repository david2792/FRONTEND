<template>   
    <v-card>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          color="red"
        ></v-text-field>
        <v-data-table
        :headers="headers"
        :items="vProducto.productos"
        :search="search"
        id="cabecera"
        class="elevation-4"
      >
      <template v-slot:[`item.opcion`]="{ item }">
       <v-btn
                class="mx-2"
                fab
                dark
                small
                color="pink darken-4"
                @click="editItem(item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
      </template>
        <template v-slot:items>
          <td>{{ props.item.CodigoProducto }}</td>
          <td>{{ props.item.CodigoBarra }}</td>
          <td>{{ props.item.Descripcion }}</td>
          <td>{{ props.item.PrecioCompra }}</td>
          <td>{{props.item.PrecioVentaMinorista}}</td>
          <td>{{ props.item.StockActual }}</td>
          <td>{{ props.item.StockMinimo }}</td>
          <td>{{ props.item.Marca}}</td>
          <td>{{ props.item.Categoria}}</td>
          <td>{{ props.item.Impuesto}}</td>
          <td>{{ props.item.Deposito}}</td>
      <td></td>

        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-card>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return{
            search: "",
            token_configuration: [],
      headers: [
         { text: "Opciones", value: "opcion", sortable: false,class:"primary subtitle-1 text-uppercase " },
        { text: "Codigo", value: "CodigoProducto", sortable: true,class:"primary subtitle-1 text-uppercase "  },
        { text: "C. de Barra", value: "CodigoBarra", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        { text: "Descripcion", value: "Descripcion", sortable: false,class:"primary subtitle-1 text-uppercase " },
        { text: "Precio Compra", value: "PrecioCompra", sortable: false,class:"primary subtitle-1 text-uppercase " },
        { text: "Precio Venta",value: "PrecioVentaMinorista",sortable: false,class:"primary subtitle-1 text-uppercase "
        },
        { text: "Stock Actual", value: "StockActual", sortable: false,class:"primary subtitle-1 text-uppercase "},
        { text: "Stock Minimo", value: "StockMinimo", sortable: false,class:"primary subtitle-1 text-uppercase "  },
        { text: "Marca", value: "Marca", sortable: false,class:"primary subtitle-1 text-uppercase " },
        { text: "Categoria", value: "Categoria", sortable: false,class:"primary subtitle-1 text-uppercase "},
        { text: "Impuesto", value: "Impuesto", sortable: false,class:"primary subtitle-1 text-uppercase "},
        { text: "Deposito", value: "Deposito", sortable: false,class:"primary subtitle-1 text-uppercase "}
        
      ],
        }
    },
    mounted(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getProductos", this.token_configuration)

    },
    computed:{
        ...mapState(['vProducto']),
         modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        this.$store.dispatch("switchDialog", value);
      },
    },
    },
    methods:{
        listar(){
        let header = {'auth-token': this.$store.state.token};
        this.token_configuration = {headers: header};
        this.$store.dispatch("getProductos", this.token_configuration)

        },
     editItem(item) {
     this.modal = !this.modal;
     this.$store.state.vProducto.editar_item = true;
     this.$store.dispatch("getProducto", item);  
     console.log("Hello wey"+ item);
    },
  },
}
</script>
<style scoped>
#cabecera{
  background: rgb(8, 29, 48);
  border: rgb(242, 245, 248) 2px solid;
}
</style>