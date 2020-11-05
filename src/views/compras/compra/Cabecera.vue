<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <!-- Fecha registro -->
          <v-col cols="12" md="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="compras.cabecera_compras.Fecha"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="compras.cabecera_compras.Fecha"
                  label="Fecha Desde"
                  v-on="on"
                  outlined
                  clearable
                ></v-text-field>
              </template>
              <v-date-picker
                locale="Py"
                v-model="compras.cabecera_compras.Fecha"
                no-title
                scrollable
              >
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(compras.cabecera_compras.Fecha)"
                  >OK</v-btn
                >
              </v-date-picker>
            </v-menu>
          </v-col>
          <!-- Número Factura -->
          <v-col cols="12" md="3">
            <v-text-field
              v-model="compras.cabecera_compras.NroFactura"
              :rules="nameRules"
              label="Número Factura."
              required
              autofocus
              outlined
              clearable
            ></v-text-field>
          </v-col>
          <!-- condicion  de pagos -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.codigocondicion"
              :items="vCondicion.Condiciones"
              :item-text="
                (item) => `${item.Descripcion} - ${item.CodigoCondicion}`
              "
              item-value="CodigoCondicion"
              label="Seleccione la condición de pago."
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
          <!-- Forma de pago -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.codigoFormasPagos"
              :items="fpagos.fpagos"
              :item-text="
                (item) => `${item.Descripcion} - ${item.CodigoFormasPago}`
              "
              item-value="numerochapa"
              label="Selecionar la forma de pago"
              outlined
              clearable
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <!-- Proveedor -->
          <!-- Agregar Proveedor -->
          <v-col cols="12" md="1">
            <v-btn color="indigo" fab dark>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </v-col>
          <!-- Seleccionar proveedor -->
          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="compras.cabecera_compras.codigoProveedor"
              :items="vProveedor.proveedores"
              :item-text="
                (item) => `${item.RazonSocial} - ${item.CodigoProveedor}`
              "
              item-value="CodigoProveedor"
              label="Seleccionar proveedor"
              outlined
              @change="(id) => obtenerProveedor(id)"
            ></v-autocomplete>
          </v-col>
          <!-- Ruc -->
          <v-col cols="4">
            <v-text-field
              v-model="vProveedor.Proveedor.Ruc"
              :rules="nameRules"
              label="Ruc:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>
          <!-- Teléfono -->
          <v-col cols="12" md="4">
            <v-text-field
              v-model="vProveedor.Proveedor.Telefono"
              :rules="nameRules"
              label="Teléfono:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>

          <!-- Dirección -->
          <v-col cols="12">
            <v-text-field
              v-model="vProveedor.Proveedor.Direccion"
              :rules="nameRules"
              label="Dirección:"
              required
              autofocus
              outlined
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      menu: false,
    };
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getCondicion", configracion);
    this.$store.dispatch("setFormaPagos", configracion);
    this.$store.dispatch("getProveedores", configracion);
  },
  computed: {
    ...mapState(["compras", "vCondicion", "fpagos", "vProveedor"]),
  },

  methods: {
    obtenerProveedor(id) {
      let proveedor = this.vProveedor.proveedores.filter(
        (pro) => pro.CodigoProveedor === id
      );
      console.log("Proveedor seleccionado: ", proveedor[0].RazonSocial);
      this.vProveedor.Proveedor = proveedor[0];
    },
  },
};
</script>