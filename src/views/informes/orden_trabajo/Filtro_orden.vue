<template>
  <v-card>
    <v-card-title>Orden de trabajo</v-card-title>
    <v-card-text>
      <v-layout wrap>
        <v-flex xs12 sm12 md12>
          <v-autocomplete
          autofocus
          v-model="informe_ot.numerochapa"
          :items="informe_ot.orden_done"
          :item-text="(item) => `${item.RazonSocial} - ${item.numerochapa}`"
          item-value="numerochapa"
        
          >
          </v-autocomplete>
        </v-flex>
        <!-- Fecha desde -->
        <v-flex xs12 sm6 md5>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="informe_ot.fechaDesde"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="informe_ot.fechaDesde"
                label="Fecha Desde"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="Py"
              v-model="informe_ot.fechaDesde"
              no-title
              scrollable
            >
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(informe_ot.fechaDesde)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- fin fecha desde -->
        <v-flex xs2 sm2 md2></v-flex>
        <!-- Fecha Hasta -->
        <v-flex xs12 sm6 md5>
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="informe_ot.fechaHasta"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="informe_ot.fechaHasta"
                label="Fecha Desde"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="Py"
              v-model="informe_ot.fechaHasta"
              no-title
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu1.save(informe_ot.fechaHasta)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-flex>
        <!-- fin Fecha Hasta -->
        <v-flex xs12 sm6 md6>
          <v-btn @click="filtrarDatos">FFILTRAR DATOS</v-btn>
        </v-flex>
      </v-layout>
    </v-card-text>

  </v-card>
</template>
<script>
import { mapState } from "vuex";
// import Orden_trabajo from './Orden_Trabajo'
export default {
  data() {
    return {
      menu1: false,
      menu: false,
      modal: false,
      clienteRules: [
        v => !!v || ' Éste campo es necesario!!',
      ],
    };
  },
  components:{
    // Orden_trabajo,
  },
  mounted() {
    let header = { "auth-token": this.$store.state.token };
    let configracion = { headers: header };
    this.$store.dispatch("getCabecera", configracion);
    // this.informe_ot.cabecera = []
  },

  computed: {
    ...mapState(["informe_ot"]),
  },
  methods:{
    filtrarDatos(){
      let header = { "auth-token": this.$store.state.token };
      let configracion = { headers: header };
      this.$store.dispatch("setData", configracion).then(() => {
        // if (this.informe_ot.cabecera.o_cabecera) {
          this.$router.push({ path: '/informe_orden_trabajo' })
        // } else {
        //   console.log("No existen datos disponibles")
        // }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>