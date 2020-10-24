<template>
  <v-card>
    <div id="print-data">
      <div>
        <h2 align-center>INFORME ORDEN DE TRABAJO</h2>
      </div>
      <v-layout>
        <v-flex xs12 sm12 md4>
          <div><v-card- class="pa-2" outline tile>Nombre</v-card-></div>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <v-card-text class="pa-2" tile>Número de chapa</v-card-text>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <div><v-card-text class="pa-2" tile>Fecha</v-card-text></div>
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        v-for="cabecera in informe_ot.cabecera.o_cabecera"
        :key="cabecera"
      >
        <v-flex xs12 sm12 md4>
          <div>
            <v-card-text class="pa-2" tile>
              {{ cabecera.RazonSocial }}
            </v-card-text>
          </div>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <div>
            <v-card-text class="pa-2" tile>
              {{ cabecera.numerochapa }}
            </v-card-text>
          </div>
        </v-flex>
        <v-flex xs12 sm12 md4>
          <div>
            <v-card-text class="pa-2" tile>
              {{ cabecera.fechaemision }}
            </v-card-text>
          </div>
        </v-flex>
        <v-flex xs12 sm12 md12>
          <div>
            <v-card-text class="pa-2 font-weight-medium" tile>
              <p
                class="pa-2 text-no-wrap secondary text-decoration-underline font-weight-medium"
                tile
              >
                Observación:
              {{ cabecera.observacionorden }}
              </p>
            </v-card-text>
          </div>
        </v-flex>
        <h1>Detalle del cliente:</h1>
        <v-flex xs12 sm12 md12>
          <!-- <v-card-text> -->
          <v-data-table
            loading
            loading-text="Cargando datos..."
            :headers="headers"
            :items="informe_ot.cabecera.o_detalle"
            hide-default-footer
            class="elevation-1"
          ></v-data-table>
        <!-- </v-card-text> -->
        </v-flex>
      </v-layout>
    </div>
    <v-btn @click="printData">Pint data</v-btn>
  </v-card>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    headers: [
      {
        text: "Código Producto",
        value: "codigoproducto",
        // sortable: true,
        // class: "primary",
      },
      { 
        text: "Descripción", 
        value: "descripcion",
        // sortable: true,
        // class: "primary",
        },
      { 
        text: "Precio", 
        value: "precio",
        // sortable: true,
        // class: "primary",
      },
      { 
        text: "Cantidad",
        value: "cantidad",
        // sortable: true,
        // class: "primary",
      }
    ],
  }),
  name: "Informe_ot",
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getCabecera", configracion);
  },
  computed: {
    ...mapState(["informe_ot"]),
  },
  methods: {
    printData() {
      this.$htmlToPaper("print-data");
    },
  },
};
</script>