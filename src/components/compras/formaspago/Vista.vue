<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar float>
        <v-toolbar-title>Formas Pago</v-toolbar-title>
        <v-divider class="mx-2" insert vertical></v-divider>
        <v-spacer></v-spacer>
          <template>
            <v-btn color="red darken-4"  class="mb-2" @click="modal=!modal">
              Nuevo
              <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
            </v-btn>
          </template>
       <v-dialog v-model="modal" max-width="600px">
          <formularioFormasPago/>
        </v-dialog>
      </v-toolbar>
      <ListaFormaPagos/>
    </v-flex>
  </v-layout>
</template>
<script>
import formularioFormasPago from "../../../views/compras/forma_pago/formularioFormasPago";
import ListaFormaPagos from "../../../views/compras/forma_pago/ListaFormaPgos";
export default {
  data() {
    return {
    };
  },
  components: {
    formularioFormasPago,
    ListaFormaPagos
  },
  computed: {
    modal: {
      get() {
        return this.$store.getters.getModal;
      },
      set(value) {
        console.log("hola mundo");
        this.$store.dispatch("switchDialog", value);
      },
    },
  },
  methods:{
      close(){
      this.dialog=false;
      console.log("paso")
    }
  }
};
</script>