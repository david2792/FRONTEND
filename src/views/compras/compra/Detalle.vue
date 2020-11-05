<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- Productos -->
          <!-- Agregar Productos -->
          <v-col cols="12" md="1">
            <v-btn class="mx-2" fab dark color="indigo">
              <v-icon dark> mdi-plus </v-icon>
            </v-btn>
          </v-col>
          <!-- Seleccionar Productos -->
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="add_Compras.CodigoProducto"
              :items="vProducto.productos"
              :item-text="
                (item) => `[${item.CodigoProducto}] - ${item.Descripcion}`
              "
              item-value="CodigoProducto"
              label="Seleccionar producto"
              outlined
              @change="(id) => obtenerProducto(id)"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="2">
            <v-text-field
              v-model="add_Compras.Cantidad"
              label="Cantidad"
              required
              outlined
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="add_Compras.Precio"
              label="Precio"
              required
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="1">
            <v-btn class="mx-2" fab dark color="green" @click="agregarCompras">
              <v-icon dark> mdi-cart-check </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      add_Compras: this.detalle_compras(),
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configuracion = { headers: header };
    this.$store.dispatch("getProductos", configuracion);
  },

  computed: {
    ...mapState(["vProducto", "compras"]),
    ...mapGetters(["addItemToCompras"]),
  },

  methods: {
    detalle_compras() {
      return {
        NumeroFactura: "",
        CodigoProducto: "",
        Descripcion: "",
        Cantidad: 1,
        Precio: 0,
        subtTotal: 0,
      };
    },
    obtenerProducto(id) {
      let producto = this.vProducto.productos.filter(
        (pro) => pro.CodigoProducto === id
      );
      this.$store.dispatch("getProducto", producto[0]);
      this.add_Compras.Descripcion = this.vProducto.Producto.Descripcion;
      console.log(
        "Producto seleccionado: ",
        this.vProducto.Producto.Descripcion
      );
    },
    agregarCompras() {
      const NumeroFactura = this.compras.cabecera_compras.NumeroFactura;
      const CodigoProducto = this.add_Compras.CodigoProducto;
      const Descripcion = this.add_Compras.Descripcion;
      const Cantidad = parseInt(this.add_Compras.Cantidad, 10);
      const Precio = parseInt(this.add_Compras.Precio, 10);
      const subTotal = 0;
      this.$store.dispatch("addItemToCompras", {
        NumeroFactura, 
        CodigoProducto, 
        Descripcion, 
        Cantidad, 
        Precio,
        });
    },
  },
};
</script>>