<template>
  <v-card outlined class="mx-auto" max-width="1300">
    <div>
        <Cabecera />
    </div>
    <div>
        <Detalle />
    </div>
    <div>
        <ListaDetalle/>
    </div>
    <div>
        
    </div>
  </v-card>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Cabecera from "../../../views/compras/compra/Cabecera";
import Detalle from "../../../views/compras/compra/Detalle";
import ListaDetalle from '../../../views/compras/compra/ListaDetalle'
export default {
  components: {
    Cabecera,
    Detalle,
    ListaDetalle,
  },
  computed:{
      ...mapState(["compras"]),
      ...mapGetters(["totalCompras"]),
  }
};
</script>