<template>
  <v-card>
    <v-form v-model="valid">
    <v-container>
      <v-row>
        <!-- Fecha registro -->
        <v-col cols="12" md="4">
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
        <v-col cols="12" md="4">
          <v-text-field
            v-model="compras.cabecera_compras.NroFactura"
            :rules="nameRules"
            label="Número Factura."
            required
            autofocus
          ></v-text-field>
        </v-col>
        <!-- condicion  de pagos -->
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="compras.cabecera_compras.codiocondicion"
            :items="vCondicion.Condiciones"
            :item-text="(item) => `${item.Descripcion} - ${item.CodigoCondicion}`"
            item-value="CodigoCondicion"
            label="Seleccione la condición de pago."
            :rules="clienteRules"
          ></v-autocomplete>
        </v-col>
      </v-row>

      <v-row>
        <!-- Forma de pago -->
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="compras.cabecera_compras.codigoFormasPagos"
            :items="fpagos.fpagos"
            :item-text="
              (item) => `${item.Descripcion} - ${item.CodigoFormasPago}`
            "
            item-value="numerochapa"
            label="Selecionar la forma de pago"
            :rules="clienteRules"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="compras.cabecera_compras.codigoProveedor"
            :items="vProveedor.proveedores"
            :item-text="(item) => `${item.RazonSocial} - ${item.CodigoProveedor}`"
            item-value="CodigoProveedor"
            label="Seleccionar proveedor"
            :rules="clienteRules"
          ></v-autocomplete>
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
    return {};
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
};
</script>