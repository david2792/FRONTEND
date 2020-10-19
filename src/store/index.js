import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from '../router/index'
import * as vCliente from '../store/referenciales-personas/clientes.js'
import * as ciudad from '../store/referenciales-localidades/ciudad.js'
// PRODUCTOS
import * as vDeposito from '../store/referenciales-producto/depositos.js'
import * as vProducto from '../store/producto/productos.js'
import * as vMarca from '../store/referenciales-producto/marcas.js'
import * as dialogo from '@/store/dialogo/dialogo.js'
import * as vImpuesto from '../store/referenciales-producto/impuestos.js'
import * as vCategoria from './referenciales-producto/categorias.js'
import * as vServicio from './servicio/servicios.js'

// taller
import * as vVehiculo from './vehiculo/vehiculos.js'
import * as vTransmicion from './referenciales-taller/transmicion.js'
import * as vModelo from './referenciales-taller/modelo.js'
import * as vMarcaVehiculo from './referenciales-taller/marca.js'
import * as vColor from './referenciales-taller/color.js'
import * as vNivel from './referenciales-taller/nivelCombustibles.js'
import * as vRecepcion from './recepcion-vehiculo/recepciones.js'

import * as vOrden from './orden-trabajo/ordentrabajos.js'
import * as vMecanico from './referenciales-personas/mecanicos.js'

// caja

 import * as vApertura from './referenciales-cajas/abircaja'
 import * as vFacturacion from './facturacion/facturacion'
 import * as vCondicion from './facturacion/condicion'
 import * as vDocumento from './facturacion/tipoDocumento'


// compras
import * as fpagos from './referencial-compras/formapagos/formapagos'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    vCliente,
    ciudad,
    // productos
    vImpuesto,
    vCategoria,
    vMarca,
    vDeposito,
    vProducto,
    vServicio,
    // taller
    vVehiculo,
    vTransmicion,
    vMarcaVehiculo,
    vColor,
    vModelo,
    vNivel,
    vRecepcion,
    vOrden,
    vMecanico,
    // caja
    vApertura,
    vFacturacion,
    vCondicion,
    vDocumento,
    dialogo,
    // compras
    fpagos,

  },
  state: {
    token: null,
    usuario: null
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUsuario(state,usuario){
      state.usuario=usuario;
    }
  },
  actions: {
    guardarToken({commit}, token){
      commit("setToken", token)
      commit("setUsuario", decode(token))
      localStorage.setItem("token", token)
    },
    autoLogin({commit}){
      let token = localStorage.getItem("token");
      if(token) {
        commit("setToken", token);
        commit("setUsuario", decode(token));
      }
      router.push({name: 'home'});
    },
    salir({commit}){
      commit("setToken", null);
      commit("setUsuario", null);
      localStorage.removeItem("token");
      router.push({name: 'autoLogin'});
    }
  }
})
